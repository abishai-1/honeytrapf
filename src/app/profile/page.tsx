'use client';

import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  Smartphone,
  Lock,
  Clock,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockCustomer } from '@/lib/mockData';

export default function ProfilePage() {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <User className="w-6 h-6 text-blue-400" /> Customer Profile & Security
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage personal contact information, 2FA credentials, and login device sessions
        </p>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Profile Card */}
        <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white font-bold text-2xl flex items-center justify-center shadow-lg">
              AV
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">{mockCustomer.name}</h2>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {mockCustomer.kycStatus} KYC
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Customer ID: <code className="text-slate-200 font-mono">{mockCustomer.id}</code> • Since {mockCustomer.customerSince}
              </p>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-400" /> Email Address
              </span>
              <p className="text-slate-200 font-medium">{mockCustomer.email}</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> Mobile Number
              </span>
              <p className="text-slate-200 font-medium">{mockCustomer.phone}</p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 sm:col-span-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Registered Residential Address
              </span>
              <p className="text-slate-200 font-medium">{mockCustomer.address}</p>
            </div>
          </div>
        </div>

        {/* Relationship Manager Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Relationship Manager</h3>
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <p className="text-sm font-bold text-white">{mockCustomer.relationshipManager}</p>
            <p className="text-xs text-slate-400">Branch: {mockCustomer.preferredBranch}</p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-blue-400">
              <span className="cursor-pointer hover:underline">Direct Helpline &rarr;</span>
              <span className="cursor-pointer hover:underline">Schedule Meeting</span>
            </div>
          </div>

          <div className="bg-blue-950/40 border border-blue-800/40 p-3 rounded-xl text-xs text-blue-200 space-y-1">
            <span className="font-semibold block">Security Tier</span>
            <p className="text-slate-400 text-[11px]">{mockCustomer.securityRating} with Hardware Token</p>
          </div>
        </div>

      </div>

      {/* Security Preferences & Active Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Security Preferences Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Security & 2FA Controls
          </h3>

          {savedSuccess && (
            <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Security preferences updated successfully.
            </div>
          )}

          <form onSubmit={handleSaveSecurity} className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
              <div>
                <p className="font-bold text-white">Multi-Factor Authentication (2FA)</p>
                <p className="text-slate-400 text-[11px]">Require OTP / Authenticator App for every transfer over ₹50,000</p>
              </div>
              <input
                type="checkbox"
                checked={mfaEnabled}
                onChange={(e) => setMfaEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
              <div>
                <p className="font-bold text-white">Instant SMS / WhatsApp Transaction Alerts</p>
                <p className="text-slate-400 text-[11px]">Real-time alerts on registered phone number for all card & netbanking debits</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-blue-900/30 transition"
            >
              Save Security Preferences
            </button>
          </form>
        </div>

        {/* Login Activity & Registered Devices */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" /> Active Devices & Session Log
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" /> Chrome 128.0 (Windows 11 Desktop)
                </p>
                <p className="text-[11px] text-slate-400">IP: 103.21.124.92 • Mumbai, India</p>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
                Current Session
              </span>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-slate-400" /> Vault Banking App (iPhone 15 Pro)
                </p>
                <p className="text-[11px] text-slate-400">IP: 49.36.88.14 • Yesterday at 08:30 PM</p>
              </div>
              <button className="text-[10px] text-rose-400 hover:underline">Revoke</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
