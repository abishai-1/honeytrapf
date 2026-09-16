"use client";

import { Activity, Clock3, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { AttackFeed } from "./components/AttackFeed";
import { RequestViewer } from "./components/RequestViewer";
import { StatsPanel } from "./components/StatsPanel";
import { ThreatProfile } from "./components/ThreatProfile";
import { useHoneypotWS } from "@/lib/useHoneypotWS";

function utcClock() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    hour12: false
  }).format(new Date());
}

export default function Home() {
  const { events, profiles, stats, selected, setSelected, status } = useHoneypotWS();
  const [clock, setClock] = useState(utcClock());

  useEffect(() => {
    const timer = setInterval(() => setClock(utcClock()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-soc-bg text-soc-text">
      <header className="sticky top-0 z-20 border-b border-soc-border bg-soc-bg/92 backdrop-blur">
        <div className="flex min-h-16 items-center justify-between gap-4 px-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center border border-soc-border bg-soc-panel text-soc-watching shadow-glow">
              <ShieldAlert size={21} />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-[0.24em] text-white">HONEYPOT CONTROL CENTER</h1>
              <p className="text-xs text-soc-dim">MediTrack Pro deception telemetry</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-2 text-soc-watching">
              <span className={`h-2.5 w-2.5 rounded-full ${status === "live" ? "animate-pulse bg-soc-watching" : "bg-soc-critical"}`} />
              {status === "live" ? "LIVE" : status.toUpperCase()}
            </span>
            <span className="hidden items-center gap-2 text-soc-dim sm:flex">
              <Clock3 size={14} />
              UTC {clock}
            </span>
          </div>
        </div>
      </header>

      <section className="space-y-4 p-5">
        <StatsPanel stats={stats} profileCount={profiles.length} eventCount={events.length} />

        <div className="grid min-h-[calc(100vh-180px)] gap-4 lg:grid-cols-[minmax(280px,30%)_1fr]">
          <aside className="min-h-0 overflow-hidden border border-soc-border bg-soc-panel">
            <div className="flex items-center justify-between border-b border-soc-border px-4 py-3">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-white">THREAT PROFILES</h2>
              <span className="flex items-center gap-1 text-xs text-soc-dim">
                <Activity size={13} />
                {profiles.length}
              </span>
            </div>
            <div className="max-h-[calc(100vh-242px)] space-y-3 overflow-y-auto p-3">
              {profiles.map((profile) => (
                <ThreatProfile key={profile.session_id} profile={profile} active={selected?.session_id === profile.session_id} />
              ))}
            </div>
          </aside>

          <section className="grid min-h-0 gap-4 xl:grid-rows-[minmax(320px,52%)_1fr]">
            <AttackFeed events={events} selectedId={selected?.id ?? null} onSelect={setSelected} />
            <RequestViewer event={selected} />
          </section>
        </div>
      </section>
    </main>
  );
}
