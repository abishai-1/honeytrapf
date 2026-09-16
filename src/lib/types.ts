export type AttackType =
  | "SQL_INJECTION"
  | "PATH_TRAVERSAL"
  | "XSS"
  | "CMD_INJECTION"
  | "BRUTE_FORCE"
  | "DIR_ENUM"
  | "CRED_HARVEST"
  | "SSRF"
  | "LFI"
  | "SCANNER"
  | "BENIGN";

export type ThreatLevel = "WATCHING" | "SUSPICIOUS" | "HOSTILE" | "CRITICAL";

export interface AttackAnalysis {
  attack_type: AttackType;
  confidence: number;
  score: number;
  matched_patterns: string[];
  is_scanner: boolean;
}

export interface AttackEvent {
  id: string;
  session_id: string;
  timestamp: string;
  attack_type: AttackType;
  threat_level: ThreatLevel;
  method: string;
  path: string;
  query_params: Record<string, string>;
  payload: string | null;
  response_type: string;
  ip: string;
  user_agent: string;
  score: number;
  fake_data_preview: string | null;
  stage: number;
}

export interface AttackerProfile {
  session_id: string;
  ip: string;
  first_seen: string;
  last_seen: string;
  threat_level: ThreatLevel;
  total_score: number;
  attack_types_seen: string[];
  request_count: number;
  predicted_next: string | null;
  tags: string[];
  time_wasted_seconds: number;
  stage: number;
  target_interest: string | null;
}

export interface HoneypotStats {
  active_sessions: number;
  requests_today: number;
  attacks_intercepted: number;
  total_time_wasted_seconds: number;
  sessions_active?: number;
  total_sessions?: number;
  total_requests?: number;
  total_attacks?: number;
  time_wasted_seconds?: number;
}

export type WSMessage =
  | {
      type: "init";
      payload: {
        sessions: AttackerProfile[];
        recent_events: AttackEvent[];
        stats: HoneypotStats;
      };
    }
  | { type: "event"; payload: AttackEvent }
  | { type: "profile_update"; payload: AttackerProfile }
  | { type: "stats"; payload: HoneypotStats };

export type WSStatus = "connecting" | "live" | "offline";
