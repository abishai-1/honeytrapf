import MarketingPageShell, { MarketingBlock } from '@/app/components/MarketingPageShell';

const network = [
  { city: 'Mumbai', name: 'BKC Corporate Branch & Premier Lounge', address: 'Plot C-14, G-Block, BKC, Bandra East, Mumbai 400051', ifsc: 'VAUL0000409', phone: '022-68940100', hours: 'Mon–Sat 10:00–16:00 (2nd & 4th Sat closed)', services: 'NRI desk, locker, wealth, forex, cash deposit machines' },
  { city: 'New Delhi', name: 'Connaught Place Flagship Branch', address: '44 Janpath, Connaught Place, New Delhi 110001', ifsc: 'VAUL0000101', phone: '011-23348800', hours: 'Mon–Fri 10:00–17:00', services: 'Government business, passport application kiosk, MSME centre' },
  { city: 'Bengaluru', name: 'MG Road Tech & Wealth Hub', address: '12 M.G. Road, Bengaluru, Karnataka 560001', ifsc: 'VAUL0000560', phone: '080-49102000', hours: 'Mon–Sat 10:00–16:00', services: 'Startup current accounts, ESOP loan desk, 24×7 lobby ATM' },
  { city: 'Chennai', name: 'Anna Salai Main Branch', address: '782 Anna Salai, Thousand Lights, Chennai 600002', ifsc: 'VAUL0000600', phone: '044-28509000', hours: 'Mon–Sat 10:00–16:00', services: 'Trade finance, gold loan, vernacular KYC' },
  { city: 'Kolkata', name: 'Dalhousie Square Branch', address: '8 BBD Bagh, Kolkata 700001', ifsc: 'VAUL0000700', phone: '033-22104000', hours: 'Mon–Fri 10:00–16:30', services: 'PF / pension, PPF, SSY, currency chest' },
  { city: 'Hyderabad', name: 'Banjara Hills Premier', address: 'Road No. 12, Banjara Hills, Hyderabad 500034', ifsc: 'VAUL0000500', phone: '040-23300000', hours: 'Mon–Sat 10:00–16:00', services: 'Private wealth, locker, NRI inward remittance' },
  { city: 'Pune', name: 'Kalyani Nagar Branch', address: 'North Avenue, Kalyani Nagar, Pune 411006', ifsc: 'VAUL0000411', phone: '020-26630000', hours: 'Mon–Sat 10:00–16:00', services: 'Home-loan fulfilment, salary desk' },
  { city: 'Ahmedabad', name: 'CG Road Branch', address: 'CG Road, Navrangpura, Ahmedabad 380009', ifsc: 'VAUL0000380', phone: '079-26460000', hours: 'Mon–Sat 10:00–16:00', services: 'MSME, jewel loan, GIFT City liaison' },
];

export default function BranchesPage() {
  return (
    <MarketingPageShell
      eyebrow="Branch & ATM Locator"
      title="4,500 branches and 12,000 ATMs across India"
      lede="Walk in for cash, lockers, KYC updates, PPF, and loan fulfilment, or use lobby ATMs for 24×7 deposits. IFSC codes below are for illustration on this portal. Always confirm the latest address on the notice board at the branch."
      primaryHref="/help"
      primaryLabel="Talk to a banker"
    >
      <MarketingBlock title="Flagship and metro branches">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {network.map((b) => (
            <article key={b.ifsc} className="border border-slate-200 rounded-xl p-4 space-y-1 text-xs">
              <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded">{b.city}</span>
              <h3 className="text-sm font-bold text-[#003366] pt-1">{b.name}</h3>
              <p>{b.address}</p>
              <p className="font-mono text-slate-500">IFSC {b.ifsc} · {b.phone}</p>
              <p>{b.hours}</p>
              <p className="text-slate-500">{b.services}</p>
            </article>
          ))}
        </div>
      </MarketingBlock>

      <MarketingBlock title="ATM, cash recycler and passbook">
        <p>Vault ATMs accept Visa, Mastercard, RuPay and NFS. Daily ATM cash withdrawal limits follow your card variant (typically ₹50,000 on Metal Infinite). Cash recyclers at metro branches accept deposits up to ₹200,000 per day in ₹100/200/500 notes, credited instantly to Vault accounts and on a T+1 basis for some other banks.</p>
        <p>Self-service passbook kiosks update Vault savings passbooks free of charge. Mini-statements at ATMs show the last 5 transactions. If a machine retains a card, call 1800-400-VAULT with the ATM ID printed on the fascia.</p>
        <p>Accessible branches have ramps, tactile paths and lower writing counters. Request a doorstep KYC visit through Help if you cannot travel.</p>
      </MarketingBlock>

      <MarketingBlock title="Services that still need a branch">
        <p>Safe-deposit locker agreements, physical demand drafts above a threshold, attestation of signature change, deceased-claim settlement, and certain MSME document verification still require an in-person visit. Carry original PAN and Aadhaar. Locker waitlists are maintained branch-wise; nomination is mandatory for new lockers.</p>
        <p>Video KYC covers most savings and FD openings. Home-loan property originals are usually verified once at the home-branch or a designated fulfilment hub.</p>
      </MarketingBlock>

      <MarketingBlock title="Timing, holidays and cash logistics">
        <p>Banking hours follow the local circle calendar. Second and fourth Saturdays are typically holidays for clearing, though many lobbies remain open. Cash availability at ATMs is replenished on a risk-based schedule; festival weeks may see queues at currency chests.</p>
        <p>Cheque drop boxes are cleared twice on working days. CTS clearing follows RBI grids. Stop-payment can be placed in NetBanking or at the home branch with a small fee listed in the schedule of charges.</p>
      </MarketingBlock>

      <MarketingBlock title="How to pick a home branch">
        <p>Your home branch is printed on the passbook and statement. You may request a transfer of home branch from NetBanking; locker and some standing instructions may take a fortnight to migrate. Salary accounts are often mapped to a corporate-linked branch even if you live in another city — ATM and UPI are nationwide.</p>
      </MarketingBlock>
    </MarketingPageShell>
  );
}
