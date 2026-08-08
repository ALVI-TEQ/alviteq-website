import Link from "next/link";
import { PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "OwnKeep Terms & Conditions",
  description: "Read the terms that apply when downloading and using the OwnKeep local encrypted vault.",
  path: "/products/ownkeep/terms",
});

export default function OwnKeepTermsPage() {
  return <>
    <PageHero eyebrow="OwnKeep · Legal" title="Terms & Conditions" intro="These terms apply to downloading and using OwnKeep. Please read them before creating a vault." />
    <article className="legal container">
      <p className="legal-date">Effective 8 August 2026</p>
      <h2>1. Acceptance</h2>
      <p>By downloading, installing, or using OwnKeep, you agree to these terms and the <Link href="/products/ownkeep/privacy">OwnKeep Privacy Policy</Link>. If you do not agree, do not use the app. Google Play&apos;s applicable platform terms also apply to your download.</p>
      <h2>2. Local vault service</h2>
      <p>OwnKeep is a local-first productivity tool for organizing records on your device. The current release does not provide an online account, hosted vault, professional records-management service, or guaranteed cloud recovery.</p>
      <h2>3. Your responsibilities</h2>
      <p>You are responsible for your device, PIN, recovery phrase, backups, exported files, and the legality and accuracy of information you add. Keep recovery material in a secure location separate from the device. Do not use OwnKeep to store or process information unlawfully or without appropriate authority.</p>
      <h2>4. Backups and data loss</h2>
      <p>You should create and test encrypted backups before relying on OwnKeep for important records. Uninstalling the app, clearing its storage, wiping the vault, losing recovery material, device failure, operating-system changes, or third-party destination failure may make data unavailable. We cannot decrypt or recreate a vault without the correct recovery material.</p>
      <h2>5. Health, legal, financial, and emergency information</h2>
      <p>OwnKeep is an organizational tool, not medical, legal, financial, insurance, emergency-response, or other professional advice. Verify important information against authoritative records and contact qualified professionals or emergency services when appropriate.</p>
      <h2>6. Availability and changes</h2>
      <p>Features can vary by device, operating system, hardware, region, and app version. We may fix, modify, add, remove, or discontinue capabilities. Website concepts and development previews are not promises that a feature is present in the installed release.</p>
      <h2>7. Acceptable use</h2>
      <p>You must not reverse engineer the app except where law permits, bypass security controls, distribute malicious content, infringe another person&apos;s rights, misrepresent affiliation, or use OwnKeep in an unlawful manner.</p>
      <h2>8. Intellectual property</h2>
      <p>OwnKeep, ALVITEQ branding, interface designs, text, illustrations, and original software are protected by applicable intellectual-property laws. These terms grant a personal, limited, non-exclusive, non-transferable, revocable right to use the app, subject to applicable store licensing terms.</p>
      <h2>9. Third-party components and services</h2>
      <p>OwnKeep includes open-source components governed by their licences and may interact with system pickers or destinations selected by you. Third-party services and destinations are governed by their own terms and are outside our control.</p>
      <h2>10. Disclaimers and liability</h2>
      <p>To the extent permitted by applicable law, OwnKeep is provided on an “as available” basis without warranties that it will be uninterrupted, error-free, or suitable as the sole copy of a record. Nothing in these terms excludes rights or liability that cannot legally be excluded. Subject to those rights, we are not responsible for indirect or consequential loss caused by device loss, forgotten credentials, missing backups, user deletion, or third-party destinations.</p>
      <h2>11. Updates to these terms</h2>
      <p>We may update these terms as OwnKeep develops or legal requirements change. The revised version and effective date will be published on this page. Where required, the app will request acceptance of materially revised terms.</p>
      <h2>12. Contact</h2>
      <p>Questions about these terms may be sent to <a href="mailto:legal@alviteq.com">legal@alviteq.com</a>. Do not send recovery phrases, passwords, identity documents, or private vault records.</p>
    </article>
  </>;
}
