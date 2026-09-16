# Autonomous LLM-Honeypot Trap — Implementation Plan

## What It Is

A deception-technology honeypot that impersonates a hospital admin portal ("MediTrack Pro"), classifies inbound attack intent in real time, feeds attackers LLM-generated fake data that pulls them deeper into a maze, and streams all activity to a live SOC dashboard.

---

## Architecture

```
Attacker
   │ HTTP
   ▼
FastAPI (port 8000)
   ├── middleware: extract IP, UA, body, query → classifier.py
   ├── classifier.py   → AttackAnalysis(type, score, patterns[])
   ├── session_manager.py → AttackerProfile(stage 0–3, score, tags)
   ├── deception.py    → fake response (Ollama or static fallback)
   ├── ws_manager      → broadcast AttackEvent to all /ws clients
   └── return fake HTTP response to attacker

WebSocket /ws
   │
   ▼
Next.js dashboard (port 3000)
   └── StatsPanel | AttackFeed | ThreatProfile | RequestViewer

Ollama (port 11434)  ← called only by deception.py, never exposed
```

---

## File Map & Responsibilities

```
honeypot/
├── docker-compose.yml
├── plan.md
│
├── backend/
│   ├── main.py            FastAPI app; all decoy routes; /ws endpoint; startup DB init
│   ├── models.py          Pydantic: AttackType, ThreatLevel, AttackAnalysis,
│   │                        AttackEvent, AttackerProfile, HoneypotStats, WSMessage
│   ├── classifier.py      analyze_request() → AttackAnalysis
│   │                        layer 1: regex signatures per AttackType
│   │                        layer 2: scanner UA fingerprints
│   │                        layer 3: behavioral score from session history
│   ├── fake_data.py        PATIENT_ROWS, STAFF_ROWS, FAKE_ENV, FAKE_SQL_DUMP,
│   │                        FAKE_PASSWD, generate_jwt(role), canary_token()
│   ├── deception.py        generate_response(attack_type, stage, context) → str
│   │                        primary: POST http://ollama:11434/api/generate
│   │                        fallback: static template dict
│   ├── session_manager.py  SessionManager singleton
│   │                        get_or_create(ip, ua) → AttackerProfile
│   │                        record_event(profile, analysis) → AttackEvent
│   │                        all_profiles() → list[AttackerProfile]
│   │                        stats() → HoneypotStats
│   ├── requirements.txt
│   └── Dockerfile
│
└── dashboard/
    ├── src/lib/types.ts         mirrors backend models exactly
    ├── src/lib/useHoneypotWS.ts custom hook → { events, profiles, stats, selected }
    ├── src/app/page.tsx          layout shell + state wiring
    ├── src/app/components/
    │   ├── StatsPanel.tsx        4 counters: sessions, requests, attacks, time wasted
    │   ├── AttackFeed.tsx        virtualized scroll, color-coded by threat level
    │   ├── ThreatProfile.tsx     per-attacker card: IP, stage badge, score bar, tags
    │   └── RequestViewer.tsx     raw request + fake response with syntax highlight
    ├── src/app/globals.css
    ├── src/app/layout.tsx
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── Dockerfile
```

---

## Data Models (exact fields)

