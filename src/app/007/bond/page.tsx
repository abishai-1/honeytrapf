'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StatsPanel } from '@/app/components/StatsPanel';
import { AttackFeed } from '@/app/components/AttackFeed';
import { ThreatProfile } from '@/app/components/ThreatProfile';
import { RequestViewer } from '@/app/components/RequestViewer';
import { useHoneypotWS } from '@/lib/useHoneypotWS';
import {
  Shield,
  Radio,
  Award,
  Activity,
  Cpu,
  Terminal,
  RefreshCw,
  Database,
  CheckCircle2,
  Lock,
  Layers,
  Search,
  ArrowLeft
} from 'lucide-react';
import { mockInternalServices, mockSystemDebugInfo } from '@/lib/mockData';
import type { AttackerProfile } from '@/lib/types';

export default function Agent007BondConsole() {
  const [activeTab, setActiveTab] = useState<'soc' | 'debug' | 'services'>('soc');
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

  // Local state for manually assigned points (admin controls)
  const [bonusPoints, setBonusPoints] = useState<Record<string, number>>({});
  const [awardMessage, setAwardMessage] = useState<string | null>(null);
  const [servicesSearch, setServicesSearch] = useState('');

  const handleGivePoints = (sessionId: string, pointsToAdd: number) => {
    setBonusPoints((prev) => ({
      ...prev,
      [sessionId]: (prev[sessionId] || 0) + pointsToAdd
    }));

    setAwardMessage(`Awarded +${pointsToAdd} threat points to intruder session ${sessionId.slice(-6)}`);
    setTimeout(() => setAwardMessage(null), 2500);
  };

  const filteredServices = mockInternalServices.filter(
    (s) =>
      s.name.toLowerCase().includes(servicesSearch.toLowerCase()) ||
      s.endpoint.toLowerCase().includes(servicesSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(servicesSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-mono p-4 sm:p-8 space-y-6 selection:bg-cyan-600 selection:text-white">
      
      {/* Secret Top Header */}
      <div className="bg-[#0b1020] border border-cyan-900/60 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold text-sm shadow-inner">
            007
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                CLASSIFIED AGENT 007 BOND OPERATIONAL CONTROL
              </span>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                status === 'live' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}>
                ● {status.toUpperCase()}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight font-sans">
              Autonomous Honeypot Deception & Intruder Management Console
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {awardMessage && (
            <div className="bg-cyan-950 border border-cyan-700 text-cyan-200 text-xs px-3 py-1.5 rounded-xl animate-fade-in">
              {awardMessage}
            </div>
          )}

          <Link
            href="/dashboard"
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition font-sans"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Bank
          </Link>
        </div>
      </div>

      {/* Navigation Tabs (SOC Monitor, Deception Diagnostics, Services Matrix) */}
      <div className="flex items-center bg-[#0b1020] p-1.5 rounded-2xl border border-cyan-900/40 gap-2 font-sans text-xs">
        <button
          onClick={() => setActiveTab('soc')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'soc'
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>SOC Intruder Scoring & Live Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab('debug')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'debug'
              ? 'bg-amber-950 text-amber-300 border border-amber-700/60 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Activity className="w-4 h-4 text-amber-400" />
          <span>Internal System Diagnostics (/admin/debug)</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'services'
              ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/60 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>Internal Microservices Directory (/internal/services)</span>
        </button>
      </div>

      {/* TAB 1: SOC INTRUDER CONTROL */}
      {activeTab === 'soc' && (
        <div className="space-y-6">
          <StatsPanel stats={stats} profileCount={profiles.length} eventCount={events.length} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Intruder Profiles & Manual Points Control */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex justify-between items-center px-1 text-xs text-slate-400">
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
                      <div className="mt-2 p-2 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px] flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          Points: <strong className="text-white">{(modifiedProfile.total_score).toFixed(0)}</strong>
                        </span>

                        <div className="flex items-center space-x-1 font-sans">
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

            {/* Right: Attack Feed & Request Inspector */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#0c1225] border border-[#1a2540] rounded-2xl p-4 shadow-xl">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
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
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Decoy Response & Payload Inspector
                  </h3>
                  <RequestViewer event={selected} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SYSTEM DIAGNOSTICS */}
      {activeTab === 'debug' && (
        <div className="space-y-6 font-mono">
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs text-amber-400 font-bold bg-amber-950 border border-amber-800 px-3 py-1 rounded-full mb-2">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>INTERNAL DIAGNOSTICS DEception SURFACE</span>
              </div>
              <h2 className="text-xl font-bold text-white">System Kernel Diagnostic Metrics</h2>
              <p className="text-xs text-slate-400 mt-1">
                Node ID: MUM-PROD-SYS01 • Kernel: {mockSystemDebugInfo.vaultVersion}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#0c1225] border border-[#1a2540] rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Cluster Status</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-sm font-bold text-white">{mockSystemDebugInfo.applicationStatus}</p>
            </div>

            <div className="bg-[#0c1225] border border-[#1a2540] rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>CPU Usage</span>
                <Cpu className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-sm font-bold text-white">{mockSystemDebugInfo.cpuUsage}</p>
            </div>

            <div className="bg-[#0c1225] border border-[#1a2540] rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Database Node</span>
                <Database className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-sm font-bold text-white">PostgreSQL Primary Node 01</p>
            </div>

            <div className="bg-[#0c1225] border border-[#1a2540] rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span>Active Sessions</span>
                <Activity className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-sm font-bold text-white">{mockSystemDebugInfo.activeSessions.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="bg-[#0c1225] border border-[#1a2540] rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Live Syslog Stream (`/var/log/vault/system.log`)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              {mockSystemDebugInfo.logsPreview.map((log, idx) => (
                <div key={idx} className="flex space-x-3 items-start">
                  <span className="text-slate-500">[{log.timestamp}]</span>
                  <span className="text-amber-400 font-bold">{log.module}:</span>
                  <span className="text-slate-200">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MICROSERVICES DIRECTORY */}
      {activeTab === 'services' && (
        <div className="space-y-6 font-mono">
          <div className="bg-[#0c1225] border border-cyan-900/60 rounded-2xl p-4">
            <input
              type="text"
              placeholder="Search microservices by name, endpoint (/api/...) or ID..."
              value={servicesSearch}
              onChange={(e) => setServicesSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((srv) => (
              <div key={srv.id} className="bg-[#0c1225] border border-[#1a2540] rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-500 font-bold">{srv.id}</span>
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {srv.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{srv.name}</h3>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                  <p className="text-blue-400 font-bold">{srv.endpoint}</p>
                  <p className="text-slate-400 text-[10px]">Build: {srv.version}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                  <span>Latency: <strong className="text-emerald-400">{srv.latencyMs}ms</strong></span>
                  <span>Uptime: <strong className="text-white">{srv.uptimePercentage}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
