'use client';

import { useState } from 'react';
import MarketingPageShell, { MarketingBlock } from '@/app/components/MarketingPageShell';
import { formatINR } from '@/lib/mockData';

export default function EmiCalculatorPage() {
  const [loanType, setLoanType] = useState<'home' | 'car' | 'personal'>('home');
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenureYears, setTenureYears] = useState(20);
  const rates = { home: 8.40, car: 8.75, personal: 10.25 };
  const currentRate = rates[loanType];
  const monthlyRate = currentRate / (12 * 100);
  const months = tenureYears * 12;
  const monthlyEMI = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
  );
  const totalPayment = monthlyEMI * months;
  const totalInterest = totalPayment - loanAmount;

  return (
    <MarketingPageShell
      eyebrow="EMI Calculator"
      title="Plan home, car and personal loan EMIs before you apply"
      lede="This calculator uses reducing-balance compounding: EMI = [P × R × (1+R)^N] / [(1+R)^N − 1], where R is the monthly rate and N is the number of months. Figures are illustrative and exclude processing fee, insurance and stamp duty."
      primaryHref="/loans"
      primaryLabel="See loan products"
    >
      <MarketingBlock title="Interactive calculator">
        <div className="flex flex-wrap gap-2 mb-6">
          {(['home', 'car', 'personal'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setLoanType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${loanType === t ? 'bg-[#003366] text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              {t === 'home' ? 'Home 8.40%' : t === 'car' ? 'Car 8.75%' : 'Personal 10.25%'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Loan amount</span>
                <span className="font-mono text-[#003366]">{formatINR(loanAmount)}</span>
              </div>
              <input type="range" min={100000} max={20000000} step={50000} value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full accent-red-600" />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Tenure</span>
                <span className="font-mono text-[#003366]">{tenureYears} years</span>
              </div>
              <input type="range" min={1} max={30} step={1} value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} className="w-full accent-red-600" />
            </div>
          </div>
          <div className="bg-[#003366] text-white rounded-2xl p-6 space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-300">Monthly EMI</p>
            <p className="text-3xl font-black font-mono">{formatINR(monthlyEMI)}</p>
            <p className="text-xs">Interest {formatINR(totalInterest)} · Total payable {formatINR(totalPayment)}</p>
            <p className="text-[11px] text-slate-300">Rate used: {currentRate}% p.a. reducing.</p>
          </div>
        </div>
      </MarketingBlock>

      <MarketingBlock title="How banks compute reducing-balance interest">
        <p>Each EMI first pays the interest accrued that month on the outstanding principal; the remainder reduces principal. Early EMIs are interest-heavy; later EMIs repay more principal. This is why a 20-year home loan costs more total interest than a 15-year loan even at the same rate.</p>
        <p>Floating-rate loans recast when the Vault External Benchmark Lending Rate moves. VaultBank may change EMI, tenure, or both, as stated in your agreement. Always keep an EMI auto-debit mandate with a buffer of two days before the due date.</p>
        <p>The calculator ignores moratoriums, EMI holidays, insurance premia, CERSAI charges and GST on fees. For under-construction properties, you may pay simple interest (PEMI) on amounts disbursed until the full loan is drawn.</p>
      </MarketingBlock>

      <MarketingBlock title="Worked examples">
        <p>Example A — Home: ₹80 lakh at 8.40% for 25 years. Monthly EMI is in the mid-₹60,000s. Lifetime interest can exceed the principal; a 5-year shorter tenure cuts a large share of interest.</p>
        <p>Example B — Car: ₹12 lakh at 8.75% for 5 years. EMI is typically in the ₹24,000 region. A 10% down payment reduces both EMI and hypothecation risk.</p>
        <p>Example C — Personal: ₹5 lakh at 10.25% for 4 years. Because there is no collateral, the rate is higher and foreclosure in year one may attract a fee. Compare this against drawing on a liquid FD.</p>
      </MarketingBlock>

      <MarketingBlock title="Affordability rules of thumb">
        <p>Keep total EMIs (all lenders) under 40–50% of take-home pay. Maintain a 6-month emergency fund after the EMI starts. Prefer a floating home loan if you expect policy rates to ease; a personal loan is usually fixed for the tenure.</p>
        <p>Prepaying even one extra EMI per year on a long home loan can shorten tenure by more than a year. Direct prepayments to principal via NetBanking and ask for a revised repayment schedule.</p>
        <p>Tax note: home-loan interest may be deductible under Section 24(b) subject to caps; personal-loan interest is generally not deductible unless used for a specified taxable purpose. This is not tax advice.</p>
      </MarketingBlock>

      <MarketingBlock title="Next steps">
        <p>Once you have a working EMI, check eligibility and documents on the loans page, then apply from NetBanking. Relationship managers at flagship branches can structure a balance-transfer plus top-up if you already have a loan from another bank.</p>
      </MarketingBlock>
    </MarketingPageShell>
  );
}
