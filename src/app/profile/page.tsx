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
      
      {/* Header - Fixed to Dark Navy Text (#003366) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm border-b border-slate-200">
        <h1 className="text-2xl font-black text-[#003366] flex items-center gap-2">
          <User className="w-6 h-6 text-red-600" /> Customer Profile & NetBanking Security
        </h1>
        <p className="text-xs text-slate-600 mt-1 font-medium">
          Manage personal contact information, 2FA credentials, and login device sessions
        </p>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Profile Card */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-red-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              BS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-[#003366]">{mockCustomer.name}</h2>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {mockCustomer.kycStatus} KYC
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Customer ID: <code className="text-slate-900 font-mono font-bold">{mockCustomer.id}</code> • Since {mockCustomer.customerSince}
              </p>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-700" /> Registered Email
              </span>
              <p className="text-slate-900 font-bold">{mockCustomer.email}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-700" /> Mobile Number
              </span>
              <p className="text-slate-900 font-bold">{mockCustomer.phone}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" /> Residential Address
              </span>
              <p className="text-slate-900 font-bold">{mockCustomer.address}</p>
            </div>
          </div>
        </div>

        {/* Relationship Manager Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-[#003366] uppercase tracking-wider">Relationship Manager</h3>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <p className="text-sm font-bold text-slate-900">{mockCustomer.relationshipManager}</p>
            <p className="text-xs text-slate-600 font-medium">Branch: {mockCustomer.preferredBranch}</p>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-red-600 font-bold">
              <span className="cursor-pointer hover:underline">Direct Helpline &rarr;</span>
              <span className="cursor-pointer hover:underline">Schedule Meeting</span>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl text-xs text-red-900 space-y-1">
            <span className="font-bold block">Security Tier</span>
            <p className="text-slate-700 text-[11px] font-medium">{mockCustomer.securityRating} with Hardware Token</p>
          </div>
        </div>

      </div>

      {/* Security Preferences & Active Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Security Preferences Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="text-base font-extrabold text-[#003366] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-600" /> Security & 2FA Controls
          </h3>

          {savedSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Security preferences updated successfully.
            </div>
          )}

          <form onSubmit={handleSaveSecurity} className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="font-bold text-slate-900">Multi-Factor Authentication (2FA)</p>
                <p className="text-slate-600 text-[11px] font-medium">Require OTP / Authenticator App for every transfer over ₹50,000</p>
              </div>
              <input
                type="checkbox"
                checked={mfaEnabled}
                onChange={(e) => setMfaEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 bg-slate-100 border-slate-300 focus:ring-red-500"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <p className="font-bold text-slate-900">Instant Transaction SMS Alerts</p>
                <p className="text-slate-600 text-[11px] font-medium">Real-time alerts on registered phone number for all card & netbanking debits</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 bg-slate-100 border-slate-300 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs shadow transition"
            >
              Save Security Preferences
            </button>
          </form>
        </div>

        {/* Login Activity & Registered Devices */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-[#003366] flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-700" /> Active Devices & Session Log
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" /> Chrome 128.0 (Windows 11 Desktop)
                </p>
                <p className="text-[11px] text-slate-500 font-mono">IP: 103.21.124.92 • Mumbai, India</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-extrabold">
                Current Session
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-slate-500" /> Vault Banking App (iPhone 15 Pro)
                </p>
                <p className="text-[11px] text-slate-500 font-mono">IP: 49.36.88.14 • Yesterday at 08:30 PM</p>
              </div>
              <button className="text-[10px] text-red-600 hover:underline font-bold">Revoke</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
