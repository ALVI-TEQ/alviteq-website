import { PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Careers", description: "Follow future opportunities to build meaningful technology and useful products at ALVITEQ.", path: "/careers" });

export default function CareersPage() {
  return <><PageHero eyebrow="Careers" title="Build meaningful technology with us." intro="ALVITEQ is at the beginning of its journey. As we grow, we will look for people who care about thoughtful engineering, useful products, and solving real problems." />
    <section className="section container"><div className="split"><div><p className="eyebrow">What we value</p><h2>Thoughtful work over empty motion.</h2><p className="lead">We value curiosity, responsibility, clear communication, careful execution, and the willingness to improve an idea through evidence.</p></div><div className="role-list"><div><strong>Product thinking</strong><span>Understand the problem before choosing the solution.</span></div><div><strong>Engineering quality</strong><span>Build systems people and teams can depend on.</span></div><div><strong>Human perspective</strong><span>Respect the real context in which technology is used.</span></div></div></div></section>
    <section className="section tint"><div className="container"><div className="contact-card"><p className="eyebrow">Current openings</p><h2>No open positions currently.</h2><p className="lead">Future opportunities will be published here. If our direction strongly aligns with your work, you may introduce yourself at careers@alviteq.com.</p><a className="button" href="mailto:careers@alviteq.com?subject=Career%20introduction">careers@alviteq.com</a></div></div></section>
  </>;
}
