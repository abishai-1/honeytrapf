import MarketingPageShell, { MarketingBlock } from '@/app/components/MarketingPageShell';

const fdRows = [
  ['7 – 45 days', '5.75%', '6.25%'],
  ['46 – 179 days', '6.50%', '7.00%'],
  ['180 – 364 days', '7.10%', '7.60%'],
  ['1 year – 2 years', '7.40%', '7.90%'],
  ['555 days (special)', '8.25%', '8.75%'],
  ['3 years – 5 years', '7.55%', '8.05%'],
  ['Tax Shield FD (5 years, 80C)', '7.75%', '8.25%'],
  ['5 years – 10 years', '7.25%', '7.75%'],
];

export default function SchemesPage() {
  return (
    <MarketingPageShell
      eyebrow="FD & Schemes"
      title="Fixed deposits and government-backed savings schemes"
      lede="Book retail and tax-saving FDs, open PPF and Sukanya Samriddhi accounts, contribute to NPS, and subscribe to Sovereign Gold Bonds — all from VaultBank NetBanking or any branch. Interest rates below are indicative for resident individuals as of September 2026."
      primaryHref="/#hero"
      primaryLabel="Book an FD in NetBanking"
    >
      <MarketingBlock title="Domestic term deposit interest rates">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[#003366]">
                <th className="text-left p-3 border border-slate-200">Tenure</th>
                <th className="text-left p-3 border border-slate-200">General public</th>
                <th className="text-left p-3 border border-slate-200">Senior citizen</th>
              </tr>
            </thead>
            <tbody>
              {fdRows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell} className="p-3 border border-slate-200">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Minimum booking amount is ₹10,000 (₹100 multiples thereafter). Interest is compounded quarterly on cumulative FDs and paid monthly / quarterly on non-cumulative FDs. Premature closure after 7 days attracts a 1% penalty on the contracted rate. Tax Shield FDs cannot be closed before 5 years.</p>
      </MarketingBlock>

      <MarketingBlock title="How to book, renew and auto-sweep">
        <p>Log in to NetBanking, choose Accounts → Open Deposit, pick tenure and payout frequency, and authenticate with OTP. A receipt with deposit number, maturity date and maturity value is emailed instantly and also appears under Statements.</p>
        <p>Auto-renewal can be set to principal only or principal plus interest. Vault Sweep moves surplus above a threshold in your savings account into a linked FD every Monday, earning term-deposit rates while remaining liquid with T+1 break.</p>
        <p>Nomination is mandatory for new deposits. You may add up to two nominees with percentage shares. Form 15G / 15H can be submitted digitally before 30 April to avoid TDS when estimated interest is below the taxable threshold.</p>
      </MarketingBlock>

      <MarketingBlock title="Public Provident Fund (PPF)">
        <p>PPF is a 15-year sovereign scheme administered by VaultBank on behalf of the Government of India. Current administered rate is 7.10% p.a., compounded annually. Deposits from ₹500 to ₹1.50 lakh per financial year qualify. Interest and maturity are exempt from tax (EEE status) under present law.</p>
        <p>Partial withdrawal is allowed from the 7th financial year. Loans against PPF are available from the 3rd to 6th year. Accounts can be extended in 5-year blocks after maturity. One account per individual; a guardian may open an account for a minor.</p>
        <p>Standing instructions from your Vault savings account can be set for monthly contribution. Passbook printing is free at any branch. PPF cannot be pledged except as permitted under the PPF Scheme rules.</p>
      </MarketingBlock>

      <MarketingBlock title="Sukanya Samriddhi Yojana (SSY)">
        <p>SSY is for a girl child who has not turned 10. The present rate is 8.20% p.a. Maximum two accounts per family (exceptions apply for twins). Annual deposit ceiling is ₹1.50 lakh. The account matures 21 years from opening or on marriage after 18, whichever is earlier as per scheme rules.</p>
        <p>Premature closure is allowed in defined cases such as the account holder’s death or documented medical hardship. Interest is tax-exempt. VaultBank requires the child’s birth certificate, guardian KYC, and a recent photograph.</p>
      </MarketingBlock>

      <MarketingBlock title="National Pension System (NPS)">
        <p>Open a Tier-I NPS account with PRAN generation in-branch or online through our PoP-SP licence. Equity allocation follows your chosen life-cycle or active choice (E / C / G / A). Additional deduction under Section 80CCD(1B) of ₹50,000 is available over and above 80C, subject to Income-tax Act.</p>
        <p>Tier-II is optional and more liquid. Annuity purchase at exit follows PFRDA rules. VaultBank does not guarantee NPS market returns; fund NAVs move daily.</p>
      </MarketingBlock>

      <MarketingBlock title="Sovereign Gold Bonds (SGB)">
        <p>When RBI opens an SGB tranche, you can apply through NetBanking using your PAN and a Vault savings account. Bonds are issued in grams of gold with a fixed coupon (historically 2.50% p.a. on the initial issue price) paid semi-annually. Tenure is 8 years with an exit window from year 5 on interest dates.</p>
        <p>Capital gains on redemption with the Government are exempt for individuals. SGB units are credited to your demat or held in RBI’s ledger with VaultBank as receiving office. Physical gold is not delivered.</p>
      </MarketingBlock>

      <MarketingBlock title="Risk, TDS and DICGC">
        <p>Bank FDs are deposits of VaultBank Limited and are insured by DICGC up to ₹5 lakh per depositor per bank, covering both principal and interest. PPF, SSY and SGB are sovereign products; NPS is a market-linked pension product regulated by PFRDA.</p>
        <p>TDS at the applicable rate is deducted on FD interest if your annual interest at VaultBank exceeds the threshold, unless a valid 15G / 15H is on file. Form 16A is available under Reports every quarter.</p>
      </MarketingBlock>
    </MarketingPageShell>
  );
}
