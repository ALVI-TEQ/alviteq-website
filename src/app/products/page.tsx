import Image from "next/image";
import Link from "next/link";
import { Cta, PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Products | OwnKeep and ALVITEQ HMS", description: "Explore OwnKeep for private personal information management and ALVITEQ HMS for modern hospital operations.", path: "/products" });

export default function ProductsPage() {
  return <><PageHero eyebrow="Products by ALVITEQ" title="Two products. One engineering standard." intro="ALVITEQ builds focused products for personal information control and modern healthcare operations." />
    <section className="section container"><div className="portfolio-grid products-page-grid">
      <article className="portfolio-card ownkeep-card"><div><div className="product-meta"><span>Personal technology</span><em>Current release</em></div><Image className="product-icon" src="/images/ownkeep-icon.webp" width={150} height={150} alt="OwnKeep application icon" /><h2>OwnKeep</h2><p className="product-value">Your important information, privately organised and always under your control.</p><dl className="product-facts"><div><dt>Audience</dt><dd>Individuals and households</dd></div><div><dt>Platforms</dt><dd>Mobile and desktop</dd></div><div><dt>Model</dt><dd>Encrypted, offline-capable vault</dd></div></dl></div><Link className="button light" href="/products/ownkeep">Explore OwnKeep</Link></article>
      <article className="portfolio-card hms-card"><div><div className="product-meta"><span>Healthcare technology</span><em>In development</em></div><div className="hms-monogram" aria-hidden="true">HMS</div><h2>ALVITEQ HMS</h2><p className="product-value">One secure operational foundation for modern hospitals.</p><dl className="product-facts"><div><dt>Audience</dt><dd>Hospitals and healthcare teams</dd></div><div><dt>Delivery</dt><dd>Enterprise platform</dd></div><div><dt>Model</dt><dd>Configurable, multi-facility operations</dd></div></dl></div><Link className="button" href="/products/hospital-management-system">Explore ALVITEQ HMS</Link></article>
    </div></section>
    <section className="section tint"><div className="container"><div className="section-head"><p className="eyebrow">Portfolio discipline</p><h2>Focused products, honestly presented.</h2><p className="lead">We do not add placeholder products or make availability claims ahead of evidence. Each product has a clear problem, intended audience, and public status.</p></div></div></section>
    <section className="section container"><Cta title="Have a product question?" body="Talk with ALVITEQ about OwnKeep, ALVITEQ HMS, testing, or design partnerships." /></section>
  </>;
}
