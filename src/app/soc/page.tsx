'use client';

import React, { useState } from 'react';
import { StatsPanel } from '@/app/components/StatsPanel';
import { AttackFeed } from '@/app/components/AttackFeed';
import { ThreatProfile } from '@/app/components/ThreatProfile';
import { RequestViewer } from '@/app/components/RequestViewer';
import { useHoneypotWS } from '@/lib/useHoneypotWS';
import { Shield, Radio, Sparkles, Award } from 'lucide-react';
import type { AttackerProfile } from '@/lib/types';

export default function SOCControlCenter() {
  const {
    events,
    focusedEvents,
    profiles,
    stats,
    selected,
    setSelected,
    selectedSessionId,
    setSelectedSessionId,
    status
  } = useHoneypotWS();

  // Local state for manually assigned points (demo / admin controls)
  const [bonusPoints, setBonusPoints] = useState<Record<string, number>>({});
  const [awardMessage, setAwardMessage] = useState<string | null>(null);

  const handleGivePoints = (sessionId: string, pointsToAdd: number) => {
    setBonusPoints((prev) => ({
      ...prev,
      [sessionId]: (prev[sessionId] || 0) + pointsToAdd
    }));

    setAwardMessage(`Awarded +${pointsToAdd} threat points to intruder session ${sessionId.slice(-6)}`);
    setTimeout(() => setAwardMessage(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top SOC Bar */}
      <div className="bg-[#0c1225] border border-cyan-900/60 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                SOC Threat Intelligence & Deception Control Center
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                status === 'live' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}>
                ● {status.toUpperCase()}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Intruder Scoring & Deception Console</h1>
          </div>
        </div>

        {awardMessage && (
          <div className="bg-cyan-950 border border-cyan-700 text-cyan-200 text-xs px-3 py-1.5 rounded-xl font-mono animate-fade-in">
            {awardMessage}
          </div>
        )}
      </div>

      {/* Stats Metric Panel */}
      <StatsPanel stats={stats} profileCount={profiles.length} eventCount={events.length} />

      {/* Main Grid: Profiles List + Attack Feed + Request Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Intruder Profiles & Manual Points Control (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex justify-between items-center px-1 text-xs text-slate-400 font-mono">
            <span>INTRUDER SESSIONS ({profiles.length})</span>
            <span>SORT: THREAT SCORE &darr;</span>
          </div>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {profiles.map((p) => {
              const currentBonus = bonusPoints[p.session_id] || 0;
              const modifiedProfile: AttackerProfile = {
                ...p,
                total_score: p.total_score + currentBonus
              };

              return (
                <div key={p.session_id} className="relative group">
                  <ThreatProfile
                    profile={modifiedProfile}
                    active={selectedSessionId === p.session_id}
                    onSelect={() => setSelectedSessionId(selectedSessionId === p.session_id ? null : p.session_id)}
                  />

                  {/* Manual Points Award Control */}
                  <div className="mt-2 p-2 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      Points: <strong className="text-white">{(modifiedProfile.total_score).toFixed(0)}</strong>
                    </span>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGivePoints(p.session_id, 10);
                        }}
                        className="bg-amber-950 hover:bg-amber-900 border border-amber-700/60 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold transition"
                        title="Give +10 threat points"
                      >
                        +10 Pts
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGivePoints(p.session_id, 25);
                        }}
                        className="bg-rose-950 hover:bg-rose-900 border border-rose-700/60 text-rose-300 px-2 py-0.5 rounded text-[10px] font-bold transition"
                        title="Give +25 threat points"
                      >
                        +25 Pts
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Attack Feed & Request Inspector (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#0c1225] border border-[#1a2540] rounded-2xl p-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              Live Attack Telemetry Feed
            </h3>
            <AttackFeed
              events={focusedEvents}
              selectedId={selected?.id ?? null}
              focusedSessionId={selectedSessionId}
              onClearFocus={() => setSelectedSessionId(null)}
              onSelect={setSelected}
            />
          </div>

          {selected && (
            <div className="bg-[#0c1225] border border-[#1a2540] rounded-2xl p-4 shadow-xl">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                Decoy Response & Payload Inspector
              </h3>
              <RequestViewer event={selected} />
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
