import type { Metadata } from "next";

const siteUrl = "https://alviteq.com";
const socialImage = {
  url: `${siteUrl}/og.png`,
  width: 1200,
  height: 630,
  alt: "ALVITEQ — Technology people can trust. Innovation built to last.",
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
