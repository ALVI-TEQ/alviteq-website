import Image from "next/image";
import Link from "next/link";
import { Cta, FeatureGrid, PageHero } from "@/components/page-elements";
import OwnKeepScreens from "@/components/OwnKeepScreens";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "OwnKeep | Private Digital Vault by ALVITEQ", description: "OwnKeep is an encrypted, offline-capable vault for documents, records, reminders, passwords, and important life information.", path: "/products/ownkeep" });

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "OwnKeep",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Android, iOS, macOS, Windows, Linux",
  url: "https://alviteq.com/products/ownkeep",
  image: "https://alviteq.com/images/ownkeep-icon.webp",
  description: "A private digital space for documents, records, reminders, passwords, and important life information.",
  author: { "@type": "Organization", name: "ALVITEQ", url: "https://alviteq.com/" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://alviteq.com/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://alviteq.com/products" },
    { "@type": "ListItem", position: 3, name: "OwnKeep", item: "https://alviteq.com/products/ownkeep" },
  ],
};

export default function OwnKeepPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><PageHero eyebrow="OwnKeep · Current release" title="Keep what matters. Only you. Always." intro="OwnKeep organizes documents and important life information inside an encrypted, offline-capable vault." action={{label:"Ask about access",href:"/contact?product=ownkeep"}} />
    <section className="screen-section"><div className="container"><div className="screen-section-heading"><p className="eyebrow">Actual OwnKeep interface</p><h2>A private vault designed around everyday life.</h2><p className="lead">Explore real OwnKeep screens for organizing records, scanning securely, tracking important dates, and understanding vault health.</p></div><OwnKeepScreens /></div></section>
    <section className="section container"><div className="section-head"><p className="eyebrow">From file to useful record</p><h2>A complete private document journey.</h2><p className="lead">OwnKeep preserves the original first, then creates local previews, runs supported OCR, suggests document details, and leaves the final review with you.</p></div><div className="journey">
      {["Scan or import","Encrypt original","Process locally","Review details","Organize & remind","Find when needed"].map((item,index)=><div key={item}><strong>{String(index+1).padStart(2,"0")}</strong><span>{item}</span></div>)}
    </div></section>
    <section className="section tint"><div className="container"><FeatureGrid items={[
      ["▣","Document library","Search filenames, tags, OCR text, and extracted details; use favourites, categories, archive, and encrypted trash."],
      ["⌁","Life graph","Connect records to people, family, pets, vehicles, properties, places, devices, policies, and accounts."],
      ["◷","Timeline & reminders","Turn expiry dates, bills, services, and life events into a useful local timeline."],
      ["⌕","Local search","Find records and connected information without sending the search query to a remote service."],
      ["✦","Password manager","Store usernames, passwords, websites, and private notes in the unlocked encrypted environment."],
      ["⇩","Encrypted backup","Create a portable archive for recovery and device migration without exposing plaintext originals."]
    ]} /></div></section>
    <section className="section container"><div className="section-head"><p className="eyebrow">Why OwnKeep</p><h2>Personal information without mandatory cloud dependence.</h2></div><div className="why-grid">{["Offline-first workflows","No mandatory cloud account","Encrypted local vault","Mobile and desktop","Portable encrypted backup","User-controlled recovery"].map(item => <div key={item}><span aria-hidden="true">✓</span><strong>{item}</strong></div>)}</div></section>
    <section className="section container"><div className="split"><Image className="feature-image" src="/images/ownkeep-icon.webp" width={600} height={600} alt="OwnKeep blue shield and lock icon" /><div><p className="eyebrow">Platforms</p><h2>One vault across mobile and desktop.</h2><p className="lead">OwnKeep is engineered for Android, iOS, macOS, Windows, and Linux. Hardware capabilities vary, while the encrypted data model and core document journey remain consistent.</p><ul className="check-list"><li>Biometric convenience where supported</li><li>Camera and scanner workflows on supported devices</li><li>Desktop-friendly navigation and keyboard submission</li><li>Encrypted portable backup and recovery</li></ul></div></div></section>
    <section className="section container"><div className="section-head"><p className="eyebrow">OwnKeep legal</p><h2>Clear terms for a private, local vault.</h2><p className="lead">Review how OwnKeep handles information on your device and the responsibilities that come with protecting recovery material and backups.</p><p><Link className="inline-link" href="/products/ownkeep/privacy">OwnKeep Privacy Policy</Link> · <Link className="inline-link" href="/products/ownkeep/terms">OwnKeep Terms &amp; Conditions</Link></p></div></section>
    <section className="section container"><Cta title="Want to use or follow OwnKeep?" body="Contact ALVITEQ for access information, product updates, testing opportunities, or partnership discussions." label="Ask about OwnKeep" href="/contact?product=ownkeep" /></section>
  </>;
}
