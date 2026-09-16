'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  KeyRound,
  Globe2,
  Smartphone,
  AlertTriangle
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState('VB-8940192');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!customerId.trim() || !password.trim()) {
        setAuthError('Please enter a valid Customer ID and Password.');
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch {
      setAuthError('Authentication service temporarily unavailable. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans text-slate-900 selection:bg-red-600 selection:text-white">
      
      {/* Top Red Security Bar */}
      <div className="bg-[#b91c1c] text-white text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Official VaultBank Internet Banking Portal</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-[11px]">
          <span>Toll-Free Helpline: 1800-400-VAULT</span>
          <span>•</span>
          <span>DICGC Deposit Protection Guarantee</span>
        </div>
      </div>

      {/* Main Navy Header */}
      <header className="bg-[#003366] text-white py-4 px-6 sm:px-12 border-b-4 border-red-600 shadow-md">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 border border-white/30 flex items-center justify-center text-white shadow">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white block leading-none">
                VAULT<span className="text-red-500 font-black">BANK</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-200 font-bold mt-0.5 block">
                Public Sector Financial Enterprise
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-semibold hidden sm:inline">
              256-Bit SSL Encrypted
            </span>
          </div>
        </div>
      </header>

      {/* Login Main Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col lg:flex-row items-center justify-center gap-12">
        
        {/* Left Hero Content */}
        <div className="flex-1 max-w-lg text-left space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-300 text-[#003366] px-3.5 py-1 rounded-full text-xs font-bold">
            <Globe2 className="w-4 h-4 text-red-600" />
            <span>VaultBank Digital NetBanking Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#003366] tracking-tight leading-tight">
            Banking built around <span className="text-red-600">your world.</span>
          </h1>

          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            Welcome to VaultBank Retail & Corporate Internet Banking. Securely access your checking accounts, high-yield deposits, instant transfers, and card controls.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#003366]">Biometric Authentication</h4>
                <p className="text-[11px] text-slate-500 font-medium">Hardware 2FA protection</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start space-x-3">
              <Smartphone className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#003366]">Instant UPI & IMPS</h4>
                <p className="text-[11px] text-slate-500 font-medium">24/7 Real-Time Settlement</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-red-900">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Mandatory Advisory:</strong> VaultBank officials never request your 6-digit MPIN, OTP, or NetBanking password over phone calls or SMS.
            </p>
          </div>
        </div>

        {/* Right White Login Card */}
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          
          <div className="mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-xl font-extrabold text-[#003366]">NetBanking Login</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Enter your credentials to access your VaultBank account
            </p>
          </div>

          {authError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 flex items-start space-x-2 font-medium">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Customer ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Customer ID / Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  placeholder="e.g. VB-8940192"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 font-semibold placeholder-slate-400 focus:outline-none focus:border-[#003366] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  NetBanking Password
                </label>
                <a href="#forgot" className="text-xs text-blue-700 font-bold hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 font-semibold placeholder-slate-400 focus:outline-none focus:border-[#003366] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Remember Device & Security Option */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-slate-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-red-600 focus:ring-red-500"
                />
                <span>Remember this device</span>
              </label>

              <span className="text-slate-500 flex items-center gap-1 text-[11px] font-semibold">
                <KeyRound className="w-3.5 h-3.5 text-red-600" /> Virtual Keyboard
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3 rounded-xl shadow text-sm flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to NetBanking</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registration Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600 font-medium">
            <span>New to VaultBank? </span>
            <a href="#register" className="text-[#003366] font-bold hover:underline">
              Register for NetBanking &rarr;
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-4 text-center text-xs border-t border-slate-800">
        <p>&copy; 2026 VaultBank Limited. Member DICGC. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
