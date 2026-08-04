import { Cta, FeatureGrid, PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Technology", description: "Explore ALVITEQ's engineering philosophy across platforms, intelligence, cloud, security, and reliability.", path: "/technology" });

export default function TechnologyPage() {
  return <><PageHero eyebrow="Technology" title="Technology chosen for the problem." intro="ALVITEQ combines engineering approaches according to what each product genuinely needs—not according to a fixed stack or passing trend." />
    <section className="section container"><FeatureGrid items={[
      ["M","Cross-platform engineering","Create coherent mobile, desktop, and web experiences while respecting each platform’s strengths."],
      ["L","Local-first systems","Keep essential workflows useful during limited connectivity and place capability close to the user."],
      ["AI","Intelligent experiences","Apply AI and on-device intelligence where they improve understanding, automation, or decisions."],
      ["S","Security & privacy","Build proportionate protection, responsible data handling, and clear user control into product architecture."],
      ["C","Cloud infrastructure","Use connected services where coordination, availability, or scale creates meaningful product value."],
      ["R","Performance & reliability","Design maintainable systems, observable behavior, graceful failure, and dependable long-term operation."]
    ]} /></section>
    <section className="section tint"><div className="split container"><div><p className="eyebrow">Engineering philosophy</p><h2>Strong foundations. Flexible execution.</h2><p className="lead">A good technical decision accounts for the user, the problem, the operating environment, security, cost, maintenance, and how the product may evolve.</p></div><div className="stat-panel"><div className="stats"><div className="stat"><strong>Purpose</strong><span>before novelty</span></div><div className="stat"><strong>Clarity</strong><span>before complexity</span></div><div className="stat"><strong>Evidence</strong><span>before assumptions</span></div><div className="stat"><strong>Durability</strong><span>before trends</span></div></div></div></div></section>
    <section className="section container"><Cta title="Discuss technology with ALVITEQ" body="For engineering, integration, security, or product questions, contact our team." /></section>
  </>;
}
