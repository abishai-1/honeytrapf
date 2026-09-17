import Link from 'next/link';
import MarketingPageShell, { MarketingBlock } from '@/app/components/MarketingPageShell';

const products = [
  { name: 'Vault Home Loan', rate: '8.40% p.a.', tenure: 'Up to 30 years', amount: 'Up to ₹10 Crore', points: ['Zero processing fee on salary accounts', 'Balance transfer with top-up', 'Pre-approved offers in 60 seconds'] },
  { name: 'EV & Car Loan', rate: '8.75% p.a.', tenure: 'Up to 7 years', amount: '100% on-road', points: ['Electric vehicles get 25 bps concession', 'Insurance bundled at dealer invoice', 'Doorstep hypothecation support'] },
  { name: 'Personal Loan', rate: '10.25% p.a.', tenure: '12–60 months', amount: 'Up to ₹25 Lakh', points: ['No collateral', 'Disbursal into Vault checking', 'Part-prepayment after 6 EMIs'] },
  { name: 'MSME Credit', rate: 'From 9.15% p.a.', tenure: 'Working capital / term', amount: 'Up to ₹5 Crore', points: ['CGTMSE cover for eligible units', 'Overdraft against current account', 'GST-linked cash-flow underwriting'] },
];

export default function LoansPage() {
  return (
    <MarketingPageShell
      eyebrow="Loans & Mortgages"
      title="Retail, vehicle, personal and MSME credit under one roof"
      lede="VaultBank underwrites home, car, personal and business loans with published floating rates, digital KYC, and same-day sanction for pre-approved customers. This page covers eligibility, documents, charges, and how EMIs are constructed."
      primaryHref="/#hero"
      primaryLabel="Apply via NetBanking"
    >
      <MarketingBlock title="Product catalogue (indicative, FY 2026–27)">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[#003366]">
                <th className="text-left p-3 border border-slate-200">Product</th>
                <th className="text-left p-3 border border-slate-200">Headline rate</th>
                <th className="text-left p-3 border border-slate-200">Tenure</th>
                <th className="text-left p-3 border border-slate-200">Max amount</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.name}>
                  <td className="p-3 border border-slate-200 font-bold text-slate-800">{p.name}</td>
                  <td className="p-3 border border-slate-200">{p.rate}</td>
                  <td className="p-3 border border-slate-200">{p.tenure}</td>
                  <td className="p-3 border border-slate-200">{p.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Rates are linked to the Vault External Benchmark Lending Rate (VEBLR) and are reset on the first day of each calendar quarter. A 0.10% concession applies to women co-borrowers on home loans and a 0.25% concession to Battery Electric Vehicles.</p>
      </MarketingBlock>

      {products.map((p) => (
        <MarketingBlock key={p.name} title={p.name}>
          <p>
            {p.name} is originated through NetBanking, the Vault Mobile App, or any of 4,500 branches. Sanction letters remain valid for 90 days. Property / vehicle hypothecation is completed electronically with CERSAI or VAHAN where applicable.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <p>
            Illustrative EMI: a ₹50 lakh home loan at 8.40% for 20 years works to about ₹43,000 per month. Use the{' '}
            <Link href="/emi-calculator" className="text-red-600 font-bold">EMI calculator</Link> for exact figures including insurance add-on.
          </p>
        </MarketingBlock>
      ))}

      <MarketingBlock title="Eligibility snapshot">
        <p>Resident Indian citizens and resident HNIs aged 21–65 (salaried) or 21–70 (self-employed) with a minimum vintage of 2 years in the current occupation. CIBIL / CRIF score of 720+ is preferred; thin-file customers are assessed on banking surplus of the last 12 months.</p>
        <p>Non-resident Indians may apply through the NRI desk with Indian property as security. Co-applicants must be immediate family. Loan-to-value is capped at 80% for homes below ₹30 lakh and 75% thereafter, as per RBI housing finance directions.</p>
        <p>Debt-to-income after the proposed EMI should remain under 50% of net monthly income. VaultBank may call for additional collateral such as a liquid FD if the property is under construction.</p>
      </MarketingBlock>

      <MarketingBlock title="Documents we typically collect">
        <p>Identity and address: PAN, Aadhaar, passport or voter ID. Income: last 3 months salary slips, Form 16, and 6-month bank statement for salaried borrowers; ITR of 2 years, GST returns and CA computation for self-employed.</p>
        <p>Property: sale deed / allotment letter, approved plan, chain of title, and encumbrance certificate for 13 years. Vehicle: proforma invoice, insurance quote, and driving licence of the primary applicant.</p>
        <p>All papers can be uploaded as PDF or JPEG under 5 MB per file. Originals are verified once at the nearest VaultBank branch before disbursement.</p>
      </MarketingBlock>

      <MarketingBlock title="Fees, foreclosure and tax">
        <p>Processing fee is 0.35% of sanctioned amount (capped at ₹12,500) and is waived for Vault Salary account holders. Legal and technical valuation are charged at actuals. There is no foreclosure fee on floating-rate home loans to individuals, in line with RBI circulars.</p>
        <p>Personal loans carry a 3% foreclosure charge in the first 12 months. Interest on home loans is eligible for deduction under Sections 24(b) and 80EEA subject to prevailing Income-tax Act limits. VaultBank issues annual interest certificates every April.</p>
        <p>Penal charges on overdue EMIs are published in the schedule of charges and are levied as a rupee amount, not as a percentage of principal, as required by the RBI Fair Lending Practice Code.</p>
      </MarketingBlock>

      <MarketingBlock title="How sanction and disbursement work">
        <p>Step 1 — Apply online and complete video KYC. Step 2 — Bureau pull and FOIR check (usually under 15 minutes for pre-approved offers). Step 3 — Property / vehicle valuation. Step 4 — Digital agreement and ECS / NACH mandate. Step 5 — Disbursement to the builder, dealer, or your Vault checking account.</p>
        <p>Construction-linked home loans are released in stages against architect certificates. You pay interest only on the amount disbursed until full drawdown, after which EMIs commence.</p>
        <p>Need a walkthrough? Visit <Link href="/help" className="text-red-600 font-bold">Help & Support</Link> or a <Link href="/branches" className="text-red-600 font-bold">branch</Link>.</p>
      </MarketingBlock>
    </MarketingPageShell>
  );
}
