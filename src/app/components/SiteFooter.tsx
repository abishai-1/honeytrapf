'use client';

import Link from 'next/link';
import { PhoneCall, ShieldCheck } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="border-t-4 border-[#003366] bg-slate-900 text-slate-300 text-xs py-12 px-4 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded bg-red-600 text-white flex items-center justify-center font-black text-base shadow">
              VB
            </div>
            <div>
              <span className="text-white font-extrabold text-base block">VaultBank Limited</span>
              <span className="text-[11px] text-slate-400">A Premier Public Sector Financial Institution • Govt of India Enterprise</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-red-950 text-red-400 border border-red-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-red-500" /> DICGC Insured Deposit Protection
            </span>
            <span className="bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-blue-400" /> 1800-400-VAULT
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-6 text-xs text-slate-400">
          <div className="space-y-2">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-red-500">Personal Banking</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/accounts" className="hover:text-white transition">Savings Accounts</Link></li>
              <li><Link href="/accounts" className="hover:text-white transition">Salary Checking</Link></li>
              <li><Link href="/schemes" className="hover:text-white transition">Fixed & Tax Shield FD</Link></li>
              <li><Link href="/schemes" className="hover:text-white transition">Recurring Deposits</Link></li>
              <li><Link href="/cards" className="hover:text-white transition">Debit & Metal Credit Cards</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-red-500">Loans & Advances</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/loans" className="hover:text-white transition">Home Loans @ 8.40%</Link></li>
              <li><Link href="/loans" className="hover:text-white transition">Car & EV Loans @ 8.75%</Link></li>
              <li><Link href="/loans" className="hover:text-white transition">Personal Loans @ 10.25%</Link></li>
              <li><Link href="/emi-calculator" className="hover:text-white transition">EMI Calculator</Link></li>
              <li><Link href="/loans" className="hover:text-white transition">MSME Business Loans</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-red-500">Deposits & Schemes</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/schemes" className="hover:text-white transition">Public Provident Fund (PPF)</Link></li>
              <li><Link href="/schemes" className="hover:text-white transition">Sukanya Samriddhi Yojana</Link></li>
              <li><Link href="/schemes" className="hover:text-white transition">National Pension System (NPS)</Link></li>
              <li><Link href="/schemes" className="hover:text-white transition">Sovereign Gold Bonds (SGB)</Link></li>
              <li><Link href="/reports" className="hover:text-white transition">Form 15G / 15H Exemption</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-red-500">Digital Payments</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/upi" className="hover:text-white transition">BHIM UPI & Scan-to-Pay</Link></li>
              <li><Link href="/upi" className="hover:text-white transition">UPI Autopay Mandates</Link></li>
              <li><Link href="/transactions" className="hover:text-white transition">IMPS / NEFT / RTGS</Link></li>
              <li><Link href="/mobile-app" className="hover:text-white transition">Vault Mobile App</Link></li>
              <li><Link href="/branches" className="hover:text-white transition">Branch & ATM Locator</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-red-500">Help Centre</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/faq" className="hover:text-white transition">Frequently Asked Questions</Link></li>
              <li><Link href="/help" className="hover:text-white transition">Help & Support Desk</Link></li>
              <li><Link href="/help" className="hover:text-white transition">WhatsApp Banking</Link></li>
              <li><Link href="/help" className="hover:text-white transition">Track Ticket Status</Link></li>
              <li><Link href="/help" className="hover:text-white transition">Toll Free: 1800-400-82858</Link></li>
            </ul>
          </div>

          <div className="space-y-2 col-span-2 sm:col-span-1">
            <h5 className="font-extrabold text-xs uppercase tracking-wider text-red-500">Customer Grievance</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/help" className="hover:text-white transition">Principal Nodal Officer</Link></li>
              <li><Link href="/help" className="hover:text-white transition">RBI Banking Ombudsman</Link></li>
              <li><Link href="/help" className="hover:text-white transition">Cyber Crime Cell Advisory</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Security & OTP FAQ</Link></li>
              <li><Link href="/" className="hover:text-white transition">NetBanking Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800 pt-6">
          <div>
            <h5 className="font-bold text-white mb-1">RBI Regulatory Advisory</h5>
            <p>VaultBank is a licensed public sector commercial bank regulated by the Reserve Bank of India. Deposit insurance of up to ₹5,00,000 per account is guaranteed under DICGC guidelines.</p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-1">Cyber Security Advisory</h5>
            <p>VaultBank never calls or sends SMS asking for 6-digit MPIN, OTP, CVV, or NetBanking passwords. Immediately report suspicious activities to our Cyber Desk.</p>
          </div>
          <div>
            <h5 className="font-bold text-white mb-1">Registered Office</h5>
            <p>Vault Bank Tower, Plot No. C-14, G-Block, Bandra Kurla Complex, Bandra (East), Mumbai - 400051, Maharashtra, India. CIN: L65190MH2021PLC90142.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-center text-[10px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>&copy; 2026 VaultBank Limited. All Rights Reserved. Banking built around your world.</span>
          <div className="flex gap-3 text-[10px] text-slate-400">
            <Link href="/faq" className="hover:text-white">Privacy Policy</Link>
            <span>•</span>
            <Link href="/help" className="hover:text-white">Hyperlink Policy</Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-white">Disclaimer</Link>
            <span>•</span>
            <Link href="/" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
