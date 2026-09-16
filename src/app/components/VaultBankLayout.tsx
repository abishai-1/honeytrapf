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
  Smartphone,
  CheckCircle2,
  Send,
  Lock,
  ArrowRight
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

  // If on login page or secret SOC route /007/bond, bypass standard banking wrapper
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
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Security Banner */}
      <div className="bg-slate-950 border-b border-slate-800/80 text-xs py-1.5 px-4 sm:px-8 text-slate-400 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium text-slate-300">VaultBank NetBanking 256-Bit SSL Encrypted Session</span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="hidden md:inline text-slate-400">Node: MUM-IN-PRI-01</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px]">
          <span className="hidden sm:inline text-slate-400">Welcome, <strong>{mockCustomer.name}</strong></span>
          <span className="bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800/80 text-[10px] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Secured Connection
          </span>
        </div>
      </div>

      {/* Main Authenticated Top Header */}
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Logo, Search, Utilities */}
          <div className="h-16 flex items-center justify-between gap-4">
            
            {/* Brand Logo & Mobile menu button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/dashboard" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1 leading-none">
                    VAULT<span className="text-blue-500">BANK</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">
                    Secure NetBanking
                  </span>
                </div>
              </Link>
            </div>

            {/* Quick Search */}
            <div className="hidden md:flex flex-1 max-w-sm mx-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search accounts, transactions, beneficiary..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Right Utilities */}
            <div className="flex items-center space-x-3">
              
              {/* Quick Transfer Button */}
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md shadow-blue-900/30 transition"
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
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 relative transition"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 py-3 text-xs">
                    <div className="px-4 pb-2 border-b border-slate-800 flex justify-between items-center">
                      <span className="font-semibold text-white">Notifications</span>
                      <span className="text-[10px] text-blue-400 cursor-pointer hover:underline">Mark read</span>
                    </div>
                    <div className="divide-y divide-slate-800 max-h-64 overflow-y-auto">
                      <div className="p-3 hover:bg-slate-800/50 transition">
                        <p className="font-semibold text-white">Salary Credit Received</p>
                        <p className="text-slate-400 mt-0.5">₹3,25,000.00 credited to Checking •••• 4821</p>
                        <span className="text-[10px] text-slate-500 mt-1 block">Today at 09:42 AM</span>
                      </div>
                      <div className="p-3 hover:bg-slate-800/50 transition">
                        <p className="font-semibold text-white">Interest Accrued</p>
                        <p className="text-slate-400 mt-0.5">₹39,820.00 added to Super Savings •••• 9104</p>
                        <span className="text-[10px] text-slate-500 mt-1 block">Sep 08, 2026</span>
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
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-800 border border-slate-800 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 text-white font-bold flex items-center justify-center text-xs shadow-inner">
                    AV
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-200 leading-none">{mockCustomer.name}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">ID: {mockCustomer.id}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 py-2 text-xs">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="font-bold text-white">{mockCustomer.name}</p>
                      <p className="text-slate-400 truncate">{mockCustomer.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] bg-blue-950 text-blue-400 px-2 py-0.5 rounded border border-blue-800">
                        <ShieldCheck className="w-3 h-3" /> Tier 1 Executive Customer
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <User className="w-4 h-4 mr-2 text-slate-400" /> Profile & Security Settings
                    </Link>
                    <Link
                      href="/support"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <HelpCircle className="w-4 h-4 mr-2 text-slate-400" /> Help Desk
                    </Link>
                    <div className="border-t border-slate-800 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-rose-400 hover:bg-rose-950/30 transition text-left"
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
          <nav className="hidden lg:flex items-center space-x-1 border-t border-slate-800/80 py-1.5 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
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
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative bg-slate-900 w-72 max-w-xs p-5 flex flex-col h-full z-10 border-r border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-white text-base">VAULTBANK</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
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
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                        isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-rose-950/40 text-rose-300 border border-rose-900/50 text-xs font-semibold"
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

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-10 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                VB
              </div>
              <span className="text-white font-bold text-sm">VaultBank Financial Services India Ltd.</span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="hover:text-white cursor-pointer">Privacy Notice</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Security Policy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Terms of NetBanking</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">DICGC Deposit Insurance Certificate</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] text-slate-400 leading-relaxed">
            <div>
              <h5 className="font-bold text-slate-200 mb-1">Regulatory Notice</h5>
              <p>VaultBank is a licensed banking institution regulated by the Reserve Bank of India (RBI Registration No. B-90142). All deposits up to ₹5,00,000 are insured by DICGC.</p>
            </div>
            <div>
              <h5 className="font-bold text-slate-200 mb-1">Security Standard</h5>
              <p>Certified ISO 27001:2022 Information Security Management System. Transactions protected by hardware 2FA and TLS 1.3 protocol.</p>
            </div>
            <div>
              <h5 className="font-bold text-slate-200 mb-1">24/7 Helpline</h5>
              <p>National Priority Desk: 1800-400-VAULT (82858) • Emergency Card Lock SMS: BLOCK 8842 to 56161.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 text-center text-[10px] text-slate-400">
            &copy; 2026 VaultBank Limited. All Rights Reserved. Banking built around your world.
          </div>
        </div>
      </footer>
    </div>
  );
}
