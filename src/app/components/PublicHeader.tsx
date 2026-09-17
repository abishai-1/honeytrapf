'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Lock, ShieldCheck } from 'lucide-react';

const navItems = [
  { href: '/', label: 'NetBanking Login' },
  { href: '/loans', label: 'Loans' },
  { href: '/emi-calculator', label: 'EMI Calculator' },
  { href: '/schemes', label: 'FD & Schemes' },
  { href: '/upi', label: 'UPI' },
  { href: '/branches', label: 'Branches' },
  { href: '/mobile-app', label: 'Mobile App' },
  { href: '/faq', label: 'FAQ' },
  { href: '/help', label: 'Help & Support' },
];

export default function PublicHeader() {
  const pathname = usePathname();

  return (
    <>
      <div className="bg-[#b91c1c] text-white text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3 text-[11px] font-medium">
          <span className="flex items-center gap-1 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Official NetBanking Portal
          </span>
          <span className="opacity-60 hidden md:inline">|</span>
          <span className="hidden md:inline">DICGC Insured up to ₹5 Lakhs</span>
          <span className="opacity-60 hidden lg:inline">|</span>
          <span className="hidden lg:inline">Toll Free Helpline: 1800-400-VAULT (82858)</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <Link href="/loans" className="hover:underline font-semibold hidden sm:inline">Loans</Link>
          <Link href="/schemes" className="hover:underline font-semibold hidden sm:inline">FD Schemes</Link>
          <Link href="/upi" className="hover:underline font-semibold hidden md:inline">UPI</Link>
          <Link href="/faq" className="hover:underline font-semibold hidden lg:inline">FAQ</Link>
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            256-Bit SSL Encrypted
          </span>
        </div>
      </div>

      <header className="bg-[#003366] text-white py-4 px-6 sm:px-12 border-b-4 border-red-600 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-red-600 border border-white/30 flex items-center justify-center text-white shadow">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white block leading-none">
                VAULT<span className="text-red-500 font-black">BANK</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-200 font-bold mt-0.5 block">
                Public Sector Commercial Enterprise
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center space-x-4 text-[11px] font-bold text-slate-100">
            {navItems.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:text-red-400 transition whitespace-nowrap ${active ? 'text-red-400' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/#hero"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow transition flex items-center gap-1.5 shrink-0"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>NetBanking Sign In</span>
          </Link>
        </div>
      </header>
    </>
  );
}
