'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import MarketingPageShell, { MarketingBlock } from '@/app/components/MarketingPageShell';

const groups = [
  {
    title: 'NetBanking & login',
    items: [
      { q: 'I forgot my Customer ID. What now?', a: 'Use Forgot Password on the home page and authenticate with registered mobile + debit card PIN. The Customer ID is also printed on your welcome kit and account statement header.' },
      { q: 'Why was my session logged out?', a: 'Idle timeout is 5 minutes for retail NetBanking as a security control. Re-login; unfinished transfers are not processed without a final OTP.' },
      { q: 'Can I use NetBanking from abroad?', a: 'Yes, after enabling international access under Profile → Security. Some high-risk countries remain blocked. Use the official vaultbank domain only.' },
      { q: 'How do I register a new device?', a: 'The first login from a new browser sends an OTP. Tick Remember device only on computers you control. Public kiosks should never be remembered.' },
    ],
  },
  {
    title: 'Accounts, FD & schemes',
    items: [
      { q: 'When is savings interest credited?', a: 'Interest is calculated on the daily closing balance and credited at quarter-end (April, July, October, January). Super Savings rates are published on the schemes page.' },
      { q: 'Can I break an FD online?', a: 'Regular FDs after 7 days can be closed in NetBanking with a 1% rate penalty. Tax Shield 5-year FDs cannot be closed early.' },
      { q: 'Is my money insured?', a: 'DICGC insures up to ₹5,00,000 per depositor at VaultBank, covering savings, current and FD balances combined.' },
      { q: 'How do I open PPF?', a: 'Visit a branch with PAN, Aadhaar and a photograph, or start digitally and complete signature verification within 7 days.' },
    ],
  },
  {
    title: 'UPI, cards & transfers',
    items: [
      { q: 'UPI PIN vs MPIN vs ATM PIN?', a: 'ATM PIN is for debit cards at ATMs and POS. UPI PIN authorises UPI. App MPIN unlocks the Vault Mobile App. They are independent and should not be the same number.' },
      { q: 'How do I raise the UPI daily limit?', a: 'Profile → Security → Transfer Limits. Video KYC may be required. Cooling periods can apply on a new device.' },
      { q: 'Card is lost. What is the fastest block?', a: 'Cards tab → Lock, or SMS BLOCK <last 4> to 56161, or call 1800-400-VAULT. A replacement can be couriered in 4–6 working days.' },
      { q: 'NEFT vs IMPS vs RTGS?', a: 'IMPS is 24×7 instant up to ₹5 lakh. NEFT is 24×7 in batches with no minimum. RTGS is real-time for ₹2 lakh and above during RTGS hours.' },
    ],
  },
  {
    title: 'Loans & EMI',
    items: [
      { q: 'Are the website rates guaranteed?', a: 'Website rates are indicative. Your sanction letter rate depends on bureau score, FOIR, product and any running offers on the disbursement date.' },
      { q: 'Can I prepay a home loan?', a: 'Floating-rate home loans to individuals have no foreclosure fee. Part-prepayment is allowed via NetBanking after the cooling period stated in your agreement.' },
      { q: 'Why did my EMI change?', a: 'If you chose a floating rate, EMI or tenure may be recast when VEBLR resets each quarter. We notify you by SMS and email.' },
    ],
  },
  {
    title: 'Safety & grievance',
    items: [
      { q: 'Someone asked for OTP on the phone.', a: 'It is a fraud. Hang up. VaultBank never asks for OTP, MPIN or CVV. Report to the cyber desk and consider blocking UPI from the app.' },
      { q: 'How do I escalate a complaint?', a: 'Use Help & Support to open a ticket. If unresolved in 30 days, write to the Principal Nodal Officer, then the RBI Ombudsman on the CMS portal.' },
      { q: 'Where is the privacy policy?', a: 'A summary sits on this FAQ and the footer. Full policy PDFs are available from Help → Regulatory documents.' },
    ],
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(groups[0].items[0].q);

  return (
    <MarketingPageShell
      eyebrow="FAQ"
      title="Answers to common VaultBank questions"
      lede="Browse by topic: login, deposits, UPI, loans and complaints. If you still need a banker, open Help & Support and raise an encrypted ticket. Nothing on this page is a substitute for the product terms in your account opening form."
      primaryHref="/help"
      primaryLabel="Still need help?"
    >
      {groups.map((group) => (
        <MarketingBlock key={group.title} title={group.title}>
          <div className="space-y-2">
            {group.items.map((item) => {
              const isOpen = open === item.q;
              return (
                <div key={item.q} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : item.q)}
                    className="w-full text-left p-3 font-bold text-[#003366] flex justify-between gap-3"
                  >
                    {item.q}
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="px-3 pb-3 text-slate-600 border-t border-slate-100 pt-2">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </MarketingBlock>
      ))}

      <MarketingBlock title="Disclaimer">
        <p>Interest rates, insurance covers, UPI limits and tax treatments change when RBI, NPCI, CBDT or VaultBank revises circulars. Always read the latest schedule of charges and the specific product MITC before you apply. VaultBank Limited, CIN L65190MH2021PLC90142, Bandra Kurla Complex, Mumbai 400051.</p>
      </MarketingBlock>
    </MarketingPageShell>
  );
}
