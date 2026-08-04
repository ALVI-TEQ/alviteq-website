import Image from "next/image";
import { Cta, FeatureGrid, PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "OwnKeep", description: "OwnKeep is a private digital space for documents, records, reminders, passwords, and important life information.", path: "/products/ownkeep" });

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
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><PageHero eyebrow="OwnKeep · An ALVITEQ product" title="Keep what matters. Only you. Always." intro="OwnKeep organizes documents and important life information inside an encrypted, offline-capable vault." action={{label:"Ask about OwnKeep",href:"/contact"}} />
    <section className="screen-section"><div className="container"><Image className="screen-board" src="/images/ownkeep-screens.png" width={1800} height={1125} alt="OwnKeep mobile product screens including home, inbox, records, people, timeline, search, and settings" priority /></div></section>
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
    <section className="section container"><div className="split"><Image className="feature-image" src="/images/ownkeep-icon.webp" width={600} height={600} alt="OwnKeep blue shield and lock icon" /><div><p className="eyebrow">Platforms</p><h2>One vault across mobile and desktop.</h2><p className="lead">OwnKeep is engineered for Android, iOS, macOS, Windows, and Linux. Hardware capabilities vary, while the encrypted data model and core document journey remain consistent.</p><ul className="check-list"><li>Biometric convenience where supported</li><li>Camera and scanner workflows on supported devices</li><li>Desktop-friendly navigation and keyboard submission</li><li>Encrypted portable backup and recovery</li></ul></div></div></section>
    <section className="section container"><Cta title="Want to follow OwnKeep?" body="Contact ALVITEQ for product updates, testing opportunities, or partnership discussions." /></section>
  </>;
}
