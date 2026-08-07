import type { MetadataRoute } from "next";

export const dynamic = "force-static";

  const routes = ["", "/about", "/products", "/products/ownkeep", "/technology", "/careers", "/contact", "/privacy", "/terms", "/security"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-30");
  return routes.map((route) => ({
    url: `https://alviteq.com${route || "/"}`,
    lastModified,
    changeFrequency: route === "" || route === "/products" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/products" || route === "/products/ownkeep" ? 0.9 : 0.7,
  }));
}
