'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  Copy,
  Check,
  Plus,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { mockAccounts, formatINR } from '@/lib/mockData';

export default function AccountsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#003366]">Deposit Accounts & Wealth Matrix</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage your Checking, High-Yield Savings, Tax Shield Fixed Deposits, and IFSC branch routing
          </p>
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow flex items-center space-x-2 transition self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Open New Fixed Deposit</span>
        </button>
      </div>

      {/* Account Cards */}
      <div className="space-y-4">
        {mockAccounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-slate-300 transition"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-start space-x-4">
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-[#003366] shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#003366] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {acc.type}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {acc.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#003366] mt-1">{acc.name}</h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1 font-medium">
                    <span>Account No: <strong className="text-slate-900 font-mono">{acc.accountNumber}</strong></span>
                    <span>•</span>
                    <span>IFSC: <strong className="text-slate-900 font-mono">{acc.ifscCode}</strong></span>
                    {acc.interestRate && (
                      <>
                        <span>•</span>
                        <span className="text-red-700 font-bold">Interest Rate: {acc.interestRate}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Balance & Actions */}
              <div className="text-left md:text-right flex flex-col md:items-end justify-center">
                <span className="text-xs text-slate-500 font-medium">Ledger Balance</span>
                <span className="text-2xl font-black text-[#003366] tracking-tight">
                  {formatINR(acc.balance)}
                </span>
                <span className="text-xs text-slate-600 font-semibold mt-0.5">
                  Available: {formatINR(acc.availableBalance)}
                </span>
              </div>

            </div>

            {/* Quick Actions Row */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(acc.rawAccountNumber, acc.id)}
                  className="hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-medium transition"
                >
                  {copiedId === acc.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === acc.id ? 'Copied Account No' : 'Copy Account No'}</span>
                </button>

                <button
                  onClick={() => handleCopy(acc.ifscCode, `${acc.id}-ifsc`)}
                  className="hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-medium transition"
                >
                  {copiedId === `${acc.id}-ifsc` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === `${acc.id}-ifsc` ? 'Copied IFSC' : 'Copy IFSC'}</span>
                </button>
              </div>

              <Link
                href="/transactions"
                className="text-red-600 hover:text-red-700 font-extrabold flex items-center gap-1"
              >
                View Account Ledger <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Advisory Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-blue-900">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[#003366] text-sm">DICGC Deposit Insurance Protection Guarantee</h4>
            <p className="text-slate-600 mt-0.5">
              VaultBank accounts are registered and insured up to ₹5,00,000 per depositor under DICGC guidelines.
            </p>
          </div>
        </div>
        <Link
          href="/support"
          className="text-red-600 hover:underline font-bold whitespace-nowrap"
        >
          View Terms &rarr;
        </Link>
      </div>

    </div>
  );
}
