import { PageHero } from "@/components/page-elements";
import ContactForm from "@/components/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Contact ALVITEQ", description: "Contact ALVITEQ about the company, products, support, privacy, security, partnerships, or careers.", path: "/contact" });

const contacts = [
  ["General","Company, product, partnership, and media enquiries.","hello@alviteq.com"],
  ["OwnKeep","Access, support, testing, and product feedback.","support@alviteq.com"],
  ["ALVITEQ HMS","Product briefings and design-partner discussions.","hello@alviteq.com"],
  ["Privacy","Questions about privacy and personal information.","privacy@alviteq.com"],
  ["Security","Responsible reports about product or website security.","security@alviteq.com"],
];

export default function ContactPage() {
  return <><PageHero eyebrow="Contact" title="Start a useful conversation." intro="Choose the closest topic and include enough context for the right response." />
    <section className="section container"><div className="section-head"><p className="eyebrow">Secure enquiry form</p><h2>Tell us what you would like to discuss.</h2><p className="lead">Submissions are verified, rate-limited, and retained only as needed to respond.</p></div><ContactForm /><div className="contact-grid contact-routes">{contacts.map(([title,body,email], index)=><article className="contact-card" key={`${title}-${index}`}><h2>{title}</h2><p>{body}</p><a href={`mailto:${email}?subject=${encodeURIComponent(title + " enquiry")}`}>{email} →</a></article>)}</div></section>
  </>;
}
