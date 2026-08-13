import Link from "next/link";
import { Cta, FeatureGrid, PageHero } from "@/components/page-elements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "ALVITEQ HMS | Secure Hospital Management System", description: "ALVITEQ HMS is a secure, configurable hospital platform in development for connected clinical, administrative, diagnostic, pharmacy, inventory, financial, and governance workflows.", path: "/products/hospital-management-system" });

const productSchema = {
  "@context": "https://schema.org", "@type": "Product", name: "ALVITEQ HMS",
  category: "Hospital management software", url: "https://alviteq.com/products/hospital-management-system",
  description: "A secure, configurable hospital operations platform in development.",
  brand: { "@type": "Brand", name: "ALVITEQ" },
};
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: "https://alviteq.com/" },
  { "@type": "ListItem", position: 2, name: "Products", item: "https://alviteq.com/products" },
  { "@type": "ListItem", position: 3, name: "ALVITEQ HMS", item: "https://alviteq.com/products/hospital-management-system" },
] };

const groups = [
  ["Patient administration", ["Patient registration", "Appointments", "Outpatient workflows", "Inpatient admission and discharge", "Emergency workflows", "Bed and ward management"]],
  ["Clinical operations", ["Encounters and clinical documentation", "Diagnoses and procedures", "Orders and results", "Medication workflows", "Nursing activities", "Operating theatre management"]],
  ["Diagnostics and pharmacy", ["Laboratory workflows", "Radiology workflows", "Pharmacy operations", "Medication dispensing", "Batch and expiry management"]],
  ["Hospital operations", ["Inventory and supply", "Procurement", "Facility configuration", "Workforce and access management", "Billing and revenue workflows", "Operational reporting"]],
  ["Platform foundations", ["Multi-tenant and multi-facility architecture", "Role- and scope-based permissions", "Audit trails", "Secure integrations", "Configurable workflows", "Migration and deployment support"]],
] as const;

export default function HmsPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <PageHero eyebrow="ALVITEQ HMS · In development" title="One secure platform for hospital operations and care delivery." intro="ALVITEQ HMS is being built to connect administrative, clinical, diagnostic, pharmacy, inventory, financial, and governance workflows through a secure and configurable hospital platform." action={{label:"Discuss ALVITEQ HMS",href:"/contact?product=hms"}} />
    <section className="section container"><div className="section-head"><p className="eyebrow">Intended outcomes</p><h2>More connected work across the hospital.</h2><p className="lead">The platform is being designed around dependable organisational outcomes rather than a disconnected catalogue of modules.</p></div><FeatureGrid items={[
      ["01","Connected patient journeys","Coordinate information and handoffs across administrative and care workflows."],
      ["02","Clearer coordination","Give departments structured ways to work together with appropriate context."],
      ["03","Reliable supply workflows","Support accountable inventory, pharmacy, medication, batch, and expiry processes."],
      ["04","Operational visibility","Turn structured activity into useful reporting for authorised teams."],
      ["05","Controlled accountability","Apply role, scope, and audit foundations to sensitive operational actions."],
      ["06","Configurable operations","Support different facilities, departments, workflows, and integration needs."],
    ]} /></section>
    <section id="capabilities" className="section tint"><div className="container"><div className="section-head"><p className="eyebrow">Planned capabilities</p><h2>A coherent operational platform.</h2><p className="lead">Capability scope will evolve through validation with healthcare teams and design partners.</p></div><div className="capability-groups">{groups.map(([title, items]) => <article key={title}><h3>{title}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
    <section className="section container"><div className="split"><div><p className="eyebrow">Designed for hospital teams</p><h2>One platform, many accountable roles.</h2><p className="lead">Intended users include hospital leadership, doctors, nurses, diagnostic teams, pharmacy and inventory teams, billing and administration, and hospital IT and security teams.</p></div><div className="stat-panel"><div className="stats"><div className="stat"><strong>Clinical</strong><span>care and diagnostic workflows</span></div><div className="stat"><strong>Operational</strong><span>inventory, facilities, and coordination</span></div><div className="stat"><strong>Financial</strong><span>billing and revenue workflows</span></div><div className="stat"><strong>Governance</strong><span>access, audit, and oversight</span></div></div></div></div></section>
    <section className="section hms-security"><div className="container split"><div><p className="eyebrow">Security designed into the platform</p><h2>Protected access. Accountable actions. Recoverable operations.</h2></div><div><p className="lead">ALVITEQ HMS is being engineered around tenant isolation, controlled access, protected data exchange, auditable workflows, and operational recovery.</p><p>It is designed to support applicable organisational and regulatory requirements. No certification or universal compliance claim is made.</p><Link className="text-link" href="/security">Read our security approach <span aria-hidden="true">↗</span></Link></div></div></section>
    <section className="section container"><Cta title="Help shape ALVITEQ HMS" body="Hospitals, healthcare professionals, and technology partners can discuss the design-partner programme or request a product briefing." label="Become a design partner" href="/contact?product=hms" /></section>
  </>;
}
