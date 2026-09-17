'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wallet,
  Building2,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Send,
  Receipt,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Download,
  Lock,
  PlusCircle,
  FileCheck,
  Search,
  CheckCircle2,
  UserCheck,
  Zap,
  PieChart,
  ShieldCheck,
  Clock,
  ExternalLink
} from 'lucide-react';
import {
  mockCustomer,
  mockAccounts,
  totalAvailableBalance,
  mockTransactions,
  mockCards,
  formatINR
} from '@/lib/mockData';

export default function BankingDashboard() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');
  const [payeeAccount, setPayeeAccount] = useState('');
  const [selectedPayee, setSelectedPayee] = useState<string | null>(null);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const quickPayees = [
    { name: 'Rohan Deshmukh', account: '•••• 4491', bank: 'VaultBank', avatar: 'RD' },
    { name: 'Zerodha Escrow', account: '•••• 8291', bank: 'HDFC Escrow', avatar: 'ZE' },
    { name: 'DLF Crest Maint', account: '•••• 1028', bank: 'ICICI Bank', avatar: 'DL' },
    { name: 'Tata Power Bill', account: '•••• 8109', bank: 'BillPay', avatar: 'TP' },
    { name: 'Priya Vance (Wife)', account: '•••• 3091', bank: 'VaultBank', avatar: 'PV' },
  ];

  const handleQuickTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setShowTransferModal(false);
      setTransferAmount('');
      setPayeeAccount('');
      setSelectedPayee(null);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      
      {/* Ticker Advisory Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
            ANNOUNCEMENT
          </span>
          <span className="truncate">
            Special High-Yield Fixed Deposit interest revised to <strong>8.25% p.a.</strong> for 555 days tenure.
          </span>
        </div>
        <Link href="/accounts" className="text-blue-400 font-semibold hover:underline shrink-0 hidden sm:inline">
          Invest Now &rarr;
        </Link>
      </div>

      {/* Main Welcome Hero */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-[#7f1d1d] border border-amber-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-yellow-300/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs text-amber-100 font-bold mb-1">
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>Vault Premier Private Wealth</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Good morning, {mockCustomer.name}
            </h1>
            <p className="text-xs text-amber-100/90 mt-1">
              Customer ID: <code className="text-white font-mono">{mockCustomer.id}</code> • Preferred Branch: {mockCustomer.preferredBranch}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowTransferModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30 flex items-center space-x-2 transition"
            >
              <Send className="w-4 h-4" />
              <span>Instant Transfer</span>
            </button>
            <Link
              href="/statements"
              className="bg-white/15 hover:bg-white/25 text-white border border-white/25 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Advice</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Accounts & Net Worth Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Total Net Worth Card */}
        <div className="bg-gradient-to-br from-blue-900/60 to-indigo-950/80 border border-blue-700/50 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 rounded-xl bg-blue-600/30 text-blue-300">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold text-blue-200 bg-blue-950/80 border border-blue-700/60 px-2.5 py-0.5 rounded-full">
              Combined Liquid Capital
            </span>
          </div>
          <p className="text-xs text-blue-200 font-medium">Total Available Net Balance</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
            {formatINR(totalAvailableBalance)}
          </p>
          <div className="mt-4 pt-3 border-t border-blue-800/40 flex justify-between items-center text-xs text-blue-300">
            <span>2 Active Deposit Accounts</span>
            <Link href="/accounts" className="text-white hover:underline font-bold flex items-center gap-1">
              View Ledger &rarr;
            </Link>
          </div>
        </div>

        {/* Checking Account */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-0.5 rounded-full">
              {mockAccounts[0].status}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">{mockAccounts[0].name}</p>
          <p className="text-2xl font-bold text-white mt-1 tracking-tight">
            {formatINR(mockAccounts[0].balance)}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>{mockAccounts[0].accountNumber}</span>
            <span className="text-slate-300 font-mono">IFSC: {mockAccounts[0].ifscCode}</span>
          </div>
        </div>

        {/* Savings Account */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-800 px-2.5 py-0.5 rounded-full">
              {mockAccounts[1].interestRate}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">{mockAccounts[1].name}</p>
          <p className="text-2xl font-bold text-white mt-1 tracking-tight">
            {formatINR(mockAccounts[1].balance)}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>{mockAccounts[1].accountNumber}</span>
            <span className="text-emerald-400 font-semibold">+₹39,820.00 Interest Paid</span>
          </div>
        </div>

      </div>

      {/* Quick Payee Carousel */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" /> Quick Beneficiaries (1-Click Transfer)
          </h3>
          <span className="text-[11px] text-blue-400 cursor-pointer hover:underline" onClick={() => setShowTransferModal(true)}>
            + Add New Payee
          </span>
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto pb-1">
          {quickPayees.map((payee, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedPayee(payee.name);
                setPayeeAccount(payee.account);
                setShowTransferModal(true);
              }}
              className="bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center shrink-0 w-32 space-y-1.5 transition group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-900/50 border border-blue-700/60 text-blue-300 font-bold text-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                {payee.avatar}
              </div>
              <span className="text-xs font-semibold text-white truncate max-w-full">{payee.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">{payee.account}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Extended Content: Financial Analytics & Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions List (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Live Transaction Stream</h3>
              <p className="text-xs text-slate-400">Real-time debit/credit settlement feed</p>
            </div>
            <Link
              href="/transactions"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              All Transactions &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-800/80">
            {mockTransactions.slice(0, 6).map((txn) => (
              <Link
                key={txn.id}
                href={`/transactions/${txn.id}`}
                className="py-3.5 flex items-center justify-between hover:bg-slate-800/40 px-2 rounded-xl transition group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2.5 rounded-xl text-white ${
                    txn.type === 'credit' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {txn.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white group-hover:text-blue-400 transition">{txn.merchant}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {txn.date} • {txn.category} • <span className="font-mono text-slate-500">{txn.id}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-xs font-bold ${txn.type === 'credit' ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {txn.type === 'credit' ? '+' : '-'}{formatINR(txn.amount)}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-semibold">{txn.status}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Active Metal Cards & Investment Portfolio */}
        <div className="space-y-6">
          
          {/* Metal Card Preview */}
          <div className="bank-card-metal rounded-2xl p-5 relative overflow-hidden text-slate-100 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-amber-400 font-extrabold">Vault Metal Infinite</p>
                <p className="text-xs text-slate-300 mt-0.5">{mockCards[0].cardCategory} Card</p>
              </div>
              <CreditCard className="w-6 h-6 text-amber-400" />
            </div>

            <div className="pt-3">
              <p className="font-mono text-base tracking-widest text-white font-bold">
                {mockCards[0].cardNumber}
              </p>
            </div>

            <div className="flex justify-between items-end pt-2 text-xs">
              <div>
                <p className="text-[9px] uppercase text-slate-400">Card Holder</p>
                <p className="font-semibold text-slate-200">{mockCards[0].cardHolder}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase text-slate-400">Expires</p>
                <p className="font-semibold text-slate-200">{mockCards[0].expiry}</p>
              </div>
            </div>
          </div>

          {/* Fixed Deposits & Wealth Portfolio Widget */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Investments & Wealth</h4>
              <span className="text-[10px] text-emerald-400 font-semibold">+8.25% p.a.</span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300 font-semibold">
                <span>Tax Shield Fixed Deposit</span>
                <span className="text-white">{formatINR(1500000.00)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Maturity: Oct 2027</span>
                <span className="text-emerald-400 font-mono">Interest: 8.25%</span>
              </div>
            </div>

            <Link
              href="/accounts"
              className="w-full text-center block bg-slate-950 hover:bg-slate-800 border border-slate-800 text-blue-400 text-xs py-2 rounded-xl font-semibold transition"
            >
              Open New Deposit &rarr;
            </Link>
          </div>

        </div>

      </div>

      {/* Quick Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" /> Instant Money Transfer
              </h3>
              <button
                onClick={() => setShowTransferModal(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
            </div>

            {transferSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Transfer Executed</h4>
                <p className="text-xs text-slate-400">
                  Reference: <code className="text-blue-400 font-mono">TXN-UPI-{Math.floor(100000 + Math.random() * 900000)}</code>
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickTransfer} className="space-y-4">
                {selectedPayee && (
                  <div className="bg-blue-950/60 border border-blue-800 text-blue-200 p-3 rounded-xl text-xs flex justify-between items-center">
                    <span>Payee: <strong>{selectedPayee}</strong></span>
                    <span className="font-mono text-[10px] text-blue-300">{payeeAccount}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">From Account</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white">
                    <option>{mockAccounts[0].name} ({formatINR(mockAccounts[0].balance)})</option>
                    <option>{mockAccounts[1].name} ({formatINR(mockAccounts[1].balance)})</option>
                  </select>
                </div>

                {!selectedPayee && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Beneficiary Account / UPI ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 409210928811 or payee@upi"
                      value={payeeAccount}
                      onChange={(e) => setPayeeAccount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Transfer Amount (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="Enter amount e.g. 50000"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg shadow-emerald-900/40 transition"
                >
                  Authorize Payment with 2FA OTP
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
