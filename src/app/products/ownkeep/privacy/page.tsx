import Link from "next/link";
import { PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "OwnKeep Privacy Policy",
  description: "Learn how the OwnKeep offline encrypted vault handles documents and other information on your device.",
  path: "/products/ownkeep/privacy",
});

export default function OwnKeepPrivacyPage() {
  return <>
    <PageHero eyebrow="OwnKeep · Legal" title="Privacy Policy" intro="OwnKeep is designed as a local-first encrypted vault. This policy explains what the app handles and what stays under your control." />
    <article className="legal container">
      <p className="legal-date">Effective 8 August 2026</p>
      <h2>1. Scope</h2>
      <p>This policy applies to the OwnKeep mobile application published under the ALVITEQ brand. The separate <Link href="/privacy">ALVITEQ website privacy policy</Link> applies when you visit alviteq.com or contact us.</p>
      <h2>2. No OwnKeep account or cloud vault</h2>
      <p>The current release does not create an OwnKeep online account or upload your vault to an OwnKeep server. It does not include advertising, analytics, or crash-reporting SDKs. The production Android app does not request Internet access.</p>
      <h2>3. Information handled on your device</h2>
      <p>OwnKeep can process documents, photos, document metadata, tags, favourites, reminders, locally generated OCR text, emergency information, and security preferences that you choose to add. This information is processed on your device and stored in the app&apos;s encrypted local vault or isolated local storage used by the relevant feature.</p>
      <h2>4. Device capabilities and permissions</h2>
      <p>OwnKeep may use Android&apos;s document or photo picker, supported scanning features, local notifications, and biometric authentication when you choose the corresponding feature. Android manages biometric templates; OwnKeep does not receive or store your fingerprint or facial template.</p>
      <h2>5. User-controlled exports</h2>
      <p>When you explicitly export a document, encrypted backup, or migration archive, OwnKeep hands the output to an Android destination that you select. OwnKeep does not choose or operate that destination. The destination provider&apos;s terms and privacy policy apply after your selection. Never send a recovery phrase or unencrypted sensitive record to support.</p>
      <h2>6. Retention and deletion</h2>
      <p>Vault information remains on your device until you delete individual records, empty deleted items, wipe the vault, clear the app&apos;s storage, or uninstall OwnKeep. Files exported to another destination must be deleted separately from that destination. Because the current release has no OwnKeep online account or server-held vault, there is no remote account data to delete.</p>
      <h2>7. Security and recovery</h2>
      <p>OwnKeep uses local encryption and supports user-controlled backup and recovery. No security system can guarantee absolute protection. You are responsible for protecting your PIN, recovery phrase, device access, and exported backups. We cannot recover a lost recovery credential or decrypt your vault for you.</p>
      <h2>8. Children</h2>
      <p>OwnKeep is a general productivity application and is not directed to children. Do not use the app to process another person&apos;s information without an appropriate legal basis or permission.</p>
      <h2>9. Changes</h2>
      <p>We will update this policy before adding an account system, cloud synchronization, remote family sharing, advertising, analytics, subscription verification service, or other off-device processing. Material changes will be published here with a revised effective date.</p>
      <h2>10. Contact</h2>
      <p>Privacy questions may be sent to <a href="mailto:privacy@alviteq.com">privacy@alviteq.com</a>. Do not include vault contents, passwords, PINs, recovery phrases, identity documents, or other sensitive records.</p>
    </article>
  </>;
}
