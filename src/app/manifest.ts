import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALVITEQ",
    short_name: "ALVITEQ",
    description: "Secure software for everyday life and modern healthcare.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0B1D3A",
    icons: [
      { src: "/brand/official/alviteq-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/official/alviteq-icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/brand/pwa-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
