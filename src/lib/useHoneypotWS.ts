"use client";

import { useEffect, useMemo, useState } from "react";
import type { AttackEvent, AttackerProfile, HoneypotStats, WSMessage, WSStatus } from "./types";

const fallbackEvents: AttackEvent[] = [
  {
    id: "a17f3c9b",
    session_id: "sess-sqlmap",
    timestamp: new Date().toISOString(),
    attack_type: "SQL_INJECTION",
    threat_level: "HOSTILE",
    method: "GET",
    path: "/api/patients",
    query_params: { id: "1 OR 1=1 --" },
    payload: null,
    response_type: "fake_sql",
    ip: "203.0.113.42",
    user_agent: "sqlmap/1.8",
    score: 25,
    fake_data_preview: "[{\"id\":1024,\"patient_name\":\"Dana Miller\",\"ssn\":\"***-**-1842\"}]",
    stage: 2
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
    response_type: "fake_env",
    ip: "198.51.100.17",
    user_agent: "Mozilla/5.0",
    score: 15,
    fake_data_preview: "DB_URL=postgres://meditrack:fake-password@db:5432/meditrack",
    stage: 1
  }
];

const fallbackProfiles: AttackerProfile[] = [
  {
    session_id: "sess-sqlmap",
    ip: "203.0.113.42",
    first_seen: new Date(Date.now() - 540000).toISOString(),
    last_seen: new Date().toISOString(),
    threat_level: "HOSTILE",
    total_score: 55,
    attack_types_seen: ["SCANNER", "SQL_INJECTION"],
    request_count: 12,
    predicted_next: "records",
    tags: ["#sqlmap", "#sqli", "#records"],
    time_wasted_seconds: 412,
    stage: 2,
    target_interest: "records"
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
    predicted_next: "credentials",
    tags: ["#env", "#recon"],
    time_wasted_seconds: 96,
    stage: 1,
    target_interest: "credentials"
  }
];

const fallbackStats: HoneypotStats = {
  active_sessions: 2,
  requests_today: 17,
  attacks_intercepted: 14,
  total_time_wasted_seconds: 508
};

export function useHoneypotWS() {
  const [events, setEvents] = useState<AttackEvent[]>([]);
  const [profiles, setProfiles] = useState<AttackerProfile[]>([]);
  const [stats, setStats] = useState<HoneypotStats>({});
  const [selected, setSelected] = useState<AttackEvent | null>(null);
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
          setStats(data.payload.stats);
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
          setStats(data.payload);
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

    const fallbackTimer = setTimeout(() => {
      setEvents((current) => (current.length ? current : fallbackEvents));
      setProfiles((current) => (current.length ? current : fallbackProfiles));
      setStats((current) => (Object.keys(current).length ? current : fallbackStats));
      setSelected((current) => current ?? fallbackEvents[0]);
    }, 900);

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, []);

  const sortedProfiles = useMemo(
    () => [...profiles].sort((a, b) => b.total_score - a.total_score),
    [profiles]
  );

  return { events, profiles: sortedProfiles, stats, selected, setSelected, status };
}
