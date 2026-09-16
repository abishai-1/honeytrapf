import { BrainCircuit, FileJson, GitBranch, TerminalSquare } from "lucide-react";
import type { AttackEvent, AttackType, ThreatLevel } from "@/lib/types";

const patternHints: Record<AttackType, string[]> = {
  SQL_INJECTION: ["OR\\s+\\d+=\\d+", "UNION.+SELECT", "SLEEP\\(", "'--"],
  PATH_TRAVERSAL: ["\\.\\.\\/", "%2e%2e", "etc/passwd", "win\\.ini"],
  XSS: ["<script", "javascript:", "onerror=", "document\\.cookie"],
  CMD_INJECTION: ["[;&|`]\\s*(ls|id|whoami|cat)", "\\$\\(.*\\)", "/bin/(sh|bash)"],
  BRUTE_FORCE: [">5 POST /api/auth/login in 60s"],
  DIR_ENUM: ["/wp-admin", "/phpmyadmin", "/\\.git", "\\.(bak|old|swp)$"],
  CRED_HARVEST: ["\\.(env|pem|key)$", "id_rsa", "wp-config", "\\.git/config"],
  SSRF: ["169\\.254\\.169\\.254", "url=.*(localhost|127\\.)"],
  LFI: ["(file|php)://", "data://", "include=.*\\.\\."],
  SCANNER: ["sqlmap", "nikto", "gobuster", "ffuf", "nuclei", "masscan", "zgrab", "nmap"],
  BENIGN: []
};

function formatQuery(query: Record<string, string>) {
  const entries = Object.entries(query);
  return entries.length ? `?${new URLSearchParams(entries).toString()}` : "";
}

function formatPreview(value: string | null) {
  if (!value) return "No response preview was attached to this event.";
  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

const stageNames = ["OBSERVE", "HOOK", "VAULT", "MAZE"];

const levelText: Record<ThreatLevel, string> = {
  WATCHING: "text-soc-watching",
  SUSPICIOUS: "text-soc-suspicious",
  HOSTILE: "text-soc-hostile",
  CRITICAL: "text-soc-critical"
};

function confidenceFor(event: AttackEvent) {
  return Math.min(99, Math.max(52, 58 + event.score + event.stage * 4));
}

export function RequestViewer({ event }: { event: AttackEvent | null }) {
  if (!event) {
    return (
      <section className="grid min-h-[260px] place-items-center rounded border border-soc-border bg-soc-panel text-sm text-soc-dim">
        Waiting for the first attack event.
      </section>
    );
  }

  const rawRequest = `${event.method} ${event.path}${formatQuery(event.query_params)} HTTP/1.1
Host: vaultbank.local
User-Agent: ${event.user_agent}
X-Forwarded-For: ${event.ip}

${event.payload ?? ""}`;
  const hints = patternHints[event.attack_type];

  return (
    <section className="min-h-0 overflow-hidden rounded border border-soc-border bg-soc-panel/95">
      <div className="flex items-center justify-between border-b border-soc-border px-4 py-3">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">REQUEST INSPECTOR</h2>
          <p className="mt-1 text-xs text-soc-dim">
            Session {event.session_id} · Stage {event.stage} · {event.response_type}
          </p>
        </div>
        <span className="rounded border border-soc-border px-2 py-1 font-mono text-xs text-soc-watching">{event.id}</span>
      </div>

      <div className="grid gap-4 p-4 xl:grid-cols-2">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-soc-dim">
            <TerminalSquare size={15} />
            Raw Request
          </div>
          <pre className="max-h-72 overflow-auto rounded border border-soc-border bg-[#070b15] p-3 font-mono text-xs leading-6 text-soc-text">
            {rawRequest}
          </pre>
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-soc-dim">
            <BrainCircuit size={15} />
            Classifier Analysis
          </div>
          <div className="rounded border border-soc-border bg-[#070b15] p-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <span className="text-soc-dim">Detected</span>
              <b className="text-right font-mono text-white">{event.attack_type}</b>
              <span className="text-soc-dim">Confidence</span>
              <b className="text-right font-mono text-soc-watching">{confidenceFor(event)}%</b>
              <span className="text-soc-dim">Scanner</span>
              <b className="text-right font-mono text-white">{event.user_agent.match(/sqlmap|nikto|gobuster|ffuf|nuclei|nmap/i) ? "YES" : "NO"}</b>
              <span className="text-soc-dim">Score Delta</span>
              <b className="text-right font-mono text-soc-hostile">+{event.score}</b>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {hints.length ? (
                hints.map((pattern) => (
                  <span key={pattern} className="rounded border border-soc-border px-2 py-1 font-mono text-xs text-soc-suspicious">
                    {pattern}
                  </span>
                ))
              ) : (
                <span className="text-xs text-soc-dim">No high-risk signature matched.</span>
              )}
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-soc-dim">
            <FileJson size={15} />
            Deception Response
          </div>
          <pre className="max-h-72 overflow-auto rounded border border-soc-border bg-[#070b15] p-3 font-mono text-xs leading-6 text-soc-watching">
            {formatPreview(event.fake_data_preview)}
          </pre>
        </div>

        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-soc-dim">
            <GitBranch size={15} />
            Session State
          </div>
          <div className="rounded border border-soc-border bg-[#070b15] p-3 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <span className="text-soc-dim">Progression</span>
              <b className="text-right font-mono text-white">
                Stage {String(event.stage).padStart(2, "0")} - {stageNames[event.stage] ?? "UNKNOWN"}
              </b>
              <span className="text-soc-dim">Threat Level</span>
              <b className={`text-right font-mono ${levelText[event.threat_level]}`}>{event.threat_level}</b>
              <span className="text-soc-dim">Target Interest</span>
              <b className="text-right font-mono text-white">{event.path.includes("transaction") ? "TRANSACTIONS" : event.path.includes("account") ? "ACCOUNTS" : event.path.includes("report") ? "REPORTS" : "BANKING SERVICES"}</b>
              <span className="text-soc-dim">Flow</span>
              <b className="text-right text-xs uppercase tracking-[0.12em] text-soc-watching">Attack - Detection - Deception</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
