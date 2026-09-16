'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Lock,
  Unlock,
  ShieldCheck,
  Plus,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap,
  RotateCcw
} from 'lucide-react';
import { mockCards, formatINR } from '@/lib/mockData';

export default function CardsPage() {
  const [cardsState, setCardsState] = useState(mockCards);

  const toggleCardLock = (cardId: string) => {
    setCardsState((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? { ...c, status: c.status === 'Active' ? ('Locked' as const) : ('Active' as const) }
          : c
      )
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header - Fixed to Dark Navy Text (#003366) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#003366] flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-red-600" /> Virtual & Physical Cards Management
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Manage your Executive Metal Credit Card, RuPay Select Debit Card, spending caps, and instant lock switches
          </p>
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow flex items-center space-x-2 transition self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Request Replacement Card</span>
        </button>
      </div>

      {/* Cards List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cardsState.map((card) => {
          const isLocked = card.status === 'Locked';
          const percentSpent = Math.min((card.spentThisMonth / card.monthlyLimit) * 100, 100);
          const isCreditCard = card.cardCategory === 'Credit';

          return (
            <div key={card.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
              
              {/* Graphic Card Surface with distinct colors */}
              <div
                className={`rounded-2xl p-6 text-white space-y-6 transition relative overflow-hidden shadow-lg ${
                  isCreditCard
                    ? 'bg-gradient-to-br from-[#002b5b] via-[#004080] to-[#b91c1c] border border-red-500/40'
                    : 'bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#003366] border border-blue-400/40'
                } ${isLocked ? 'opacity-60 grayscale' : ''}`}
              >
                {/* Background watermark/patterns */}
                <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                      VaultBank {isCreditCard ? 'Executive Premier' : 'RuPay Select Debit'}
                    </span>
                    <p className="text-xs font-extrabold text-slate-100 mt-0.5">{card.type}</p>
                  </div>
                  <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm ${
                    isCreditCard ? 'bg-red-600 text-white border-red-400' : 'bg-[#003366] text-white border-blue-300'
                  }`}>
                    {card.cardCategory}
                  </span>
                </div>

                <div className="pt-2">
                  <p className="font-mono text-xl tracking-widest font-black text-white drop-shadow">
                    {card.cardNumber}
                  </p>
                </div>

                <div className="flex justify-between items-end text-xs">
                  <div>
                    <p className="text-[9px] uppercase text-slate-200 font-bold">Card Holder</p>
                    <p className="font-extrabold text-white">{card.cardHolder}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-slate-200 font-bold">Expires</p>
                    <p className="font-extrabold text-white">{card.expiry}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-slate-200 font-bold">CVV</p>
                    <p className="font-mono text-slate-100 font-bold">•••</p>
                  </div>
                </div>
              </div>

              {/* Card Controls & Limits */}
              <div className="space-y-4 text-xs">
                
                {/* Monthly Spending Limit Progress */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-600 font-bold">Monthly Spending Cap</span>
                    <span className="text-slate-900 font-extrabold">
                      {formatINR(card.spentThisMonth)} / {formatINR(card.monthlyLimit)}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCreditCard ? 'bg-gradient-to-r from-red-600 to-rose-700' : 'bg-gradient-to-r from-blue-600 to-indigo-700'
                      }`}
                      style={{ width: `${percentSpent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => toggleCardLock(card.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                      isLocked
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {isLocked ? <Lock className="w-4 h-4 text-red-600" /> : <Unlock className="w-4 h-4 text-emerald-600" />}
                    <span>{isLocked ? 'Unlock Card' : 'Lock Card Immediately'}</span>
                  </button>

                  <button className="flex items-center space-x-1.5 text-blue-800 hover:underline font-extrabold">
                    <Sliders className="w-3.5 h-3.5 text-red-600" />
                    <span>Set ATM & Online Limits</span>
                  </button>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
