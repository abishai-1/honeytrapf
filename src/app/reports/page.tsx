'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileCode,
  Calendar,
  Filter,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { formatINR } from '@/lib/mockData';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('summary');
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleTriggerReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExporting(true);

    // Simulated fetch targetting GET /api/reports route
    setTimeout(() => {
      setIsExporting(false);
      alert(`Report generated! Simulating download for GET /api/reports?type=${reportType}&format=${exportFormat}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" /> Financial Reports & Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Generate comprehensive ledger reports, tax computation summaries, and transaction exports
        </p>
      </div>

      {/* Main Report Generation Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <form onSubmit={handleTriggerReport} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="summary">Monthly Cash Flow Summary</option>
                <option value="detailed">Itemized Transaction Audit Log</option>
                <option value="tax">Form 26AS Tax Computation Advice</option>
                <option value="interest">Interest Earned Certificate FY 25-26</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Date Range</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500">
                <option>Current Financial Year (FY 2025-26)</option>
                <option>Previous Financial Year (FY 2024-25)</option>
                <option>Last 90 Days</option>
                <option>Custom Date Range</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Export Data Format</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setExportFormat('csv')}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center space-x-1.5 font-semibold transition ${
                    exportFormat === 'csv'
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>CSV File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat('json')}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center space-x-1.5 font-semibold transition ${
                    exportFormat === 'json'
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <FileCode className="w-4 h-4" />
                  <span>JSON Payload</span>
                </button>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isExporting}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-6 rounded-xl text-xs shadow-lg shadow-emerald-900/30 flex items-center space-x-2 transition disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Compiling Report...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generate & Export Report</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-slate-400 font-medium">Total Inflows (This Quarter)</span>
          <p className="text-xl font-bold text-emerald-400">{formatINR(364820.00)}</p>
          <p className="text-[10px] text-slate-500">Includes salary & interest payouts</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-slate-400 font-medium">Total Outflows (This Quarter)</span>
          <p className="text-xl font-bold text-slate-200">{formatINR(463469.00)}</p>
          <p className="text-[10px] text-slate-500">Includes bill payments & card purchases</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-1">
          <span className="text-slate-400 font-medium">Tax Deducted at Source (TDS)</span>
          <p className="text-xl font-bold text-amber-400">{formatINR(3982.00)}</p>
          <p className="text-[10px] text-slate-500">Deposited under Section 194A</p>
        </div>
      </div>

    </div>
  );
}
