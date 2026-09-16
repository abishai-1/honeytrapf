'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Layers,
  ArrowRight
} from 'lucide-react';
import { mockInternalServices } from '@/lib/mockData';

export default function InternalServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = mockInternalServices.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Internal Services Directory Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs text-indigo-400 font-bold bg-indigo-950 border border-indigo-800 px-3 py-1 rounded-full mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>VAULT ENTERPRISE MICROSERVICES REGISTRY</span>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" /> Internal Service Mesh Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status, endpoint routing matrix, health heartbeats, and RPC latencies
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
        <input
          type="text"
          placeholder="Filter microservices by Name, Endpoint (/api/...) or Service ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Microservices Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((srv) => (
          <div
            key={srv.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 hover:border-slate-700 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">{srv.id}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{srv.name}</h3>
              </div>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {srv.status}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800/80">
              <div className="flex justify-between text-slate-400">
                <span>Route Endpoint:</span>
                <span className="text-blue-400 font-bold">{srv.endpoint}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Version Build:</span>
                <span className="text-slate-200">{srv.version}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Environment:</span>
                <span className="text-slate-300">{srv.environment}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-[11px] text-slate-400">
              <span>Latency: <strong className="text-emerald-400 font-mono">{srv.latencyMs}ms</strong></span>
              <span>Uptime: <strong className="text-slate-200 font-mono">{srv.uptimePercentage}</strong></span>
              <span>Heartbeat: {srv.lastHeartbeat}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
