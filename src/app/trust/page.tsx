import Link from "next/link";
import { PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Trust Centre", description: "ALVITEQ's central directory for security, privacy, responsible disclosure, accessibility, and product legal information.", path: "/trust" });

const areas = [
  ["Security", "Our high-level approach to secure engineering and responsible reporting.", "/security"],
  ["Privacy", "How the ALVITEQ website handles information and correspondence.", "/privacy"],
  ["Responsible disclosure", "How to report a potential product or website security issue safely.", "/security#responsible-disclosure"],
  ["Accessibility", "Our commitment to inclusive, keyboard-accessible, understandable experiences.", "/accessibility"],
  ["OwnKeep privacy", "How OwnKeep handles information in its local encrypted vault.", "/products/ownkeep/privacy"],
  ["Product legal documents", "Website and product terms, responsibilities, and limitations.", "/terms"],
];

export default function TrustPage() {
  return <><PageHero eyebrow="ALVITEQ Trust Centre" title="Trust needs clear, verifiable information." intro="Find ALVITEQ security, privacy, accessibility, responsible disclosure, and product legal information in one place." />
    <section className="section container"><div className="trust-directory">{areas.map(([title, body, href]) => <Link href={href} key={title}><span>Explore</span><h2>{title}</h2><p>{body}</p><strong aria-hidden="true">↗</strong></Link>)}</div></section>
    <section className="section tint"><div className="container section-head"><p className="eyebrow">Honest by default</p><h2>Claims should match evidence.</h2><p className="lead">ALVITEQ does not present certifications, compliance claims, customer relationships, or performance statistics unless they are current and verifiable.</p></div></section>
  </>;
}
