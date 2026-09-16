'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  PhoneCall,
  Mail,
  ChevronDown,
  Send,
  CheckCircle2,
  Ticket
} from 'lucide-react';
import { mockFAQs, mockSupportTickets } from '@/lib/mockData';

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Cards & Security');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-400" /> Vault Support & Priority Assistance
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Access 24/7 dedicated executive banking help desk, submit secure inquiries, or view ticket history
        </p>
      </div>

      {/* Helplines Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4 shadow-xl">
          <div className="p-3 bg-blue-950 text-blue-400 rounded-xl border border-blue-800">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white">24/7 Toll-Free Priority Helpline</h4>
            <p className="text-blue-400 font-mono font-bold mt-0.5">1800-400-VAULT (82858)</p>
            <p className="text-[10px] text-slate-400">Toll-free across India</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4 shadow-xl">
          <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-800">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white">Priority Concierge Desk</h4>
            <p className="text-slate-200 font-medium mt-0.5">priority@vaultbank-client.in</p>
            <p className="text-[10px] text-slate-400">Guaranteed response under 2 hours</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4 shadow-xl">
          <div className="p-3 bg-indigo-950 text-indigo-400 rounded-xl border border-indigo-800">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white">Instant WhatsApp Banking</h4>
            <p className="text-slate-200 font-medium mt-0.5">+91 22 8940 1000</p>
            <p className="text-[10px] text-slate-400">Send 'HI' for quick balance</p>
          </div>
        </div>
      </div>

      {/* Main Support Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* FAQs Accordion */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white">Frequently Asked Questions</h3>

          <div className="space-y-3 text-xs">
            {mockFAQs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 font-semibold text-slate-200 flex justify-between items-center hover:text-white"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-slate-400 text-[11px] leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Secure Messaging Form & Ticket History */}
        <div className="space-y-6">
          
          {/* Submit New Ticket */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Submit Secure Inquiry</h3>

            {ticketSubmitted ? (
              <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs p-4 rounded-xl text-center space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="font-bold text-white">Support Ticket Submitted</p>
                <p className="text-[11px]">Ticket ID: TICK-{Math.floor(10000 + Math.random() * 90000)} has been logged.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Inquiry Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option>Cards & Security</option>
                    <option>Transfers & Payments</option>
                    <option>Tax & Statements</option>
                    <option>Wealth & Fixed Deposits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your request"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Message Details</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your query in detail..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl text-xs shadow-lg shadow-blue-900/30 flex items-center justify-center space-x-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Encrypted Ticket</span>
                </button>
              </form>
            )}
          </div>

          {/* Ticket History */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Ticket History</h4>
            
            <div className="divide-y divide-slate-800/80 text-xs">
              {mockSupportTickets.map((t) => (
                <div key={t.id} className="py-2.5 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-200">{t.subject}</p>
                    <p className="text-[10px] text-slate-500">{t.id} • {t.createdAt}</p>
                  </div>
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-800">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
