import { Cta, PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Security",
  description: "How ALVITEQ approaches website and product security, privacy-aware engineering, and responsible reporting.",
  path: "/security",
});

export default function SecurityPage() {
  return <>
    <PageHero eyebrow="Trust at ALVITEQ" title="Security is part of the foundation." intro="We take a proportionate, privacy-aware approach to protecting our website, products, and the people who use them." />
    <section className="section container"><div className="split"><div><p className="eyebrow">Our approach</p><h2>Build carefully. Communicate clearly.</h2><p className="lead">ALVITEQ considers data minimization, access boundaries, secure engineering, dependency care, and recoverable failure throughout product development.</p><p>Public security information stays intentionally high level. Product-specific controls, limitations, and user responsibilities are documented with the relevant product.</p></div><div className="stat-panel"><div className="stats"><div className="stat"><strong>Minimize</strong><span>collect only what has a purpose</span></div><div className="stat"><strong>Protect</strong><span>apply proportionate safeguards</span></div><div className="stat"><strong>Review</strong><span>test assumptions and dependencies</span></div><div className="stat"><strong>Respond</strong><span>investigate responsible reports</span></div></div></div></div></section>
    <section className="section tint"><div className="container"><div className="section-head"><p className="eyebrow">Responsible reporting</p><h2>Found a potential security issue?</h2><p className="lead">Send a concise description, affected page or product, reproduction steps, and potential impact to <a className="inline-link" href="mailto:security@alviteq.com">security@alviteq.com</a>. Do not include passwords, recovery passphrases, identity documents, or private records.</p></div></div></section>
    <section className="section container"><Cta title="Security or privacy question?" body="Use the appropriate contact route so your enquiry reaches the right place." /></section>
  </>;
}
