import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alviteq.com"),
  title: { default: "ALVITEQ | Technology Built for Everyday Life", template: "%s | ALVITEQ" },
  description: "ALVITEQ is a technology company building thoughtful digital products that solve real-world problems across mobile, desktop, web and intelligent platforms.",
  alternates: { canonical: "https://alviteq.com/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/official/favicon.ico", sizes: "any" },
      { url: "/brand/official/alviteq-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/official/alviteq-icon-192.png",
  },
  openGraph: {
    title: "ALVITEQ | Technology Built for Everyday Life",
    description: "ALVITEQ builds thoughtful digital products that solve real-world problems across mobile, desktop, web and intelligent platforms.",
    url: "https://alviteq.com",
    siteName: "ALVITEQ",
    type: "website",
    images: [{ url: "/brand/alviteq-social-card-final.png", width: 1200, height: 630, alt: "ALVITEQ — Technology you can trust" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALVITEQ | Technology Built for Everyday Life",
    description: "Thoughtful digital products that solve real-world problems.",
    images: ["/brand/alviteq-social-card-final.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ALVITEQ",
  url: "https://alviteq.com/",
  logo: "https://alviteq.com/brand/official/alviteq-icon-512.png",
  email: "hello@alviteq.com",
  description: "An independent technology company building thoughtful digital products for everyday life.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ALVITEQ",
  url: "https://alviteq.com/",
  description: "Technology built for everyday life.",
  publisher: { "@type": "Organization", name: "ALVITEQ" },
};

const nav = [
  ["About", "/about"],
  ["Products", "/products"],
  ["OwnKeep", "/products/ownkeep"],
  ["Technology", "/technology"],
  ["Careers", "/careers"],
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <header className="site-header">
          <nav className="nav container" aria-label="Main navigation">
            <Link className="brand" href="/" aria-label="ALVITEQ home">
              <Image
                className="brand-logo"
                src="/brand/official/alviteq-horizontal.svg"
                alt="ALVITEQ"
                width={1500}
                height={420}
                priority
              />
            </Link>
            <div className="nav-links">
              {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              <Link className="button" href="/contact">Contact</Link>
            </div>
            <details className="mobile-nav">
              <summary>Menu</summary>
              <div>
                {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
                <Link href="/contact">Contact</Link>
              </div>
            </details>
          </nav>
        </header>
        <main id="main-content">{children}</main>
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <Image
                  className="footer-logo"
                  src="/brand/official/alviteq-horizontal.svg"
                  alt="ALVITEQ"
                  width={1500}
                  height={420}
                />
                <p>Thoughtful digital products built around real problems, dependable engineering, and simple experiences.</p>
              </div>
              <div className="footer-links">
                <h3>Company</h3>
                <Link href="/about">About</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/contact">Contact</Link>
              </div>
              <div className="footer-links">
                <h3>Products</h3>
                <Link href="/products">All products</Link>
                <Link href="/products/ownkeep">OwnKeep</Link>
                <Link href="/technology">Technology</Link>
              </div>
              <div className="footer-links">
                <h3>Legal</h3>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms &amp; Conditions</Link>
              </div>
            </div>
            <div className="copyright">© {new Date().getFullYear()} Alviteq. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
