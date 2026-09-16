import type { AttackerProfile, ThreatLevel } from "@/lib/types";

const levelClass: Record<ThreatLevel, string> = {
  WATCHING: "text-soc-watching border-soc-watching/40",
  SUSPICIOUS: "text-soc-suspicious border-soc-suspicious/40",
  HOSTILE: "text-soc-hostile border-soc-hostile/40",
  CRITICAL: "text-soc-critical border-soc-critical/40"
};

function maskIp(ip: string) {
  const parts = ip.split(".");
  return parts.length === 4 ? `${parts[0]}.${parts[1]}.xxx.xxx` : ip;
}

function elapsed(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return minutes ? `${minutes}m ${seconds % 60}s` : `${seconds}s`;
}

const stageNames = ["OBSERVE", "HOOK", "VAULT", "MAZE"];

export function ThreatProfile({
  profile,
  active,
  onSelect
}: {
  profile: AttackerProfile;
  active?: boolean;
  onSelect: () => void;
}) {
  const scoreWidth = Math.min(100, Math.round(profile.total_score));

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded border bg-[#0a1020] p-3 text-left transition hover:border-soc-dim hover:bg-[#0d162b] focus:outline-none focus:ring-2 focus:ring-soc-watching/35 ${active ? "border-soc-watching/70 shadow-glow" : "border-soc-border"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm font-semibold text-white">{maskIp(profile.ip)}</p>
          <p className="mt-1 font-mono text-[11px] uppercase text-soc-dim">SESSION #{profile.session_id.slice(-5).toUpperCase()}</p>
        </div>
        <span className={`rounded border px-2 py-1 text-[10px] font-bold ${levelClass[profile.threat_level]}`}>{profile.threat_level}</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {[0, 1, 2, 3].map((stage) => (
          <span
            key={stage}
            className={`h-2 flex-1 ${stage <= profile.stage ? "bg-soc-watching" : "bg-soc-border"}`}
            title={`Stage ${stage}`}
          />
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-soc-dim">Score</span>
          <span className="font-mono text-white">{profile.total_score.toFixed(1)}</span>
        </div>
        <div className="h-2 bg-soc-border">
          <div className="h-full bg-soc-hostile" style={{ width: `${scoreWidth}%` }} />
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-soc-dim">
          Stage {String(profile.stage).padStart(2, "0")} - {stageNames[profile.stage] ?? "UNKNOWN"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {profile.tags.slice(0, 5).map((tag) => (
          <span key={tag} className="border border-soc-border px-2 py-1 text-xs text-soc-text">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-soc-border pt-3 text-xs">
        <span className="text-soc-dim">Requests: <b className="text-soc-text">{profile.request_count}</b></span>
        <span className="text-soc-dim">Wasted: <b className="text-soc-text">{elapsed(profile.time_wasted_seconds)}</b></span>
      </div>
      <p className="mt-2 text-xs text-soc-dim">Target: <b className="text-soc-text">{profile.target_interest ?? "UNKNOWN"}</b></p>
    </button>
  );
}
