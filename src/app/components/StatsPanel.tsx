import { Clock, RadioTower, ShieldCheck, Siren } from "lucide-react";
import type { HoneypotStats } from "@/lib/types";

function compact(value: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function secondsToTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

export function StatsPanel({
  stats,
  profileCount,
  eventCount
}: {
  stats: HoneypotStats;
  profileCount: number;
  eventCount: number;
}) {
  const cards = [
    {
      label: "Active Sessions",
      value: stats.active_sessions || profileCount,
      icon: RadioTower,
      color: "text-soc-watching"
    },
    {
      label: "Requests Today",
      value: stats.requests_today || eventCount,
      icon: ShieldCheck,
      color: "text-soc-suspicious"
    },
    {
      label: "Attacks Intercepted",
      value: stats.attacks_intercepted || eventCount,
      icon: Siren,
      color: "text-soc-hostile"
    },
    {
      label: "Total Time Wasted",
      value: secondsToTime(stats.total_time_wasted_seconds || 0),
      icon: Clock,
      color: "text-soc-critical"
    }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="rounded border border-soc-border bg-soc-panel/95 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:border-soc-dim/80 hover:bg-[#101831]">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.18em] text-soc-dim">{card.label}</span>
            <card.icon className={card.color} size={18} />
          </div>
          <div className="mt-4 text-3xl font-semibold text-white">{typeof card.value === "number" ? compact(card.value) : card.value}</div>
        </article>
      ))}
    </div>
  );
}
