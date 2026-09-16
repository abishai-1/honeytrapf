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
  AlertTriangle
} from 'lucide-react';
import { mockCards, mockTransactions, formatINR } from '@/lib/mockData';

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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-amber-400" /> Cards & Spending Controls
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your physical Metal cards, virtual debit cards, spending caps, and instant lock switches
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-blue-900/30 flex items-center space-x-2 transition self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Request New Card</span>
        </button>
      </div>

      {/* Cards List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cardsState.map((card) => {
          const isLocked = card.status === 'Locked';
          const percentSpent = Math.min((card.spentThisMonth / card.monthlyLimit) * 100, 100);

          return (
            <div key={card.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              
              {/* Card Graphical Surface */}
              <div
                className={`rounded-2xl p-6 text-slate-100 space-y-6 transition relative overflow-hidden ${
                  card.colorTheme === 'dark-gold' ? 'bank-card-metal' : 'bank-card-emerald'
                } ${isLocked ? 'opacity-60 grayscale' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                      VaultBank Executive
                    </span>
                    <p className="text-xs font-semibold text-slate-300 mt-0.5">{card.type}</p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-950/60 border border-slate-700/60 px-2.5 py-1 rounded-full">
                    {card.cardCategory}
                  </span>
                </div>

                <div className="pt-2">
                  <p className="font-mono text-xl tracking-widest font-bold text-white">
                    {card.cardNumber}
                  </p>
                </div>

                <div className="flex justify-between items-end text-xs">
                  <div>
                    <p className="text-[9px] uppercase text-slate-400">Card Holder</p>
                    <p className="font-semibold text-slate-100">{card.cardHolder}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-slate-400">Expires</p>
                    <p className="font-semibold text-slate-100">{card.expiry}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase text-slate-400">CVV</p>
                    <p className="font-mono text-slate-300">•••</p>
                  </div>
                </div>
              </div>

              {/* Card Controls & Limits */}
              <div className="space-y-4 text-xs">
                
                {/* Monthly Spending Limit Progress */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400 font-medium">Monthly Spending Limit</span>
                    <span className="text-slate-200 font-bold">
                      {formatINR(card.spentThisMonth)} / {formatINR(card.monthlyLimit)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentSpent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleCardLock(card.id)}
                      className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                        isLocked
                          ? 'bg-rose-950 text-rose-300 border-rose-800'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {isLocked ? <Lock className="w-4 h-4 text-rose-400" /> : <Unlock className="w-4 h-4 text-emerald-400" />}
                      <span>{isLocked ? 'Unlock Card' : 'Lock Card Immediately'}</span>
                    </button>
                  </div>

                  <button className="flex items-center space-x-1.5 text-blue-400 hover:underline font-semibold">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Set Daily Limits</span>
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
