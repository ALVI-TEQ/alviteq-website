import type { Metadata } from "next";

const siteUrl = "https://alviteq.com";
const socialImage = {
  url: `${siteUrl}/brand/alviteq-social-card-final.png`,
  width: 1200,
  height: 630,
  alt: "ALVITEQ — Technology you can trust",
};

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
