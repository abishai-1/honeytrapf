import Link from 'next/link';
import MarketingPageShell, { MarketingBlock } from '@/app/components/MarketingPageShell';

export default function UpiPage() {
  return (
    <MarketingPageShell
      eyebrow="UPI Payments"
      title="BHIM UPI, Scan & Pay, Autopay and UPI Lite"
      lede="VaultBank is a full member of the Unified Payments Interface operated by NPCI. Create a VPA, pay merchants, send money to any bank, and manage mandates from NetBanking or the Vault Mobile App — 24×7 including bank holidays."
      primaryHref="/#hero"
      primaryLabel="Link UPI in NetBanking"
    >
      <MarketingBlock title="What you can do with Vault UPI">
        <p>Send money to a VPA (name@vault), UPI number, account + IFSC, or by scanning BharatQR / UPI QR. Collect requests can be approved or declined from the app. You may map up to three Vault accounts to one device and switch the primary account at any time.</p>
        <p>Credit on UPI is enabled for eligible Vault RuPay credit cards. UPI Lite stores up to ₹2,000 on-device for PIN-less payments under ₹500. International UPI (select corridors) is being rolled out for outbound travel wallets as permitted by NPCI.</p>
        <p>Autopay (e-mandate) supports SIPs, insurance premia, school fees, OTT and utilities up to the NPCI mandate limits. You can pause, modify or revoke a mandate from the UPI centre without calling the biller.</p>
      </MarketingBlock>

      <MarketingBlock title="Limits, timings and charges">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[#003366]">
                <th className="text-left p-3 border border-slate-200">Rail</th>
                <th className="text-left p-3 border border-slate-200">Per transaction</th>
                <th className="text-left p-3 border border-slate-200">Daily cap</th>
                <th className="text-left p-3 border border-slate-200">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-slate-200">UPI P2P / P2M</td>
                <td className="p-3 border border-slate-200">₹1,00,000</td>
                <td className="p-3 border border-slate-200">₹2,00,000</td>
                <td className="p-3 border border-slate-200">Nil for customers</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200">UPI Lite</td>
                <td className="p-3 border border-slate-200">₹500</td>
                <td className="p-3 border border-slate-200">₹2,000 on-device</td>
                <td className="p-3 border border-slate-200">Nil</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200">Credit card on UPI</td>
                <td className="p-3 border border-slate-200">As per card</td>
                <td className="p-3 border border-slate-200">As per card</td>
                <td className="p-3 border border-slate-200">Merchant MDR as applicable</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200">IMPS (for comparison)</td>
                <td className="p-3 border border-slate-200">₹5,00,000</td>
                <td className="p-3 border border-slate-200">As per NetBanking limit</td>
                <td className="p-3 border border-slate-200">As per schedule of charges</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Premier customers may request a higher UPI daily cap from Profile → Transfer Limits after device binding and video KYC. First-time device registrations may have a cooling period as directed by NPCI risk circulars.</p>
      </MarketingBlock>

      <MarketingBlock title="Create a UPI ID and bind a device">
        <p>Download the Vault Mobile App, complete MPIN setup, and choose a handle such as yourname@vault. Alternate handles can be created on the same account. Device binding uses SIM presence on Android and iCloud attestation on iOS. If you change phones, deregister the old device from NetBanking → UPI → My devices.</p>
        <p>Never share MPIN, OTP or QR screenshots. VaultBank will never ask for MPIN on a phone call. If a collect request arrives from an unknown merchant, decline it and report it from the transaction detail screen.</p>
      </MarketingBlock>

      <MarketingBlock title="Failed payments, disputes and chargebacks">
        <p>If money is debited but the beneficiary is not credited, NPCI’s complaint management system usually auto-reverses within TAT (often T+1, sometimes up to T+5 for certain reason codes). You can also raise a ticket under Help with UTR, amount and timestamp.</p>
        <p>Unauthorised UPI debits should be reported immediately via the app freeze option and the national cybercrime portal. VaultBank follows RBI limited-liability guidelines for unauthorised electronic transactions when you notify us within the prescribed window.</p>
        <p>For merchant disputes (goods not received), first raise the issue with the merchant, then open a UPI complaint selecting the correct reason code so NPCI can flag the acquiring bank.</p>
      </MarketingBlock>

      <MarketingBlock title="Autopay mandates in detail">
        <p>Mandates can be created as one-time or recurring. Amounts may be fixed or variable up to a cap you approve. Authentication uses UPI PIN. A pre-debit notification is sent at least 24 hours before a pull above the small-value threshold.</p>
        <p>Revocation is instant on our side; the biller may take one cycle to stop presenting. Keep a small buffer in the mapped account. Failed Autopay does not by itself levy a VaultBank penalty, though the biller might.</p>
      </MarketingBlock>

      <MarketingBlock title="Related rails">
        <p>For amounts above UPI caps, use IMPS (24×7), NEFT (24×7 in half-hourly batches) or RTGS (real-time above ₹2 lakh during RTGS hours) from <Link href="/#hero" className="text-red-600 font-bold">NetBanking</Link>. Branch cash and cheque remain available at <Link href="/branches" className="text-red-600 font-bold">locator branches</Link>.</p>
      </MarketingBlock>
    </MarketingPageShell>
  );
}
