import Image from "next/image";
import Link from "next/link";
import { Cta, PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Products", description: "Explore thoughtful digital products built by ALVITEQ to solve real-world problems.", path: "/products" });

export default function ProductsPage() {
  return <><PageHero eyebrow="Products by ALVITEQ" title="Technology becomes meaningful when it solves something real." intro="We build focused digital products around clear everyday problems." action={{label:"Explore OwnKeep",href:"/products/ownkeep"}} />
    <section className="section container"><div className="product-showcase"><div><Image className="product-icon" src="/images/ownkeep-icon.webp" width={150} height={150} alt="OwnKeep application icon" /><p className="eyebrow">Available product</p><h2>OwnKeep</h2><p className="lead">A private digital space for documents, records, reminders, passwords, and important life information.</p><div className="platform-list"><span>Android</span><span>iOS</span><span>macOS</span><span>Windows</span><span>Linux</span></div><Link className="button" href="/products/ownkeep">Discover OwnKeep</Link></div><Image className="vault-art" src="/images/ownkeep-vault.webp" width={750} height={1000} alt="OwnKeep encrypted vault illustration" /></div></section>
    <section className="section tint"><div className="container"><div className="future-product"><p className="eyebrow">More in development</p><h2>ALVITEQ is being built for more than one product.</h2><p className="lead">We are exploring additional real-world problems where thoughtful design, intelligent technology, and dependable engineering can create lasting value. We will share them when they are ready—not before.</p></div></div></section>
    <section className="section container"><Cta title="Have a product question?" body="We welcome thoughtful feedback from users, collaborators, and partners." /></section>
  </>;
}
