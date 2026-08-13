import Image from "next/image";
import Link from "next/link";

const pillars = [
  ["01", "Technology", "Capable engineering shaped around real human and organisational needs."],
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
    <section className="v2-hero"><div className="container v2-hero-inner">
      <p className="hero-brand reveal">Independent product technology company</p>
      <h1 className="reveal delay-1">Secure products for everyday life<br />and <span>modern healthcare.</span></h1>
      <div className="v2-hero-bottom reveal delay-2"><p>ALVITEQ creates dependable digital products for individuals, organisations, and healthcare teams—designed with clarity, security, and long-term usefulness.</p><div className="actions"><Link className="button" href="/products">Explore our products</Link><Link className="text-link" href="/contact">Talk to ALVITEQ <span aria-hidden="true">↗</span></Link></div></div>
      <Image className="v2-hero-mark" src="/brand/official/alviteq-icon.svg" width={512} height={512} alt="" priority />
    </div></section>

    <section className="portfolio-section section"><div className="container">
      <div className="v2-section-label"><span>01</span><p>Our products</p></div>
      <div className="portfolio-heading"><h2>Two products.<br />One engineering standard.</h2><p>From private personal information management to connected hospital operations, our products turn complex technology into dependable, understandable experiences.</p></div>
      <div className="portfolio-grid">
        <article className="portfolio-card ownkeep-card"><div><div className="product-meta"><span>Personal technology</span><em>Current release</em></div><Image className="product-icon" src="/images/ownkeep-icon.webp" width={150} height={150} alt="OwnKeep application icon" /><h3>OwnKeep</h3><p className="product-value">Your important information, privately organised and always under your control.</p><p>An encrypted, offline-capable vault for documents, records, reminders, passwords, and essential life information.</p></div><Link className="button light" href="/products/ownkeep">Explore OwnKeep</Link></article>
        <article className="portfolio-card hms-card"><div><div className="product-meta"><span>Healthcare technology</span><em>In development</em></div><div className="hms-monogram" aria-hidden="true">HMS</div><h3>ALVITEQ HMS</h3><p className="product-value">One secure operational foundation for modern hospitals.</p><p>A configurable platform connecting patient administration, clinical workflows, diagnostics, pharmacy, inventory, billing, governance, and reporting.</p></div><Link className="button" href="/products/hospital-management-system">Explore ALVITEQ HMS</Link></article>
      </div>
    </div></section>

    <section className="v2-belief section"><div className="container"><div className="v2-section-label"><span>02</span><p>Why ALVITEQ</p></div><div className="pillar-heading"><div><p className="eyebrow">Our foundation</p><h2>Four ideas guide every decision.</h2></div><p>Technology, future, innovation, and trust define how we choose problems, build products, and communicate progress.</p></div><div className="pillar-grid">{pillars.map(([number,title,body]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <section className="v2-trust section"><div className="container"><div className="v2-section-label"><span>03</span><p>How we build trust</p></div><div className="v2-trust-heading"><h2>Strong engineering.<br />Clear responsibility.</h2><p>Our products are shaped by useful outcomes, responsible data practices, accessible experiences, and honest product claims.</p></div><div className="principle-list">{principles.map(([title,body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><Link className="text-link section-link" href="/trust">Visit the Trust Centre <span aria-hidden="true">↗</span></Link></div></section>
    <section className="section technology-bridge"><div className="container split"><div><p className="eyebrow">Technology and engineering</p><h2>Different contexts. The same disciplined approach.</h2></div><div><p className="lead">OwnKeep prioritises local control and portable encrypted records. ALVITEQ HMS is being designed for coordinated, accountable hospital workflows. Both begin with security, clarity, and long-term reliability.</p><Link className="text-link" href="/technology">Explore our technology approach <span aria-hidden="true">↗</span></Link></div></div></section>
    <section className="v2-roadmap section"><div className="container"><div className="v2-section-label"><span>04</span><p>Company direction</p></div><div className="direction-grid"><div><p className="eyebrow">Our mission</p><h2>Build secure, thoughtful software for everyday life and modern healthcare.</h2></div><div><p>ALVITEQ is building a focused portfolio for people, organisations, and healthcare teams.</p><p>We communicate product status honestly and introduce capabilities only when their purpose and availability can be described clearly.</p><Link className="text-link" href="/about">Meet ALVITEQ <span aria-hidden="true">↗</span></Link></div></div></div></section>
    <section className="v2-final"><div className="container v2-final-inner"><Image src="/brand/official/alviteq-icon-white.svg" width={512} height={512} alt="" /><div><p className="eyebrow">Technology people can trust</p><h2>Have a useful problem<br />worth solving?</h2><p className="final-copy">Talk with ALVITEQ about OwnKeep, ALVITEQ HMS, product partnerships, or future opportunities.</p><Link className="button light" href="/contact">Contact ALVITEQ</Link></div></div></section>
  </>;
}
