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
      
      {/* Header - Fixed to Dark Navy Text (#003366) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#003366] flex items-center gap-2">
            <FileText className="w-6 h-6 text-red-600" /> Account Statements & Certified Ledger PDF Exports
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Download certified monthly PDF statements, annual financial summaries, and interest advice
          </p>
        </div>
      </div>

      {/* Statements Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="font-extrabold text-[#003366] uppercase tracking-wider">Official Monthly Ledger Exports</span>
          <span className="text-slate-500 font-semibold">PDF & CSV Format</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#003366] text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Statement Period</th>
                <th className="py-3.5 px-4">Account</th>
                <th className="py-3.5 px-4">Generated Date</th>
                <th className="py-3.5 px-4 text-right">Closing Balance</th>
                <th className="py-3.5 px-4">File Size</th>
                <th className="py-3.5 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
              {mockStatements.map((stm) => (
                <tr key={stm.id} className="hover:bg-slate-50 transition">
                  <td className="py-4 px-4 font-extrabold text-[#003366] flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-red-600" />
                    <span>{stm.period}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900">{stm.accountName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{stm.accountNumber}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-semibold">{stm.statementDate}</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-slate-900">
                    {formatINR(stm.closingBalance)}
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-mono">{stm.fileSize}</td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleDownloadMock(stm.id, `${stm.id}_statement.pdf`)}
                      disabled={downloadingId === stm.id}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow flex items-center space-x-1.5 transition ml-auto disabled:opacity-50"
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
