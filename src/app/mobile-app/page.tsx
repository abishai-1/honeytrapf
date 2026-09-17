import Link from 'next/link';
import MarketingPageShell, { MarketingBlock } from '@/app/components/MarketingPageShell';

export default function MobileAppPage() {
  return (
    <MarketingPageShell
      eyebrow="Vault Mobile App"
      title="Biometric NetBanking in your pocket"
      lede="The official Vault Mobile App for iOS 15+ and Android 9+ brings UPI, deposits, cards, statements and support tickets together with face or fingerprint unlock. Download only from the Apple App Store or Google Play — never from an APK link in SMS."
      primaryHref="/#hero"
      primaryLabel="Activate after download"
    >
      <MarketingBlock title="Install and first-time activation">
        <p>Search for “VaultBank Official” (publisher: VaultBank Limited). The listing shows a red-navy icon matching this website. After install, enter Customer ID, complete SIM / device binding, set a 6-digit MPIN that is not your ATM PIN, and optionally enable biometrics. A cooling period may apply to high-value UPI on a brand-new device.</p>
        <p>Rooted or jailbroken phones are blocked. Screenshot of MPIN screens is discouraged. If you uninstall, deregister the device from NetBanking so collect requests cannot land on a recycled handset.</p>
        <p>Corporate MDM devices are supported if Google Play / App Store remain reachable. Beta tracks are not offered to the public.</p>
      </MarketingBlock>

      <MarketingBlock title="Feature map">
        <p><strong>Payments:</strong> Scan & Pay, UPI Lite, billpay, fastag recharge, and IMPS. <strong>Deposits:</strong> open FD / RD, view maturity calendar, Form 15G. <strong>Cards:</strong> freeze, set channel controls, view CVV after 2FA, order add-on. <strong>Loans:</strong> track EMI, download interest certificate, raise foreclosure request. <strong>Inbox:</strong> encrypted tickets and RBI-mandated alerts.</p>
        <p>Widgets on iOS and Android show a masked balance after biometric. Watch OS complication shows the last UPI status only — not the balance.</p>
        <p>Accessibility: Dynamic Type, TalkBack / VoiceOver labels, and a high-contrast theme under Settings → Appearance.</p>
      </MarketingBlock>

      <MarketingBlock title="Security architecture (plain language)">
        <p>The app uses certificate pinning to VaultBank endpoints, stores tokens in the OS keystore / keychain, and binds the session to a device attestation signal. Sensitive fields use a custom keypad option. Jailbreak detection can refuse login.</p>
        <p>Push notifications never contain full account numbers or OTPs. OTPs arrive by SMS or on the trusted device prompt. If a notification asks you to “verify KYC on a website”, it is phishing — delete it and visit only this portal or the app.</p>
        <p>Lost phone: call 1800-400-VAULT to suspend the app channel, then lock cards. UPI can be disabled independently of NetBanking.</p>
      </MarketingBlock>

      <MarketingBlock title="Permissions the app may request">
        <p>Camera — QR scan. Location — optional ATM locator. SMS — optional on Android for OTP auto-read during onboarding only. Contacts — optional for UPI “pay a friend”; we do not upload your full address book to Vault servers unless you confirm a payee. Storage — saving statements as PDF.</p>
        <p>You can refuse location and contacts; Scan & Pay and statements still work. Microphone is not required for retail banking.</p>
      </MarketingBlock>

      <MarketingBlock title="Versions, languages and support">
        <p>Supported languages include English, Hindi, Marathi, Tamil, Telugu, Kannada, Bengali and Gujarati. Force-update is used only for critical security patches. If the store listing version is more than two releases ahead of yours, update before raising a ticket.</p>
        <p>In-app chat is available 6:00–24:00 IST. Night hours fall back to the helpline. See <Link href="/help" className="text-red-600 font-bold">Help & Support</Link> for nodal officers and <Link href="/upi" className="text-red-600 font-bold">UPI</Link> for payment rails.</p>
      </MarketingBlock>
    </MarketingPageShell>
  );
}
