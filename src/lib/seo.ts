import type { Metadata } from "next";

const siteUrl = "https://alviteq.com";
const socialImages = {
  corporate: { file: "/og/alviteq-corporate.png", alt: "ALVITEQ — Secure software for life and healthcare." },
  ownkeep: { file: "/og/ownkeep.png", alt: "OwnKeep — Private digital vault by ALVITEQ." },
  hms: { file: "/og/alviteq-hms.png", alt: "ALVITEQ HMS — Secure hospital operations platform, in development." },
  trust: { file: "/og/trust.png", alt: "ALVITEQ Trust Centre — Security, privacy, accessibility, and responsible disclosure." },
  careers: { file: "/og/careers.png", alt: "Careers at ALVITEQ — Build useful technology with clear responsibility." },
};

function socialImageFor(path: string) {
  const selected = path.startsWith("/products/ownkeep") ? socialImages.ownkeep
    : path === "/products/hospital-management-system" ? socialImages.hms
    : ["/trust", "/security", "/privacy", "/accessibility", "/terms"].includes(path) ? socialImages.trust
    : path === "/careers" ? socialImages.careers : socialImages.corporate;
  return {
    url: `${siteUrl}${selected.file}`,
    width: 1200,
    height: 630,
    alt: selected.alt,
  };
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const socialImage = socialImageFor(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ALVITEQ",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
