import { Cta, FeatureGrid, PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "About ALVITEQ", description: "Meet ALVITEQ, an independent technology company building thoughtful products for everyday life.", path: "/about" });

export default function AboutPage() {
  return <><PageHero eyebrow="About ALVITEQ" title="Powerful technology without unnecessary complexity." intro="ALVITEQ is an independent technology company building software products for everyday life." />
    <section className="section container"><div className="split"><div><p className="eyebrow">Why ALVITEQ exists</p><h2>Make capable technology genuinely useful.</h2><p className="lead">Technology can solve meaningful problems, but capability is valuable only when people can understand and depend on it. We create products that turn strong engineering into focused, accessible experiences.</p><p>ALVITEQ is at the beginning of its journey. We are building deliberately: one real problem, one thoughtful product, and one verified improvement at a time.</p></div><div className="quote-panel">“Technology should become more capable without becoming more complicated.”</div></div></section>
    <section className="section tint"><div className="container"><div className="section-head"><p className="eyebrow">How we build</p><h2>A continuous product discipline.</h2><p className="lead">Problem → research → design → engineering → test → improve.</p></div><div className="journey">{["Understand the problem","Research the context","Design the experience","Engineer responsibly","Test the reality","Improve continuously"].map((item,index)=><div key={item}><strong>{String(index+1).padStart(2,"0")}</strong><span>{item}</span></div>)}</div></div></section>
    <section className="section container"><div className="section-head"><p className="eyebrow">Our principles</p><h2>The standard behind every product.</h2></div><FeatureGrid items={[
      ["01","Useful","Solve a clear problem and create practical value."],
      ["02","Simple","Make sophisticated capability understandable."],
      ["03","Secure","Build privacy and protection into the foundation."],
      ["04","Responsible","Communicate limits honestly and use intelligence with purpose."],
      ["05","Long-term","Choose maintainable engineering and lasting usefulness."],
      ["06","Human","Respect the people, decisions, and contexts behind the product."]
    ]} /></section>
    <section className="section container"><Cta title="Interested in what we are building?" body="Talk with us about products, partnerships, feedback, or future opportunities." label="Contact ALVITEQ" /></section>
  </>;
}
