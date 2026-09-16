'use client';

import React, { useState } from 'react';
import {
  Activity,
  Cpu,
  Database,
  Terminal,
  RefreshCw,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { mockSystemDebugInfo } from '@/lib/mockData';

export default function AdminDebugPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-6 font-mono">
      
      {/* Internal System Diagnostic Header */}
      <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs text-amber-400 font-bold bg-amber-950 border border-amber-800 px-3 py-1 rounded-full mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>CONFIDENTIAL INTERNAL INFRASTRUCTURE DIAGNOSTICS</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-sans flex items-center gap-2">
            <Activity className="w-6 h-6 text-amber-400" /> Vault System Kernel Debug Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Environment: <strong className="text-amber-300">{mockSystemDebugInfo.environment}</strong> • Node ID: <code className="text-slate-200">MUM-PROD-SYS01</code>
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-amber-900/40 flex items-center space-x-2 transition self-start md:self-auto font-sans"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh System Metrics</span>
        </button>
      </div>

      {/* Primary Health Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Cluster Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-white">{mockSystemDebugInfo.applicationStatus}</p>
          <p className="text-[10px] text-slate-500">Kernel {mockSystemDebugInfo.vaultVersion}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Server CPU & Load</span>
            <Cpu className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-sm font-bold text-white">{mockSystemDebugInfo.cpuUsage}</p>
          <p className="text-[10px] text-slate-500">{mockSystemDebugInfo.serverHealth}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Database Node</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-white">PostgreSQL Primary</p>
          <p className="text-[10px] text-emerald-400">Active-Active Node 01 Synced</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span>Active Banking Sessions</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-sm font-bold text-white">{mockSystemDebugInfo.activeSessions.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-slate-500">Uptime: {mockSystemDebugInfo.uptime}</p>
        </div>

      </div>

      {/* Internal System Logs Preview */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
          <div className="flex items-center space-x-2 text-amber-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>REAL-TIME KERNEL SYSLOG STREAM (`/var/log/vault/system.log`)</span>
          </div>
          <span className="text-[10px] text-slate-500">Live Buffer: 4 lines shown</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-[11px] text-slate-300 overflow-x-auto">
          {mockSystemDebugInfo.logsPreview.map((log, idx) => (
            <div key={idx} className="flex space-x-3 items-start hover:bg-slate-900/50 p-1 rounded">
              <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                log.level === 'INFO' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                log.level === 'WARN' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                'bg-slate-800 text-slate-300'
              }`}>
                {log.level}
              </span>
              <span className="text-amber-400 font-bold shrink-0">{log.module}:</span>
              <span className="text-slate-200">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
