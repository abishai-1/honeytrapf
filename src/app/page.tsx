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
  AlertTriangle,
  Calculator,
  MapPin,
  Sparkles,
  Download,
  PhoneCall,
  CreditCard,
  TrendingUp,
  Percent,
  ChevronRight,
  ChevronDown,
  Award,
  Search,
  QrCode,
  Landmark,
  PiggyBank,
  HelpCircle,
  Headphones
} from 'lucide-react';
import { formatINR } from '@/lib/mockData';

export default function LandingPage() {
  const router = useRouter();

  // Login form state
  const [customerId, setCustomerId] = useState('VB-8940192');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Interactive EMI Calculator state
  const [loanType, setLoanType] = useState<'home' | 'car' | 'personal'>('home');
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // ₹50 Lakhs
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  // Rates
  const rates = { home: 8.40, car: 8.75, personal: 10.25 };
  const currentRate = rates[loanType];

  // Calculate monthly EMI formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEMI = () => {
    const monthlyRate = currentRate / (12 * 100);
    const months = tenureYears * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateEMI();
  const totalPayment = monthlyEMI * tenureYears * 12;
  const totalInterest = totalPayment - loanAmount;

  // Branch locator search state
  const [citySearch, setCitySearch] = useState('Mumbai');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const branches = [
    { city: 'Mumbai', name: 'BKC Corporate Branch & Premier Lounge', address: 'Plot C-14, G-Block, BKC, Bandra East, Mumbai 400051', ifsc: 'VAUL0000409', phone: '022-68940100' },
    { city: 'New Delhi', name: 'Connaught Place Flagship Branch', address: '44 Janpath, Connaught Place, New Delhi 110001', ifsc: 'VAUL0000101', phone: '011-23348800' },
    { city: 'Bengaluru', name: 'MG Road Tech & Wealth Hub', address: '12 M.G. Road, Bengaluru, Karnataka 560001', ifsc: 'VAUL0000560', phone: '080-49102000' },
    { city: 'Chennai', name: 'Anna Salai Main Branch', address: '782 Anna Salai, Thousand Lights, Chennai 600002', ifsc: 'VAUL0000600', phone: '044-28509000' }
  ];

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

  const landingFaqs = [
    { q: 'How do I register for VaultBank NetBanking?', a: 'Use your Customer ID, registered mobile number, and debit card PIN to complete first-time registration. Activation is completed after a one-time OTP on your registered mobile.' },
    { q: 'What is the maximum UPI transfer limit?', a: 'Retail UPI limits are ₹1 lakh per transaction and ₹2 lakh per day for verified accounts. Vault Premier customers can request a higher limit from NetBanking after 2FA.' },
    { q: 'Are fixed deposits covered by DICGC insurance?', a: 'Yes. All VaultBank deposits including savings, current, and FDs are insured up to ₹5,00,000 per depositor under DICGC guidelines issued by the Reserve Bank of India.' },
    { q: 'Can I pre-close a tax-saving FD?', a: '5-year Tax Shield FDs under Section 80C cannot be closed before maturity. Regular FDs may be pre-closed after 7 days with a 1% interest penalty.' },
  ];

  return (
    <div className="bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* SECTION 1: HERO & LOGIN CARD */}
      <section id="hero" className="bg-gradient-to-b from-blue-50 via-slate-100 to-white py-12 px-4 sm:px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Hero Pitch & Announcements */}
          <div className="flex-1 max-w-xl text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-300 text-[#003366] px-3.5 py-1 rounded-full text-xs font-bold">
              <Globe2 className="w-4 h-4 text-red-600" />
              <span>VaultBank Premier Internet Banking Portal</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-[#003366] tracking-tight leading-tight">
              Banking built around <span className="text-red-600">your world.</span>
            </h1>

            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              Experience seamless digital banking with VaultBank. Enjoy high-yield deposit interest rates of up to <strong>8.25% p.a.</strong>, instant home loans at <strong>8.40% p.a.</strong>, and 24/7 UPI & IMPS transfers.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/upi"
                className="bg-[#003366] hover:bg-[#002244] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow flex items-center gap-1.5"
              >
                Explore UPI Services <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/schemes"
                className="bg-white border border-slate-300 text-[#003366] px-4 py-2.5 rounded-xl text-xs font-extrabold hover:border-red-400 flex items-center gap-1.5"
              >
                View FD Rates <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Feature Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start space-x-3">
                <Percent className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#003366]">High FD Rates</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Up to 8.25% p.a. tenure yield</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-start space-x-3">
                <Smartphone className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#003366]">Instant UPI & IMPS</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Zero transaction charges</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-red-900">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Safety Notice:</strong> VaultBank officials never request your 6-digit MPIN, OTP, or NetBanking password over phone calls or SMS.
              </p>
            </div>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
            
            <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#003366]">NetBanking Login</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Enter credentials to access your account
                </p>
              </div>
              <Lock className="w-5 h-5 text-red-600" />
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
                  <span>Remember device</span>
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
              <button onClick={() => router.push('/dashboard')} className="text-[#003366] font-bold hover:underline">
                Register for NetBanking &rarr;
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: INTERACTIVE EMI CALCULATOR */}
      <section id="calculator" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                <Calculator className="w-4 h-4" /> Financial Planning Tool
              </div>
              <h2 className="text-2xl font-black text-[#003366]">Vault EMI Calculator</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Calculate your monthly EMI, total interest payable, and repayment schedule
              </p>
            </div>

            <Link href="/emi-calculator" className="text-xs font-extrabold text-red-600 hover:underline self-start">
              Full calculator page &rarr;
            </Link>

            {/* Loan Type Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
              <button
                onClick={() => setLoanType('home')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  loanType === 'home' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home Loan (8.40%)
              </button>
              <button
                onClick={() => setLoanType('car')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  loanType === 'car' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Car Loan (8.75%)
              </button>
              <button
                onClick={() => setLoanType('personal')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  loanType === 'personal' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Personal (10.25%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Input */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Loan Amount Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Required Loan Amount</span>
                  <span className="font-extrabold text-[#003366] text-base font-mono">{formatINR(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="20000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>₹1 Lakh</span>
                  <span>₹1 Crore</span>
                  <span>₹2 Crore</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Loan Tenure</span>
                  <span className="font-extrabold text-[#003366] text-base font-mono">{tenureYears} Years ({tenureYears * 12} Months)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

            </div>

            {/* EMI Output Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#003366] to-[#001a33] text-white rounded-2xl p-6 shadow-lg space-y-5">
              <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-300">Monthly EMI Payable</span>
                <span className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold text-white">
                  {currentRate}% Interest p.a.
                </span>
              </div>

              <p className="text-3xl font-black text-white font-mono tracking-tight">
                {formatINR(monthlyEMI)} <span className="text-xs font-medium text-slate-300">/ month</span>
              </p>

              <div className="space-y-2 text-xs pt-2 border-t border-white/10 text-slate-300 font-medium">
                <div className="flex justify-between">
                  <span>Principal Amount</span>
                  <span className="font-bold text-white font-mono">{formatINR(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest Payable</span>
                  <span className="font-bold text-red-400 font-mono">{formatINR(totalInterest)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10 text-white font-bold">
                  <span>Total Amount Payable</span>
                  <span className="font-mono text-emerald-400">{formatINR(totalPayment)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-2.5 rounded-xl text-xs shadow transition"
              >
                Apply Online in 3 Minutes &rarr;
              </button>
              <Link
                href="/emi-calculator"
                className="block w-full text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Open Full EMI Calculator
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: LOAN PRODUCTS & SCHEMES GRID */}
      <section id="loans" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Financial Products & Loans</span>
          <h2 className="text-3xl font-black text-[#003366]">Loans Tailored to Your Ambitions</h2>
          <p className="text-xs text-slate-600 font-medium">
            Enjoy low interest rates, zero hidden charges, and instant digital approvals
          </p>
          <Link
            href="/loans"
            className="inline-flex items-center gap-1 text-xs font-extrabold text-red-600 hover:underline pt-1"
          >
            View complete loan catalogue <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-blue-400 transition group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-[#003366] flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                Starting @ 8.40% p.a.
              </span>
              <h3 className="text-lg font-bold text-[#003366] mt-1.5">Vault Home Loans</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Fund your dream home with zero processing fee for corporate salary account holders.
              </p>
            </div>
            <button onClick={() => router.push('/loans')} className="text-xs font-extrabold text-blue-700 group-hover:text-red-600 flex items-center gap-1 transition">
              Apply Now &rarr;
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-blue-400 transition group">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Starting @ 8.75% p.a.
              </span>
              <h3 className="text-lg font-bold text-[#003366] mt-1.5">EV & Car Loans</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Up to 100% on-road financing for electric and luxury vehicles with 7-year repayment.
              </p>
            </div>
            <button onClick={() => router.push('/loans')} className="text-xs font-extrabold text-blue-700 group-hover:text-red-600 flex items-center gap-1 transition">
              Apply Now &rarr;
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-blue-400 transition group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Up to ₹25 Lakhs
              </span>
              <h3 className="text-lg font-bold text-[#003366] mt-1.5">Pre-Approved Personal Loan</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Instant disbursal into your checking account in under 60 seconds with 2FA authorization.
              </p>
            </div>
            <button onClick={() => router.push('/loans')} className="text-xs font-extrabold text-blue-700 group-hover:text-red-600 flex items-center gap-1 transition">
              Check Eligibility &rarr;
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-blue-400 transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                MSME Special Scheme
              </span>
              <h3 className="text-lg font-bold text-[#003366] mt-1.5">Business & MSME Credit</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Working capital limits, overdraft facilities, and CGTMSE collateral-free loans up to ₹5 Crore.
              </p>
            </div>
            <button onClick={() => router.push('/loans')} className="text-xs font-extrabold text-blue-700 group-hover:text-red-600 flex items-center gap-1 transition">
              Explore MSME &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 4: BRANCH & ATM LOCATOR */}
      <section id="branches" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-[#003366] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" /> Nationwide Branch Network
              </div>
              <h2 className="text-2xl font-black text-white">Find VaultBank Branches & ATMs Near You</h2>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Over 4,500 branches and 12,000 cash deposit ATMs across India
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
              <Search className="w-4 h-4 text-slate-300 ml-2" />
              <input
                type="text"
                placeholder="Enter City or Pincode..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-300 focus:outline-none px-2 py-1"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/branches"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1"
            >
              Open full branch directory <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((b, idx) => (
              <div key={idx} className="bg-white/10 border border-white/15 rounded-xl p-4 space-y-2 text-xs backdrop-blur-sm hover:bg-white/20 transition">
                <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">{b.city}</span>
                <h4 className="font-bold text-white text-sm mt-1">{b.name}</h4>
                <p className="text-slate-300 text-[11px] leading-relaxed">{b.address}</p>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-300 font-mono">
                  <span>IFSC: {b.ifsc}</span>
                  <span>{b.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: MOBILE APP PROMOTION */}
      <section id="app" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            <span className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-bold">
              Vault Mobile NetBanking App
            </span>
            <h2 className="text-3xl font-black text-[#003366]">Bank Anywhere, Anytime with Biometric Security</h2>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Download the official Vault Mobile App for iOS and Android. Enjoy instant BHIM UPI transfers, biometric face unlock, virtual debit card management, and 24/7 transaction alerts.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/mobile-app" className="bg-[#003366] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow hover:bg-[#002244] transition">
                <Smartphone className="w-4 h-4 text-red-500" />
                <span>Download on App Store</span>
              </Link>
              <Link href="/mobile-app" className="bg-[#003366] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow hover:bg-[#002244] transition">
                <Download className="w-4 h-4 text-red-500" />
                <span>Get it on Google Play</span>
              </Link>
              <Link href="/mobile-app" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow">
                Explore the app <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3 shrink-0">
            <div className="w-32 h-32 bg-white border border-slate-300 mx-auto rounded-xl p-2 flex items-center justify-center shadow-inner">
              <div className="grid grid-cols-4 gap-1.5 w-full h-full p-2 bg-slate-900 rounded">
                <div className="bg-white rounded"></div>
                <div className="bg-[#003366] rounded"></div>
                <div className="bg-white rounded"></div>
                <div className="bg-red-600 rounded"></div>
                <div className="bg-[#003366] rounded"></div>
                <div className="bg-white rounded"></div>
                <div className="bg-red-600 rounded"></div>
                <div className="bg-white rounded"></div>
                <div className="bg-red-600 rounded"></div>
                <div className="bg-white rounded"></div>
                <div className="bg-[#003366] rounded"></div>
                <div className="bg-white rounded"></div>
              </div>
            </div>
            <p className="text-xs font-bold text-[#003366]">Scan QR to Download App</p>
            <p className="text-[10px] text-slate-500 font-semibold">Supported on iOS 15+ & Android 9+</p>
          </div>

        </div>
      </section>

      {/* SECTION 6: FD & GOVERNMENT SCHEMES */}
      <section id="schemes" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Deposits & Government Schemes</span>
            <h2 className="text-3xl font-black text-[#003366]">Fixed Deposits, PPF, NPS & Gold Bonds</h2>
            <p className="text-xs text-slate-600 font-medium max-w-2xl">
              Book high-yield FDs from ₹10,000, invest in PPF and Sukanya Samriddhi, and subscribe to Sovereign Gold Bonds through NetBanking.
            </p>
          </div>
          <Link
            href="/schemes"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1 shadow shrink-0"
          >
            Compare all schemes <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: PiggyBank, title: 'Retail Fixed Deposit', rate: 'Up to 8.25% p.a.', copy: 'Flexible 7-day to 10-year tenures. Senior citizens earn an extra 0.50%.' },
            { icon: Landmark, title: 'Tax Shield FD (80C)', rate: '7.75% p.a. • 5 years', copy: 'Lock-in 5-year deposit with tax deduction up to ₹1.5 lakh under Section 80C.' },
            { icon: Award, title: 'Public Provident Fund', rate: '7.10% p.a.', copy: '15-year sovereign-backed savings with EEE tax treatment and ₹1.5 lakh annual cap.' },
            { icon: Sparkles, title: 'Sukanya Samriddhi', rate: '8.20% p.a.', copy: 'For a girl child below 10 years. Account can be opened at any VaultBank branch.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{item.rate}</span>
                <h3 className="text-base font-bold text-[#003366]">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: UPI */}
      <section id="upi" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-md grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
              <QrCode className="w-3.5 h-3.5" /> BHIM UPI on VaultBank
            </span>
            <h2 className="text-3xl font-black text-[#003366]">Send, collect and autopay with UPI 24×7</h2>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Link any VaultBank savings or salary account to a UPI ID, scan merchant QR codes, pay via mobile number, and set Autopay mandates for SIPs, insurance, and utility bills. Zero merchant MDR for P2P transfers.
            </p>
            <ul className="text-xs text-slate-600 font-medium space-y-2">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Daily limit up to ₹2 lakh on verified devices</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Credit card on UPI and RuPay TAP & PAY</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Instant dispute raise and transaction freeze</li>
            </ul>
            <Link
              href="/upi"
              className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow"
            >
              Open UPI centre <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Scan & Pay', copy: 'Pay any BharatQR or UPI QR in under 3 seconds.' },
              { title: 'UPI Number', copy: 'Send money using a 10-digit UPI number instead of VPA.' },
              { title: 'Autopay', copy: 'e-Mandates for SIPs, OTT, insurance and school fees.' },
              { title: 'UPI Lite', copy: 'On-device wallet up to ₹2,000 without PIN for small spends.' },
            ].map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="text-sm font-bold text-[#003366]">{card.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-1">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ */}
      <section id="faq" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Knowledge Centre</span>
            <h2 className="text-3xl font-black text-[#003366] mt-1">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-600 font-medium mt-1">Quick answers on NetBanking, deposits, UPI limits, and insurance.</p>
          </div>
          <Link
            href="/faq"
            className="bg-[#003366] hover:bg-[#002244] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1 shadow shrink-0"
          >
            Browse all FAQs <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3">
          {landingFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.q} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 font-bold text-sm text-[#003366] flex justify-between items-center gap-3"
                >
                  <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-red-600 shrink-0" /> {faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <p className="px-4 pb-4 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 9: HELP & SUPPORT */}
      <section id="help" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-[#003366] text-white rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                <Headphones className="w-4 h-4" /> 24×7 Customer Care
              </div>
              <h2 className="text-2xl font-black">Help & Support</h2>
              <p className="text-xs text-slate-300 font-medium mt-1 max-w-xl">
                Speak to a banker, raise an encrypted ticket, or visit a branch. Lost card blocking is available round the clock.
              </p>
            </div>
            <Link
              href="/help"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1 shadow shrink-0"
            >
              Open help desk <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/10 border border-white/15 rounded-xl p-4">
              <PhoneCall className="w-5 h-5 text-red-400 mb-2" />
              <h4 className="font-bold text-white">Toll-free helpline</h4>
              <p className="text-slate-300 mt-1 font-mono">1800-400-VAULT (82858)</p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-4">
              <CreditCard className="w-5 h-5 text-red-400 mb-2" />
              <h4 className="font-bold text-white">Lost card desk</h4>
              <p className="text-slate-300 mt-1">SMS BLOCK &lt;last 4 digits&gt; to 56161</p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-4">
              <ShieldCheck className="w-5 h-5 text-red-400 mb-2" />
              <h4 className="font-bold text-white">Cyber fraud desk</h4>
              <p className="text-slate-300 mt-1">Report phishing within 24 hours for chargeback review</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
