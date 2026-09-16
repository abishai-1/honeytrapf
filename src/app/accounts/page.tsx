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
  ExternalLink,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight
} from 'lucide-react';
import { mockAccounts, mockTransactions, formatINR } from '@/lib/mockData';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Accounts & Deposits</h1>
          <p className="text-xs text-slate-400 mt-1">
            Overview of your checking, savings, fixed deposits, and IFSC details
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-blue-900/30 flex items-center space-x-2 transition self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Open New Fixed Deposit</span>
        </button>
      </div>

      {/* Account Cards */}
      <div className="space-y-4">
        {mockAccounts.map((acc) => (
          <div
            key={acc.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-slate-700 transition"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-blue-400 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                      {acc.type}
                    </span>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {acc.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-1">{acc.name}</h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="font-mono">Account No: <strong className="text-slate-200">{acc.accountNumber}</strong></span>
                    <span>•</span>
                    <span className="font-mono">IFSC: <strong className="text-slate-200">{acc.ifscCode}</strong></span>
                    {acc.interestRate && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400 font-medium">Interest: {acc.interestRate}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Balance & Actions */}
              <div className="text-left md:text-right flex flex-col md:items-end justify-center">
                <span className="text-xs text-slate-400 font-medium">Total Ledger Balance</span>
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  {formatINR(acc.balance)}
                </span>
                <span className="text-xs text-blue-300 mt-0.5">
                  Available: {formatINR(acc.availableBalance)}
                </span>
              </div>

            </div>

            {/* Quick Actions Row */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(acc.rawAccountNumber, acc.id)}
                  className="hover:text-white flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 transition"
                >
                  {copiedId === acc.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === acc.id ? 'Copied Account No' : 'Copy Account No'}</span>
                </button>

                <button
                  onClick={() => handleCopy(acc.ifscCode, `${acc.id}-ifsc`)}
                  className="hover:text-white flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 transition"
                >
                  {copiedId === `${acc.id}-ifsc` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === `${acc.id}-ifsc` ? 'Copied IFSC' : 'Copy IFSC'}</span>
                </button>
              </div>

              <Link
                href="/transactions"
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                View Account Ledger <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Account Security & FDIC/DICGC Advisory */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white text-sm">Deposit Insurance & Security Guarantee</h4>
            <p className="text-slate-400 mt-0.5">
              VaultBank deposits are protected by 256-bit hardware security keys and insured up to ₹5,00,000 per account under DICGC guidelines.
            </p>
          </div>
        </div>
        <Link
          href="/support"
          className="text-blue-400 hover:underline font-semibold whitespace-nowrap"
        >
          Read Deposit Terms &rarr;
        </Link>
      </div>

    </div>
  );
}
