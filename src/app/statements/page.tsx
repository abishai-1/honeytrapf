'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Search,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { mockStatements, formatINR } from '@/lib/mockData';

export default function StatementsPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownloadMock = (id: string, filename: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`VaultBank Statement Download Simulated: ${filename}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" /> Account Statements & Tax Advisories
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Download certified monthly PDF statements and annual financial summaries
          </p>
        </div>
      </div>

      {/* Statements Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center text-xs">
          <span className="font-bold text-white uppercase tracking-wider">Official Monthly Ledger Exports</span>
          <span className="text-slate-400">PDF & CSV Format</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Statement Period</th>
                <th className="py-3.5 px-4">Account</th>
                <th className="py-3.5 px-4">Generated Date</th>
                <th className="py-3.5 px-4 text-right">Closing Balance</th>
                <th className="py-3.5 px-4">File Size</th>
                <th className="py-3.5 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {mockStatements.map((stm) => (
                <tr key={stm.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-blue-400" />
                    <span>{stm.period}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-200">{stm.accountName}</div>
                    <div className="text-[10px] text-slate-500">{stm.accountNumber}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{stm.statementDate}</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-slate-100">
                    {formatINR(stm.closingBalance)}
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-mono">{stm.fileSize}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleDownloadMock(stm.id, `${stm.id}_statement.pdf`)}
                      disabled={downloadingId === stm.id}
                      className="bg-blue-600/90 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow flex items-center space-x-1.5 transition ml-auto disabled:opacity-50"
                    >
                      {downloadingId === stm.id ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      <span>{downloadingId === stm.id ? 'Generating PDF...' : 'Download PDF'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
