"use client";

import { useEffect, useMemo, useState } from "react";
import type { AttackEvent, AttackerProfile, HoneypotStats, WSMessage, WSStatus } from "./types";

const ENABLE_DEMO_DATA = process.env.NEXT_PUBLIC_DEMO_DATA !== "false";

const fallbackEvents: AttackEvent[] = [
  {
    id: "a17f3c9b",
    session_id: "sess-sqlmap",
    timestamp: new Date().toISOString(),
    attack_type: "SQL_INJECTION",
    threat_level: "CRITICAL",
    method: "GET",
    path: "/api/customers",
    query_params: { id: "1042 UNION SELECT account_number,balance FROM accounts --" },
    payload: null,
    response_type: "synthetic_customer_ledger",
    ip: "203.0.113.42",
    user_agent: "sqlmap/1.8",
    score: 25,
    fake_data_preview: "[{\"customer_id\":\"C-1042\",\"name\":\"Synthetic Customer\",\"account_status\":\"review\",\"balance\":\"42187.44\",\"currency\":\"USD\"}]",
    stage: 3
  },
  {
    id: "b51e09aa",
    session_id: "sess-recon",
    timestamp: new Date(Date.now() - 68000).toISOString(),
    attack_type: "CRED_HARVEST",
    threat_level: "SUSPICIOUS",
    method: "GET",
    path: "/.env",
    query_params: {},
    payload: null,
    response_type: "synthetic_env_config",
    ip: "198.51.100.17",
    user_agent: "Mozilla/5.0",
    score: 15,
    fake_data_preview: "CORE_BANKING_DB=postgres://vaultbank_reporter:synthetic-password@ledger-db:5432/vaultbank_decoy",
    stage: 1
  },
  {
    id: "c90e1fa2",
    session_id: "sess-api-probe",
    timestamp: new Date(Date.now() - 126000).toISOString(),
    attack_type: "SSRF",
    threat_level: "HOSTILE",
    method: "POST",
    path: "/api/reports",
    query_params: {},
    payload: "{\"source\":\"http://169.254.169.254/latest/meta-data/iam/security-credentials\"}",
    response_type: "synthetic_internal_report",
    ip: "192.0.2.88",
    user_agent: "python-requests/2.31",
    score: 20,
    fake_data_preview: "{\"report_id\":\"FIN-DR-9021\",\"status\":\"queued\",\"internal_service\":\"vaultbank-reporting-decoy\"}",
    stage: 2
  }
];

const fallbackProfiles: AttackerProfile[] = [
  {
    session_id: "sess-sqlmap",
    ip: "203.0.113.42",
    first_seen: new Date(Date.now() - 540000).toISOString(),
    last_seen: new Date().toISOString(),
    threat_level: "CRITICAL",
    total_score: 87,
    attack_types_seen: ["SCANNER", "SQL_INJECTION"],
    request_count: 28,
    predicted_next: "transactions",
    tags: ["#sql-injection", "#credential-harvest", "#exfiltration"],
    time_wasted_seconds: 1122,
    stage: 3,
    target_interest: "TRANSACTIONS"
  },
  {
    session_id: "sess-recon",
    ip: "198.51.100.17",
    first_seen: new Date(Date.now() - 220000).toISOString(),
    last_seen: new Date(Date.now() - 68000).toISOString(),
    threat_level: "SUSPICIOUS",
    total_score: 18,
    attack_types_seen: ["CRED_HARVEST", "DIR_ENUM"],
    request_count: 5,
    predicted_next: "authentication",
    tags: ["#env", "#recon", "#config"],
    time_wasted_seconds: 96,
    stage: 1,
    target_interest: "AUTHENTICATION"
  },
  {
    session_id: "sess-api-probe",
    ip: "192.0.2.88",
    first_seen: new Date(Date.now() - 380000).toISOString(),
    last_seen: new Date(Date.now() - 126000).toISOString(),
    threat_level: "HOSTILE",
    total_score: 46,
    attack_types_seen: ["SSRF", "DIR_ENUM"],
    request_count: 14,
    predicted_next: "internal services",
    tags: ["#ssrf", "#metadata", "#reports"],
    time_wasted_seconds: 344,
    stage: 2,
    target_interest: "INTERNAL SERVICES"
  }
];

const fallbackStats: HoneypotStats = {
  active_sessions: 3,
  requests_today: 47,
  attacks_intercepted: 39,
  total_time_wasted_seconds: 1562
};

function normalizeStats(stats: Partial<HoneypotStats>, profileCount = 0, eventCount = 0): HoneypotStats {
  return {
    active_sessions: stats.active_sessions ?? stats.sessions_active ?? stats.total_sessions ?? profileCount,
    requests_today: stats.requests_today ?? stats.total_requests ?? eventCount,
    attacks_intercepted: stats.attacks_intercepted ?? stats.total_attacks ?? eventCount,
    total_time_wasted_seconds: stats.total_time_wasted_seconds ?? stats.time_wasted_seconds ?? 0,
    ...stats
  };
}

export function useHoneypotWS() {
  const [events, setEvents] = useState<AttackEvent[]>([]);
  const [profiles, setProfiles] = useState<AttackerProfile[]>([]);
  const [stats, setStats] = useState<HoneypotStats>(normalizeStats({}));
  const [selected, setSelected] = useState<AttackEvent | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<WSStatus>("connecting");

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000/ws";
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const connect = () => {
      setStatus("connecting");
      ws = new WebSocket(wsUrl);

      ws.onopen = () => setStatus("live");

      ws.onmessage = (message) => {
        const data = JSON.parse(message.data) as WSMessage;
        if (data.type === "init") {
          setProfiles(data.payload.sessions);
          setEvents(data.payload.recent_events);
          setStats(normalizeStats(data.payload.stats, data.payload.sessions.length, data.payload.recent_events.length));
          setSelected(data.payload.recent_events[0] ?? null);
        }
        if (data.type === "event") {
          setEvents((current) => [data.payload, ...current].slice(0, 250));
          setSelected((current) => current ?? data.payload);
        }
        if (data.type === "profile_update") {
          setProfiles((current) => {
            const rest = current.filter((profile) => profile.session_id !== data.payload.session_id);
            return [data.payload, ...rest];
          });
        }
        if (data.type === "stats") {
          setStats(normalizeStats(data.payload));
        }
      };

      ws.onerror = () => setStatus("offline");
      ws.onclose = () => {
        if (cancelled) return;
        setStatus("offline");
        reconnectTimer = setTimeout(connect, 3000);
      };
    };

    try {
      connect();
    } catch {
      setStatus("offline");
    }

    const fallbackTimer = ENABLE_DEMO_DATA
      ? setTimeout(() => {
          setEvents((current) => (current.length ? current : fallbackEvents));
          setProfiles((current) => (current.length ? current : fallbackProfiles));
          setStats((current) => (Object.keys(current).length ? current : fallbackStats));
          setSelected((current) => current ?? fallbackEvents[0]);
        }, 900)
      : null;

    return () => {
      cancelled = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, []);

  const sortedProfiles = useMemo(
    () => [...profiles].sort((a, b) => b.total_score - a.total_score),
    [profiles]
  );

  const focusedEvents = useMemo(
    () => (selectedSessionId ? events.filter((event) => event.session_id === selectedSessionId) : events),
    [events, selectedSessionId]
  );

  return {
    events,
    focusedEvents,
    profiles: sortedProfiles,
    stats,
    selected,
    setSelected,
    selectedSessionId,
    setSelectedSessionId,
    connected: status === "live",
    status
  };
}
