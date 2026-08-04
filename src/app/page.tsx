import Image from "next/image";
import Link from "next/link";
import VaultToy from "@/components/VaultToy";

const trustFacts = [
  ["Independent", "Technology company"],
  ["India", "Built with global ambition"],
  ["Long-term", "Software products"],
  ["Responsible", "Privacy-first engineering"],
];

const roadmap = [
  ["Now", "OwnKeep", "Private digital life management", "Building"],
  ["Next", "Product two", "A new everyday problem", "Exploring"],
  ["Future", "ALVITEQ", "A family of useful products", "Long term"],
];

export default function Home() {
  return <>
    <section className="v2-hero">
      <div className="container v2-hero-inner">
        <p className="v2-kicker reveal">Independent technology company</p>
        <h1 className="reveal delay-1">Building technology<br />people love using<br /><span>every day.</span></h1>
        <div className="v2-hero-bottom reveal delay-2">
          <p>Simple. Intelligent. Built to last.</p>
          <Link className="text-link" href="/products">Explore products <span aria-hidden="true">↗</span></Link>
        </div>
        <Image className="v2-hero-mark" src="/brand/official/alviteq-icon.svg" width={512} height={512} alt="" priority />
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
        <Image className="v2-screen-board" src="/images/ownkeep-screens.jpg" width={1800} height={1125} alt="OwnKeep product screens showing documents, reminders, people, timeline, search, and settings" />
        <div className="v2-product-actions">
          <div className="v2-product-pills"><span>Private by design</span><span>Offline-first</span><span>Cross-platform</span></div>
          <Link className="button light" href="/products/ownkeep">Discover OwnKeep</Link>
        </div>
      </div>
    </section>

    <section className="v2-belief section">
      <div className="container">
        <div className="v2-section-label"><span>02</span><p>What we believe</p></div>
        <blockquote>Technology should disappear.<br /><span>What remains is the help it gives.</span></blockquote>
        <p className="v2-belief-copy">We start with what people are trying to do, then use design, engineering, and intelligence to make that experience feel simpler—not more technical.</p>
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Image src="/images/alviteq.jpg" width={800} height={400} alt="ALVITEQ Vision" style={{ width: '100%', height: 'auto', borderRadius: '1rem' }} />
        </div>
      </div>
    </section>

    <section className="v2-trust section">
      <div className="container">
        <div className="v2-section-label"><span>03</span><p>Built honestly</p></div>
        <div className="v2-trust-heading"><h2>Early in the journey.<br />Serious about the destination.</h2><p>We will not invent scale, customers, or history. Trust starts with being clear about who we are and how we build. Our ecosystem is built on transparency.</p></div>
        <div className="v2-facts">{trustFacts.map(([value,label])=><div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Ecosystem & Partners</p>
          <Image src="/images/alviteq_logos.jpg" width={1000} height={200} alt="ALVITEQ Ecosystem Logos" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '0 auto' }} />
        </div>
      </div>
    </section>

    <section className="v2-roadmap section">
      <div className="container">
        <div className="v2-section-label"><span>04</span><p>What comes next</p></div>
        <div className="v2-roadmap-head"><h2>One product today.<br />A company for the next decade.</h2><p>Our ambition is broad. Our announcements will remain honest.</p></div>
        <div className="v2-roadmap-list">{roadmap.map(([time,name,description,status], index)=><article key={time}>
          <span className="v2-roadmap-index">0{index+1}</span>
          <div><small>{time}</small><h3>{name}</h3></div>
          <p>{description}</p><em>{status}</em>
        </article>)}</div>
      </div>
    </section>

    <section className="v2-final">
      <div className="container" style={{ textAlign: 'center' }}>
        <VaultToy />
      </div>
      <div className="container v2-final-inner">
        <Image src="/brand/official/alviteq-icon-white.svg" width={512} height={512} alt="" />
        <div><p className="eyebrow">Technology you can trust</p><h2>Building for everyday life.<br />And everything after.</h2><Link className="button light" href="/about">Meet ALVITEQ</Link></div>
      </div>
    </section>
  </>;
}
