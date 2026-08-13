import { PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Contact ALVITEQ", description: "Contact ALVITEQ about the company, products, support, privacy, security, partnerships, or careers.", path: "/contact" });

const contacts = [
  ["General","Company, product, partnership, and media enquiries.","hello@alviteq.com"],
  ["OwnKeep","Access, support, testing, and product feedback.","support@alviteq.com"],
  ["ALVITEQ HMS","Product briefings and design-partner discussions.","hello@alviteq.com"],
  ["Privacy","Questions about privacy and personal information.","privacy@alviteq.com"],
  ["Security","Responsible reports about product or website security.","security@alviteq.com"],
];

export default function ContactPage() {
  return <><PageHero eyebrow="Contact" title="Start a useful conversation." intro="Choose the closest topic and include enough context for the right response." />
    <section className="section container"><div className="contact-grid">{contacts.map(([title,body,email], index)=><article className="contact-card" key={`${title}-${index}`}><h2>{title}</h2><p>{body}</p><a href={`mailto:${email}?subject=${encodeURIComponent(title + " enquiry")}`}>{email} →</a></article>)}</div><div className="response-note"><strong>Protect sensitive information</strong><p>Do not send passwords, recovery passphrases, identity documents, patient information, clinical records, or other sensitive product data. ALVITEQ will never ask for an OwnKeep recovery passphrase.</p></div><div className="form-roadmap"><p className="eyebrow">Secure contact form</p><h2>Form-based enquiries are planned.</h2><p>A protected form with abuse prevention and confirmation references will be introduced when its server-side handling and retention controls are ready. Email remains the current verified contact route.</p></div></section>
  </>;
}
