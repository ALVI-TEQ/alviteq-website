import Link from "next/link";

export function PageHero({ eyebrow, title, intro, action }: {
  eyebrow: string; title: string; intro: string;
  action?: { label: string; href: string };
}) {
  return <section className="page-hero"><div className="container">
    <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{intro}</p>
    {action && <Link className="button" href={action.href}>{action.label}</Link>}
  </div></section>;
}

export function FeatureGrid({ items }: { items: Array<[string, string, string]> }) {
  return <div className="grid-3">{items.map(([icon, title, body]) =>
    <article className="card" key={title}><div className="card-icon">{icon}</div><h3>{title}</h3><p>{body}</p></article>)}
  </div>;
}

export function Cta({ title, body, label = "Contact ALVITEQ", href = "/contact" }: {
  title: string; body: string; label?: string; href?: string;
}) {
  return <section className="cta"><div><p className="eyebrow">Let&apos;s talk</p><h2>{title}</h2><p>{body}</p></div>
    <Link className="button" href={href}>{label}</Link></section>;
}
