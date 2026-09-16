'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Receipt,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { mockTransactions, formatINR } from '@/lib/mockData';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'debit' | 'credit'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ['all', 'Salary', 'Shopping', 'Utilities', 'Dining', 'Investment', 'Entertainment'];

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      txn.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' || txn.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || txn.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      
      {/* Header & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-blue-400" /> Transaction Ledger
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time audit history of credits, debits, and transfers
          </p>
        </div>

        <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition self-start sm:self-auto">
          <Download className="w-4 h-4" />
          <span>Export Ledger (CSV / JSON)</span>
        </button>
      </div>

      {/* Filters & Search Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by Merchant, Transaction ID (e.g. TXN-90284102), or Ref..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start">
            <button
              onClick={() => { setTypeFilter('all'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                typeFilter === 'all' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => { setTypeFilter('debit'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                typeFilter === 'debit' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Debits Only
            </button>
            <button
              onClick={() => { setTypeFilter('credit'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                typeFilter === 'credit' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Credits Only
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Merchant / Beneficiary</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{txn.id}</td>
                    <td className="py-3.5 px-4 text-slate-400">
                      <div>{txn.date}</div>
                      <div className="text-[10px] text-slate-500">{txn.time}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100">{txn.merchant}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs">{txn.senderRecipient}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] border border-slate-700">
                        {txn.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{txn.paymentMethod}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`font-bold ${txn.type === 'credit' ? 'text-emerald-400' : 'text-slate-100'}`}>
                        {txn.type === 'credit' ? '+' : '-'}{formatINR(txn.amount)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-semibold border border-emerald-800">
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/transactions/${txn.id}`}
                        className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                      >
                        Details &rarr;
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No transactions match your search filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>

          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
