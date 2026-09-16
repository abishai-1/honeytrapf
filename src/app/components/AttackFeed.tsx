import type { AttackEvent, ThreatLevel } from "@/lib/types";

const levelBorder: Record<ThreatLevel, string> = {
  WATCHING: "border-l-soc-watching",
  SUSPICIOUS: "border-l-soc-suspicious",
  HOSTILE: "border-l-soc-hostile",
  CRITICAL: "border-l-soc-critical"
};

function timeOnly(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString("en-US", { hour12: false });
}

export function AttackFeed({
  events,
  selectedId,
  onSelect
}: {
  events: AttackEvent[];
  selectedId: string | null;
  onSelect: (event: AttackEvent) => void;
}) {
  return (
    <section className="min-h-0 overflow-hidden border border-soc-border bg-soc-panel">
      <div className="hidden grid-cols-[84px_136px_1fr_130px_70px] gap-3 border-b border-soc-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-soc-dim md:grid">
        <span>Time</span>
        <span>Type</span>
        <span>Request</span>
        <span>IP</span>
        <span>Score</span>
      </div>
      <div className="max-h-[calc(52vh-70px)] overflow-y-auto">
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => onSelect(event)}
            className={`grid w-full gap-2 border-l-4 border-b border-b-soc-border px-4 py-3 text-left text-sm transition hover:bg-white/[0.04] md:grid-cols-[84px_136px_1fr_130px_70px] md:gap-3 ${levelBorder[event.threat_level]} ${selectedId === event.id ? "bg-white/[0.06]" : ""}`}
          >
            <span className="font-mono text-xs text-soc-dim">{timeOnly(event.timestamp)}</span>
            <span className="truncate border border-soc-border px-2 py-1 text-[11px] font-semibold text-white">{event.attack_type}</span>
            <span className="min-w-0 truncate font-mono">
              <b className="text-soc-watching">{event.method}</b> {event.path}
            </span>
            <span className="font-mono text-xs text-soc-text">{event.ip}</span>
            <span className="font-mono text-soc-hostile">+{event.score}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
