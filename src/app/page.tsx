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
  AlertCircle
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

    // Simulated frontend fetch targetting future POST /api/auth/login route
    try {
      // Small realistic login delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!customerId.trim() || !password.trim()) {
        setAuthError('Please provide a valid Customer ID and NetBanking Password.');
        setIsLoading(false);
        return;
      }

      // Successful fake authentication redirect to dashboard
      router.push('/dashboard');
    } catch {
      setAuthError('Authentication service momentarily unavailable. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Subtle Background Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <header className="py-6 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-slate-800/40 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white block leading-tight">
              VAULT<span className="text-blue-500 font-extrabold">BANK</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Secure Banking
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline-flex items-center text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            256-Bit SSL Encrypted
          </span>
          <a
            href="#support"
            className="text-xs font-medium text-slate-300 hover:text-white transition flex items-center gap-1"
          >
            Need Help?
          </a>
        </div>
      </header>

      {/* Login Main Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col lg:flex-row items-center justify-center gap-12 relative z-10">
        
        {/* Left Hero Content */}
        <div className="flex-1 max-w-lg text-left space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-800/60 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
            <Globe2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Vault Premier Digital Banking Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Banking built around <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">your world.</span>
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed">
            Experience next-generation financial control. Access multi-currency accounts, instant domestic transfers, high-yield deposit management, and real-time security alerts.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Biometric Vault Auth</h4>
                <p className="text-[11px] text-slate-400">Zero-trust session verification</p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-start space-x-3">
              <Smartphone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white">Instant UPI & IMPS</h4>
                <p className="text-[11px] text-slate-400">24/7 high-capacity routing</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Security Notice:</strong> VaultBank will never ask for your 6-digit MPIN, OTP, or passwords via phone call, SMS, or third-party links. Always verify the domain <code className="text-white bg-slate-900 px-1 py-0.5 rounded">vaultbank-client.in</code>.
            </p>
          </div>
        </div>

        {/* Right Login Card */}
        <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-blue-950/50">
          
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Welcome Back</h2>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to your VaultBank NetBanking account
            </p>
          </div>

          {authError && (
            <div className="mb-4 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl p-3 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Customer ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Customer ID / Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  placeholder="e.g. VB-8940192"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  NetBanking Password
                </label>
                <a href="#forgot" className="text-xs text-blue-400 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Remember Device & Security Option */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                />
                <span>Remember this browser</span>
              </label>

              <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                <KeyRound className="w-3 h-3 text-emerald-400" /> Virtual Keyboard
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-900/40 text-sm flex items-center justify-center space-x-2 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to VaultBank</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Registration Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
            <span>New to VaultBank? </span>
            <a href="#register" className="text-blue-400 font-semibold hover:underline">
              Register for NetBanking &rarr;
            </a>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-600 border-t border-slate-800/40 relative z-10">
        <p>&copy; 2026 VaultBank Financial Services Ltd. Member DICGC. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
