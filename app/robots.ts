import type { MetadataRoute } from "next";
import { siteInfo } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "Bingbot", "Slurp", "DuckDuckBot"],
        allow: "/",
        disallow: ["/api/", "/_next/", "/_vercel/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/_vercel/"],
      },
    ],
    sitemap: `${siteInfo.url}/sitemap.xml`,
    host: siteInfo.url,
  };
}