```python
class AttackType(Enum):
    SQL_INJECTION | PATH_TRAVERSAL | XSS | CMD_INJECTION
    BRUTE_FORCE | DIR_ENUM | CRED_HARVEST | SSRF | LFI
    SCANNER | BENIGN

class ThreatLevel(Enum):
    WATCHING | SUSPICIOUS | HOSTILE | CRITICAL

class AttackAnalysis:
    attack_type: AttackType
    confidence: float          # 0.0–1.0
    score: float               # added to session total
    matched_patterns: list[str]
    is_scanner: bool

class AttackEvent:
    id: str                    # uuid4[:8]
    session_id: str
    timestamp: str             # ISO-8601
    attack_type: AttackType
    threat_level: ThreatLevel
    method: str
    path: str
    query_params: dict[str,str]
    payload: str | None        # body or first 512 chars
    response_type: str         # "fake_sql" | "fake_file" | "fake_jwt" | ...
    ip: str
    user_agent: str
    score: float
    fake_data_preview: str | None   # first 120 chars of what was sent back
    stage: int

class AttackerProfile:
    session_id: str
    ip: str
    first_seen: str
    last_seen: str
    threat_level: ThreatLevel
    total_score: float
    attack_types_seen: list[str]
    request_count: int
    predicted_next: str | None
    tags: list[str]            # ["#sqlmap", "#exfil", "#lfi", ...]
    time_wasted_seconds: int
    stage: int                 # 0–3
    target_interest: str | None  # "records" | "credentials" | "rce" | "recon"
```

---

## Classifier Signature Table

| AttackType | Key Patterns (regex) | Score |
|---|---|---|
| SQL_INJECTION | `OR\s+\d+=\d+`, `UNION.+SELECT`, `SLEEP\(`, `xp_cmdshell`, `'--` | 25 |
| PATH_TRAVERSAL | `\.\.\/`, `%2e%2e`, `etc/passwd`, `win\.ini`, `/proc/self` | 20 |
| LFI | `(file\|php)://`, `data://`, `include=.*\.\.` | 20 |
| CMD_INJECTION | `[;&\|` + `]\s*(ls\|id\|whoami\|cat)`, `\$\(.*\)`, `/bin/(sh\|bash)` | 25 |
| XSS | `<script`, `javascript:`, `onerror=`, `document\.cookie` | 15 |
| SSRF | `169\.254\.169\.254`, `url=.*(localhost\|127\.)` | 20 |
| CRED_HARVEST | `\.(env\|pem\|key)$`, `id_rsa`, `wp-config`, `\.git/config` | 15 |
| DIR_ENUM | `/wp-admin`, `/phpmyadmin`, `/\.git`, `\.(bak\|old\|swp)$` | 8 |
| BRUTE_FORCE | >5 POST /api/auth/login from same IP in 60s | 30 |
| SCANNER | UA ∈ {sqlmap, nikto, gobuster, ffuf, nuclei, masscan, zgrab, nmap} | 40 |

---

## Session Stages

| Stage | Score Threshold | What Attacker Receives |
|---|---|---|
| 0 Watching | 0–9 | Real decoy HTML; 401s on login; 404s on probes |
| 1 Engaged | 10–29 | Plausible-but-vague fake data; hints of juicy paths |
| 2 Hooked | 30–59 | Full fake records; "successful" login with fake JWT |
| 3 Maze | 60+ | Infinite pagination; fake linked systems; fake SSH keys |

Stage is stored per session and gates `deception.py` response depth.

---

## Decoy Routes (all served by main.py)

| Method | Path | Bait | Fake Response Type |
|---|---|---|---|
| GET | `/` | — | Login page HTML |
| POST | `/api/auth/login` | brute-force | 401 → fake JWT at stage 2+ |
| GET | `/api/patients` | `?id=` SQL injection | fake_sql (JSON rows) |
| GET | `/api/patients/{id}` | path/LFI | fake record or fake file |
| GET | `/api/reports` | data exfil | fake_report (CSV/JSON) |
| GET | `/.env` | cred harvest | fake_env (text) |
| GET | `/config.json` | cred harvest | fake_config (JSON) |
| GET | `/backup/db.sql` | cred harvest | fake_sql_dump (text) |
| POST | `/api/execute` | RCE | fake_shell (text) |
| GET | `/admin/debug` | recon | fake_sysinfo (JSON) |
| GET | `/{path:path}` | dir enum | 404 + log |

---

## Deception Engine — Ollama Prompt Templates

