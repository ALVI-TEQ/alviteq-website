import Image from "next/image";
import Link from "next/link";
import OwnKeepScreens from "@/components/OwnKeepScreens";
const pillars = [
  ["01", "Technology", "Capable engineering shaped around real human and business needs."],
  ["02", "Future", "Long-term thinking, maintainable systems, and products designed to grow responsibly."],
  ["03", "Innovation", "Useful new ideas applied with purpose, evidence, and restraint."],
  ["04", "Trust", "Clear communication, privacy-aware choices, and dependable foundations."],
];

const principles = [
  ["Useful by design", "We begin with the outcome people need, then choose the technology."],
  ["Secure from the foundation", "Privacy and protection are product decisions, not finishing touches."],
  ["Simple in use", "Sophisticated capability should feel focused, calm, and understandable."],
  ["Honest in communication", "We describe what exists, acknowledge limits, and avoid empty hype."],
];

export default function Home() {
  return <>
    <section className="v2-hero">
      <div className="container v2-hero-inner">
        <p className="hero-brand reveal">Technology · Future · Innovation</p>
        <p className="v2-kicker reveal">Independent technology company</p>
        <h1 className="reveal delay-1">Intelligent products.<br />Secure foundations.<br /><span>Technology built to last.</span></h1>
        <div className="v2-hero-bottom reveal delay-2">
          <p>We simplify real problems for people and businesses through thoughtful software.</p>
          <Link className="text-link" href="/products">Explore products <span aria-hidden="true">↗</span></Link>
        </div>
        <Image className="v2-hero-mark" src="/brand/alviteq-symbol-512.png" width={512} height={512} alt="" priority />
      </div>
    </section>

    <section className="v2-product-intro section">
      <div className="container">
        <div className="v2-section-label"><span>01</span><p>Our products</p></div>
        <div className="v2-product-heading">
          <div><p className="eyebrow">OwnKeep</p><h2>Everything important.<br />One private place.</h2></div>
          <p>Documents, records, reminders, passwords, and the details that keep everyday life moving—organized inside a private digital vault.</p>
        </div>
      </div>
      <div className="container v2-product-stage">
        <div className="v2-product-glow" aria-hidden="true" />
        <OwnKeepScreens compact />
        <div className="v2-product-actions">
          <div className="v2-product-pills"><span>Private by design</span><span>Offline-first</span><span>Cross-platform</span></div>
          <Link className="button light" href="/products/ownkeep">Discover OwnKeep</Link>
        </div>
      </div>
    </section>

    <section className="v2-belief section">
      <div className="container">
        <div className="v2-section-label"><span>02</span><p>Why ALVITEQ</p></div>
        <div className="pillar-heading"><div><p className="eyebrow">Our foundation</p><h2>Four ideas guide every decision.</h2></div><p>Technology, future, innovation, and trust are not decorative values. They define how we choose problems, build products, and communicate progress.</p></div>
        <div className="pillar-grid">{pillars.map(([number,title,body]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
    </section>

    <section className="v2-trust section">
      <div className="container">
        <div className="v2-section-label"><span>03</span><p>How we build trust</p></div>
        <div className="v2-trust-heading"><h2>Strong engineering.<br />Clear responsibility.</h2><p>Our products are shaped by useful outcomes, responsible data practices, accessible experiences, and honest product claims.</p></div>
        <div className="principle-list">{principles.map(([title,body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
    </section>

    <section className="v2-roadmap section">
      <div className="container">
        <div className="v2-section-label"><span>04</span><p>Company direction</p></div>
        <div className="direction-grid"><div><p className="eyebrow">Our mission</p><h2>Make intelligent technology useful, secure, and easier to live with.</h2></div><div><p>ALVITEQ is building a focused portfolio of thoughtful digital products. OwnKeep is the first public product in that journey.</p><p>We will introduce future work only when its purpose, evidence, and availability are ready to communicate clearly.</p><Link className="text-link" href="/about">Meet ALVITEQ <span aria-hidden="true">↗</span></Link></div></div>
      </div>
    </section>

    <section className="v2-final">
      <div className="container v2-final-inner">
        <Image src="/brand/alviteq-symbol-512.png" width={512} height={512} alt="" />
        <div><p className="eyebrow">Technology people can trust</p><h2>Have a useful problem<br />worth solving?</h2><p className="final-copy">Talk with ALVITEQ about products, partnerships, thoughtful feedback, or future opportunities.</p><Link className="button light" href="/contact">Contact ALVITEQ</Link></div>
      </div>
    </section>
  </>;
}
