import Link from 'next/link';
import MarketingPageShell, { MarketingBlock } from '@/app/components/MarketingPageShell';

export default function HelpPage() {
  return (
    <MarketingPageShell
      eyebrow="Help & Support"
      title="24×7 care, tickets, nodal officers and Ombudsman"
      lede="Use this desk for card blocks, UPI disputes, deceased claims guidance, and service complaints. Keep your Customer ID handy. VaultBank will never ask for MPIN, OTP or CVV on a phone call."
      primaryHref="/#hero"
      primaryLabel="Login to raise a ticket"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 text-sm">
          <p className="text-[10px] font-bold uppercase text-red-600">Phone</p>
          <p className="font-black text-[#003366] mt-1">1800-400-VAULT (82858)</p>
          <p className="text-xs text-slate-600 mt-2">Toll-free in India, 24×7. Choose 1 for cards, 2 for UPI, 3 for loans, 9 for other.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 text-sm">
          <p className="text-[10px] font-bold uppercase text-red-600">WhatsApp</p>
          <p className="font-black text-[#003366] mt-1">+91 22 8940 1000</p>
          <p className="text-xs text-slate-600 mt-2">Send HI for balance, MINI for last five transactions, BLOCK to start a card freeze.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 text-sm">
          <p className="text-[10px] font-bold uppercase text-red-600">Email</p>
          <p className="font-black text-[#003366] mt-1">priority@vaultbank-client.in</p>
          <p className="text-xs text-slate-600 mt-2">Use from your registered email. Do not attach photos of OTPs or complete card numbers.</p>
        </div>
      </div>

      <MarketingBlock title="Raise and track a complaint">
        <p>Logged-in customers can open an encrypted ticket under NetBanking → Help. You will receive a TICK-ID. First response SLA is 2 working hours for priority accounts and 8 working hours for others. Resolution SLA depends on the category (UPI chargebacks follow NPCI TAT; deceased claims take longer because of documents).</p>
        <p>Include UTR / RRN, date-time (IST), amount, last 4 digits of the account, and a short description. Screenshots help; never send a video of you entering MPIN.</p>
        <p>If you are not logged in, call the helpline to place a service request. Identity will be validated with registered mobile and profile questions — not with OTP read-back of a transaction password.</p>
      </MarketingBlock>

      <MarketingBlock title="Emergency: fraud, lost card, compromised UPI">
        <p>1) Freeze cards in the app or SMS BLOCK &lt;last 4&gt; to 56161. 2) Disable UPI from My devices. 3) Change NetBanking password from a trusted browser. 4) File a report on the national cybercrime portal and note the acknowledgement number. 5) Call us with that number so we can mark the account for enhanced monitoring.</p>
        <p>Unauthorised electronic transactions are assessed under RBI limited-liability rules. Notify us as soon as possible; delay can affect liability. We may ask for a police complaint for large values.</p>
      </MarketingBlock>

      <MarketingBlock title="Principal Nodal Officer">
        <p>If a ticket remains unresolved or the reply is unsatisfactory, write to the Principal Nodal Officer, Customer Rights Department, Vault Bank Tower, Plot C-14, G-Block, BKC, Mumbai 400051, or email pno@vaultbank-client.in with your TICK-ID in the subject line.</p>
        <p>Allow 30 days from the original complaint date (or as specified in the Banking Ombudsman scheme) before escalating outside the bank, unless the matter is a continuing fraud that needs immediate RBI / police attention.</p>
      </MarketingBlock>

      <MarketingBlock title="RBI Banking Ombudsman">
        <p>You may file on the Reserve Bank – CMS portal after the bank’s timeline lapses or if you are unhappy with the final reply. Keep copies of emails, ticket IDs and account statements. The Ombudsman scheme does not usually cover commercial decisions such as a declined loan if process was followed.</p>
        <p>This portal is a digital banking demonstration of VaultBank processes; for a live regulated complaint you would use the real bank with which you hold an account.</p>
      </MarketingBlock>

      <MarketingBlock title="Accessibility, senior citizens and doorstep">
        <p>Senior citizens (70+) and differently-abled customers can request doorstep cash delivery and KYC in eligible pincodes. Call the helpline and choose the senior desk. Branches listed in the <Link href="/branches" className="text-red-600 font-bold">locator</Link> publish wheelchair access on the branch board.</p>
        <p>FAQs covering login, FD and UPI sit on the <Link href="/faq" className="text-red-600 font-bold">FAQ page</Link>. Product MITCs are summarised on Loans, Schemes and UPI pages.</p>
      </MarketingBlock>

      <MarketingBlock title="Service hours at a glance">
        <p>Voice helpline: 24×7. WhatsApp balance: 24×7. Credit desk: 9:30–18:00 IST on working days. Locker: branch hours only. RTGS high-value operations follow RBI windows even though UPI and IMPS stay open.</p>
      </MarketingBlock>
    </MarketingPageShell>
  );
}
