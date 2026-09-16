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
      label: "Sessions Active",
      value: stats.active_sessions ?? stats.sessions_active ?? stats.total_sessions ?? profileCount,
      icon: RadioTower,
      color: "text-soc-watching"
    },
    {
      label: "Requests Today",
      value: stats.requests_today ?? stats.total_requests ?? eventCount,
      icon: ShieldCheck,
      color: "text-soc-suspicious"
    },
    {
      label: "Attacks Intercepted",
      value: stats.attacks_intercepted ?? stats.total_attacks ?? eventCount,
      icon: Siren,
      color: "text-soc-hostile"
    },
    {
      label: "Time Wasted",
      value: secondsToTime(stats.total_time_wasted_seconds ?? stats.time_wasted_seconds ?? 0),
      icon: Clock,
      color: "text-soc-critical"
    }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="border border-soc-border bg-soc-panel p-4">
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
