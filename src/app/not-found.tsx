import Link from "next/link";

export default function NotFound() {
  return <section className="not-found">
    <div className="container">
      <p className="eyebrow">404 · Page not found</p>
      <h1>This page isn&apos;t here.</h1>
      <p className="lead">The address may have changed, or the page may no longer exist.</p>
      <div className="actions"><Link className="button" href="/">Return home</Link><Link className="button secondary" href="/products">Explore products</Link></div>
    </div>
  </section>;
}
