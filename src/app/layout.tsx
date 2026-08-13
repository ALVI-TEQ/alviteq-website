import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductsNav from "@/components/ProductsNav";
import MobileNav from "@/components/MobileNav";
import CloudflareAnalytics from "@/components/CloudflareAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alviteq.com"),
  title: { default: "ALVITEQ | Secure Software for Life and Healthcare", template: "%s | ALVITEQ" },
  description: "ALVITEQ is building secure, thoughtful software for personal information management and modern hospital operations through OwnKeep and ALVITEQ HMS.",
  alternates: { canonical: "https://alviteq.com/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/brand/official/alviteq-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/official/alviteq-icon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/brand/official/alviteq-icon-192.png",
  },
  openGraph: {
    title: "ALVITEQ | Secure Software for Life and Healthcare",
    description: "ALVITEQ builds secure, thoughtful software for personal information management and modern hospital operations.",
    url: "https://alviteq.com",
    siteName: "ALVITEQ",
    type: "website",
    images: [{ url: "/og/alviteq-corporate.png", width: 1200, height: 630, alt: "ALVITEQ — Secure software for life and healthcare." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALVITEQ | Secure Software for Life and Healthcare",
    description: "Secure, thoughtful software for personal information management and modern hospital operations.",
    images: ["/og/alviteq-corporate.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ALVITEQ",
  url: "https://alviteq.com/",
  logo: "https://alviteq.com/brand/official/alviteq-icon-512.png",
  email: "hello@alviteq.com",
  description: "An independent technology company building secure digital products for individuals, organisations, and healthcare teams.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ALVITEQ",
  url: "https://alviteq.com/",
  description: "Secure software for everyday life and modern healthcare.",
  publisher: { "@type": "Organization", name: "ALVITEQ" },
};

const nav = [
  ["About", "/about"],
  ["Technology", "/technology"],
  ["Trust", "/trust"],
  ["Careers", "/careers"],
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CloudflareAnalytics />
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
                height={400}
                priority
              />
            </Link>
            <ProductsNav />
            <div className="nav-links">
              {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              <Link className="button" href="/contact">Contact</Link>
            </div>
            <MobileNav />
          </nav>
        </header>
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <Image
                  className="footer-logo"
                  src="/brand/official/alviteq-horizontal-white.svg"
                  alt="ALVITEQ"
                  width={1500}
                  height={400}
                />
                <p>Technology people can trust. Innovation built to last.</p>
              </div>
              <div className="footer-links">
                <h3>Products</h3>
                <Link href="/products/ownkeep">OwnKeep</Link>
                <Link href="/products/hospital-management-system">ALVITEQ HMS</Link>
                <Link href="/products">All products</Link>
              </div>
              <div className="footer-links">
                <h3>Company</h3>
                <Link href="/about">About</Link>
                <Link href="/technology">Technology</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/contact">Contact</Link>
              </div>
              <div className="footer-links">
                <h3>Trust</h3>
                <Link href="/trust">Trust Centre</Link>
                <Link href="/security">Security</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/accessibility">Accessibility</Link>
              </div>
            </div>
            <div className="copyright">© {new Date().getFullYear()} ALVITEQ. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
