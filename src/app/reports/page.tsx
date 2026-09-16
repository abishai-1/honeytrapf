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

    setTimeout(() => {
      setIsExporting(false);
      alert(`Report generated! Simulating download for GET /api/reports?type=${reportType}&format=${exportFormat}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header - Fixed to Dark Navy Text (#003366) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#003366] flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-red-600" /> Tax & Financial Summary Analytics
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Generate itemized tax computation reports, interest earned certificates, and cash flow summaries
          </p>
        </div>
      </div>

      {/* Main Report Generation Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <form onSubmit={handleTriggerReport} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Report Category</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:outline-none focus:border-[#003366]"
              >
                <option value="summary">Monthly Cash Flow Summary</option>
                <option value="detailed">Itemized Transaction Audit Log</option>
                <option value="tax">Form 26AS Tax Computation Advice</option>
                <option value="interest">Interest Earned Certificate FY 25-26</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Financial Assessment Period</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:outline-none focus:border-[#003366]">
                <option>Current Financial Year (FY 2025-26)</option>
                <option>Previous Financial Year (FY 2024-25)</option>
                <option>Last 90 Days</option>
                <option>Custom Date Range</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Export File Format</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setExportFormat('csv')}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center space-x-1.5 font-bold transition ${
                    exportFormat === 'csv'
                      ? 'bg-[#003366] text-white border-[#003366] shadow'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4 text-red-400" />
                  <span>CSV File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat('json')}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center space-x-1.5 font-bold transition ${
                    exportFormat === 'json'
                      ? 'bg-[#003366] text-white border-[#003366] shadow'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <FileCode className="w-4 h-4 text-red-400" />
                  <span>JSON Payload</span>
                </button>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isExporting}
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-2.5 px-6 rounded-xl text-xs shadow flex items-center space-x-2 transition disabled:opacity-50"
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
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-slate-500 font-bold">Quarterly Financial Inflows</span>
          <p className="text-xl font-black text-emerald-600">{formatINR(364820.00)}</p>
          <p className="text-[10px] text-slate-500 font-medium">Salary deposits & interest payout</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-slate-500 font-bold">Quarterly Financial Outflows</span>
          <p className="text-xl font-black text-[#003366]">{formatINR(463469.00)}</p>
          <p className="text-[10px] text-slate-500 font-medium">Card debits, bills, investments</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-1 shadow-sm">
          <span className="text-slate-500 font-bold">Tax Deducted at Source (TDS)</span>
          <p className="text-xl font-black text-red-600">{formatINR(3982.00)}</p>
          <p className="text-[10px] text-slate-500 font-medium">Deposited under Section 194A</p>
        </div>
      </div>

    </div>
  );
}