**SQL injection** → model: `mistral`, max_tokens: 300
> *"You are a compromised MySQL server. Return a JSON array of 8 fake hospital patient records. Fields: id, patient_name, ssn (last 4 only as ***-**-XXXX), dob, diagnosis, medications[], doctor, insurance_id. Use realistic US names and medical data. Output only valid JSON."*

**Path traversal (/etc/passwd)** → max_tokens: 200
> *"Generate a realistic fake Linux /etc/passwd file. Include root, system daemons, www-data, postgres, and a meditrack app user. Use plausible UIDs/GIDs. Output only file contents."*

**Credential harvest (.env)** → max_tokens: 250
> *"Generate a fake .env for a healthcare web app. Include: DB_URL with password, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, JWT_SECRET, STRIPE_SECRET_KEY, REDIS_URL, SMTP credentials. All values must look authentic but be entirely fabricated. Output only key=value lines."*

**Command injection** → max_tokens: 150
> *"Output realistic fake Linux terminal output for the command `{cmd}` run on a server named prod-meditrack-01. Include plausible file names, PIDs, or user data. Output only the terminal text."*

**SSRF (AWS metadata)** → static template (no LLM needed)
> Returns hardcoded fake `169.254.169.254/latest/meta-data/` structure with fake instance-id, IAM role, and fake credentials.

Fallback (Ollama unavailable): static dict keyed by `(AttackType, stage)`.

---

## WebSocket Protocol

Server → client messages only (read-only dashboard).

```json
// on connect
{ "type": "init",
  "payload": { "sessions": [...], "recent_events": [...], "stats": {...} } }

// on each attack
{ "type": "event", "payload": AttackEvent }

// when a session's score/stage changes
{ "type": "profile_update", "payload": AttackerProfile }

// every 5 seconds
{ "type": "stats", "payload": HoneypotStats }
```

---

## Dashboard Design

**Color palette (all Tailwind custom vars):**
- Background: `#080d1a`
- Panel: `#0c1225`
- Border: `#1a2540`
- Text: `#b8cce0`
- Dim: `#3d5470`
- Green (WATCHING): `#00ff9d`
- Yellow (SUSPICIOUS): `#f5c400`
- Orange (HOSTILE): `#ff6b00`
- Red (CRITICAL): `#ff1744`

**Top bar:** `HONEYPOT CONTROL CENTER` | blinking `● LIVE` dot | UTC clock | WS status

**StatsPanel:** 4 metric cards (sessions active / requests today / attacks intercepted / total time wasted)

**Left 30%:** Scrollable list of `ThreatProfile` cards sorted by `total_score` desc. Each card: masked IP, threat level badge, stage indicator (0–3 pips), score bar, tag chips, time wasted.

**Right 70% top:** `AttackFeed` — new events slide in from top, color-coded left border by threat level, columns: timestamp | type badge | method+path | IP | score delta.

**Right 70% bottom:** `RequestViewer` — activated by clicking any feed row. Shows: raw request block, classifier match list, fake response sent (syntax-highlighted JSON/text), session stage at time of event.

---

## Docker Compose Services

```yaml
services:
  honeypot:   build ./backend,   port 8000,  env OLLAMA_URL=http://ollama:11434
  dashboard:  build ./dashboard, port 3000,  env NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
  ollama:     image ollama/ollama, port 11434, volume ollama_data
              command: ollama run mistral  # pulled on first start
```

---

## Build Order

1. `backend/models.py`
2. `backend/classifier.py`
3. `backend/fake_data.py`
4. `backend/deception.py`
5. `backend/session_manager.py`
6. `backend/main.py`
7. `dashboard/src/lib/types.ts`
8. `dashboard/src/lib/useHoneypotWS.ts`
9. `dashboard/src/app/components/{StatsPanel,AttackFeed,ThreatProfile,RequestViewer}.tsx`
10. `dashboard/src/app/page.tsx` + `layout.tsx` + `globals.css`
11. `docker-compose.yml`
12. `backend/Dockerfile` + `dashboard/Dockerfile` + `backend/requirements.txt` + `dashboard/package.json`
