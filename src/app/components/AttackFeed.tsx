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
  focusedSessionId,
  onClearFocus,
  onSelect
}: {
  events: AttackEvent[];
  selectedId: string | null;
  focusedSessionId: string | null;
  onClearFocus: () => void;
  onSelect: (event: AttackEvent) => void;
}) {
  return (
    <section className="min-h-0 overflow-hidden rounded border border-soc-border bg-soc-panel/95">
      <div className="flex items-center justify-between border-b border-soc-border px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">LIVE ATTACK FEED</h2>
        {focusedSessionId && (
          <button
            className="rounded border border-soc-border px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-soc-dim transition hover:border-soc-watching hover:text-soc-watching focus:outline-none focus:ring-2 focus:ring-soc-watching/40"
            onClick={onClearFocus}
          >
            Clear Focus
          </button>
        )}
      </div>
      <div className="hidden grid-cols-[84px_140px_1fr_132px_76px] gap-3 border-b border-soc-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-soc-dim md:grid">
        <span>Time</span>
        <span>Type</span>
        <span>Request</span>
        <span>IP</span>
        <span>Score</span>
      </div>
      <div className="max-h-[calc(52vh-70px)] overflow-y-auto">
        {!events.length && <p className="px-4 py-12 text-center text-sm text-soc-dim">No attack events in this view.</p>}
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => onSelect(event)}
            className={`animate-feed-in grid w-full gap-2 border-l-4 border-b border-b-soc-border px-4 py-3 text-left text-sm transition hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-soc-watching/35 md:grid-cols-[84px_140px_1fr_132px_76px] md:gap-3 ${levelBorder[event.threat_level]} ${selectedId === event.id ? "bg-white/[0.06]" : ""}`}
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
