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
      
      {/* Header - Fixed to Dark Navy Text (#003366) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#003366] flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-red-600" /> Executive Banking Help Desk & Support
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            24/7 dedicated concierge desk, secure ticket inquiries, helpline numbers, and FAQs
          </p>
        </div>
      </div>

      {/* Helplines Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-200">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-[#003366]">National Toll-Free Helpline</h4>
            <p className="text-red-600 font-mono font-black mt-0.5">1800-400-VAULT (82858)</p>
            <p className="text-[10px] text-slate-500 font-medium">Toll-free 24/7 across India</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-800 rounded-xl border border-blue-200">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-[#003366]">Priority Desk Email</h4>
            <p className="text-slate-900 font-bold mt-0.5">priority@vaultbank-client.in</p>
            <p className="text-[10px] text-slate-500 font-medium">Under 2 hour SLA response</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-[#003366]">WhatsApp Banking</h4>
            <p className="text-slate-900 font-bold mt-0.5">+91 22 8940 1000</p>
            <p className="text-[10px] text-slate-500 font-medium">Send 'HI' for quick balance</p>
          </div>
        </div>
      </div>

      {/* Main Support Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* FAQs Accordion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-[#003366]">Frequently Asked Questions</h3>

          <div className="space-y-3 text-xs">
            {mockFAQs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden transition">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 font-bold text-slate-800 flex justify-between items-center hover:text-[#003366]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-slate-600 text-[11px] leading-relaxed border-t border-slate-200 pt-3 font-medium">
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-[#003366]">Submit Encrypted Inquiry</h3>

            {ticketSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-xl text-center space-y-1 font-medium">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-900">Support Ticket Submitted</p>
                <p className="text-[11px]">Ticket ID: TICK-{Math.floor(10000 + Math.random() * 90000)} has been logged.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Inquiry Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:outline-none focus:border-[#003366]"
                  >
                    <option>Cards & Security</option>
                    <option>Transfers & Payments</option>
                    <option>Tax & Statements</option>
                    <option>Wealth & Fixed Deposits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of your request"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:outline-none focus:border-[#003366]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Message Details</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your query in detail..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-900 font-semibold focus:outline-none focus:border-[#003366]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-2.5 rounded-xl text-xs shadow flex items-center justify-center space-x-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Ticket &rarr;</span>
                </button>
              </form>
            )}
          </div>

          {/* Ticket History */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#003366] uppercase tracking-wider">Ticket History</h4>
            
            <div className="divide-y divide-slate-100 text-xs">
              {mockSupportTickets.map((t) => (
                <div key={t.id} className="py-2.5 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{t.subject}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{t.id} • {t.createdAt}</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-200">
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
