'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Building2,
  LayoutDashboard,
  CreditCard,
  Receipt,
  FileText,
  BarChart3,
  HelpCircle,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Send,
  PhoneCall,
  MapPin,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { mockCustomer } from '@/lib/mockData';

interface VaultBankLayoutProps {
  children: React.ReactNode;
}

export default function VaultBankLayout({ children }: VaultBankLayoutProps) {
  const pathname = usePathname();
  const router = RouterHook();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isLoginPage = pathname === '/';
  const isSocRoute = pathname.startsWith('/007/bond');

  if (isLoginPage || isSocRoute) {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Accounts', href: '/accounts', icon: Building2 },
    { name: 'Transactions', href: '/transactions', icon: Receipt },
    { name: 'Cards', href: '/cards', icon: CreditCard },
    { name: 'Statements', href: '/statements', icon: FileText },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Help & Support', href: '/support', icon: HelpCircle },
  ];

  function RouterHook() {
    try {
      return useRouter();
    } catch {
      return { push: (path: string) => window.location.href = path };
    }
  }

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Red Security & Helpline Bar (Union Bank / SBI Style) */}
      <div className="bg-[#b91c1c] text-white text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3 text-[11px] font-medium">
          <span className="flex items-center gap-1 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Official NetBanking Portal
          </span>
          <span className="opacity-60 hidden md:inline">|</span>
          <span className="hidden md:inline">DICGC Insured up to ₹5 Lakhs</span>
          <span className="opacity-60 hidden lg:inline">|</span>
          <span className="hidden lg:inline">Toll Free: 1800-400-VAULT (82858)</span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <span className="hidden sm:inline">User: <strong>{mockCustomer.name}</strong></span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            256-Bit SSL Secured
          </span>
        </div>
      </div>

      {/* Main Navy Blue Header */}
      <header className="bg-[#003366] text-white sticky top-0 z-40 shadow-lg border-b-2 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Brand Logo, Search, Utilities */}
          <div className="h-16 flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/dashboard" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-red-600 border border-white/30 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1 leading-none">
                    VAULT<span className="text-red-500 font-black">BANK</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-slate-300 font-bold mt-0.5">
                    Government Approved Digital Banking
                  </span>
                </div>
              </Link>
            </div>

            {/* Quick Search */}
            <div className="hidden md:flex flex-1 max-w-sm mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search accounts, transactions, beneficiary..."
                  className="w-full bg-white/10 border border-white/20 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-300 focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-500 transition"
                />
              </div>
            </div>

            {/* Right Utilities */}
            <div className="flex items-center space-x-3">
              
              {/* Quick Transfer Button */}
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Quick Pay</span>
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className="p-2 rounded-full text-slate-200 hover:bg-white/10 relative transition"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 text-slate-900 rounded-xl shadow-2xl z-50 py-3 text-xs">
                    <div className="px-4 pb-2 border-b border-slate-100 flex justify-between items-center">
                      <span className="font-bold text-[#003366]">Recent Notifications</span>
                      <span className="text-[10px] text-blue-700 font-semibold cursor-pointer hover:underline">Clear</span>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                      <div className="p-3 hover:bg-slate-50 transition">
                        <p className="font-bold text-slate-900">Salary Credit Received</p>
                        <p className="text-slate-600 mt-0.5">₹3,25,000.00 credited to Checking •••• 4821</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">Today at 09:42 AM</span>
                      </div>
                      <div className="p-3 hover:bg-slate-50 transition">
                        <p className="font-bold text-slate-900">Interest Credit</p>
                        <p className="text-slate-600 mt-0.5">₹39,820.00 added to Super Savings •••• 9104</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">Sep 08, 2026</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center space-x-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition"
                >
                  <div className="w-8 h-8 rounded bg-red-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                    BS
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-white leading-none">{mockCustomer.name}</span>
                    <span className="text-[10px] text-slate-200 mt-0.5">ID: {mockCustomer.id}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-200" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 text-slate-900 rounded-xl shadow-2xl z-50 py-2 text-xs">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-[#003366]">{mockCustomer.name}</p>
                      <p className="text-slate-500 truncate">{mockCustomer.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-200 font-bold">
                        <ShieldCheck className="w-3 h-3" /> Tier 1 Verified Account
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center px-4 py-2 text-slate-700 hover:bg-slate-100 hover:text-blue-900 font-medium"
                    >
                      <User className="w-4 h-4 mr-2 text-slate-500" /> Profile & Security Settings
                    </Link>
                    <Link
                      href="/support"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center px-4 py-2 text-slate-700 hover:bg-slate-100 hover:text-blue-900 font-medium"
                    >
                      <HelpCircle className="w-4 h-4 mr-2 text-slate-500" /> Customer Support
                    </Link>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 font-bold transition text-left"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Bottom Row: TOP Horizontal Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-1 border-t border-white/10 py-1.5 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                    isActive
                      ? 'bg-red-600 text-white shadow font-extrabold'
                      : 'text-slate-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative bg-[#003366] text-white w-72 max-w-xs p-5 flex flex-col h-full z-10 border-r border-slate-700">
            <div className="flex items-center justify-between pb-4 border-b border-white/20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="font-black text-white text-base">VAULTBANK</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-red-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-bold transition ${
                        isActive ? 'bg-red-600 text-white' : 'text-slate-100 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-white/20 pt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-red-600 text-white text-xs font-bold shadow"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Expanded Multi-Column PSU Banking Footer */}
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

          {/* Multi-Column Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6 text-xs text-slate-400">
            
            <div className="space-y-2">
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider text-red-500">Personal Banking</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/accounts" className="hover:text-white transition">Savings Accounts</Link></li>
                <li><Link href="/accounts" className="hover:text-white transition">Salary Checking</Link></li>
                <li><Link href="/accounts" className="hover:text-white transition">Fixed & Tax Shield FD</Link></li>
                <li><Link href="/accounts" className="hover:text-white transition">Recurring Deposits</Link></li>
                <li><Link href="/cards" className="hover:text-white transition">Debit & Metal Credit Cards</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider text-red-500">Loans & Advances</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/#loans" className="hover:text-white transition">Home Loans @ 8.40%</Link></li>
                <li><Link href="/#loans" className="hover:text-white transition">Car & EV Loans @ 8.75%</Link></li>
                <li><Link href="/#loans" className="hover:text-white transition">Personal Loans @ 10.25%</Link></li>
                <li><Link href="/#calculator" className="hover:text-white transition">EMI Calculator</Link></li>
                <li><Link href="/#loans" className="hover:text-white transition">MSME Business Loans</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider text-red-500">Government Schemes</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/#schemes" className="hover:text-white transition">Public Provident Fund (PPF)</Link></li>
                <li><Link href="/#schemes" className="hover:text-white transition">Sukanya Samriddhi Yojana</Link></li>
                <li><Link href="/#schemes" className="hover:text-white transition">National Pension System (NPS)</Link></li>
                <li><Link href="/#schemes" className="hover:text-white transition">Sovereign Gold Bonds (SGB)</Link></li>
                <li><Link href="/reports" className="hover:text-white transition">Form 15G / 15H Exemption</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider text-red-500">Digital Services</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/#app" className="hover:text-white transition">Vault Mobile App (Android/iOS)</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">UPI & BHIM Auto-Mandate</Link></li>
                <li><Link href="/transactions" className="hover:text-white transition">IMPS / NEFT / RTGS</Link></li>
                <li><Link href="/support" className="hover:text-white transition">WhatsApp Banking</Link></li>
                <li><Link href="/#branches" className="hover:text-white transition">Branch & ATM Locator</Link></li>
              </ul>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider text-red-500">Customer Grievance</h5>
              <ul className="space-y-1.5 text-[11px]">
                <li><Link href="/support" className="hover:text-white transition">Principal Nodal Officer</Link></li>
                <li><Link href="/support" className="hover:text-white transition">RBI Banking Ombudsman</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Cyber Crime Cell Advisory</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Track Ticket Status</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Toll Free: 1800-400-82858</Link></li>
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
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Hyperlink Policy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Disclaimer</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Sitemap</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
