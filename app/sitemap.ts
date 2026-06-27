import type { MetadataRoute } from "next";
import { siteInfo } from "@/data/site";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

const pages: Array<[string, SitemapEntry["changeFrequency"], number]> = [
  ["/",            "weekly",  1.0],
  ["/fec-sy",      "weekly",  0.9],   // active event
  ["/nos-actions", "monthly", 0.85],
  ["/realisations","monthly", 0.85],
  ["/galerie",     "weekly",  0.8],
  ["/a-propos",    "monthly", 0.75],
  ["/contact",     "monthly", 0.7],
  ["/adhesion",    "monthly", 0.7],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(([route, changeFrequency, priority]) => ({
    url: new URL(route, siteInfo.url).toString(),
    lastModified: new Date("2026-06-27"),
    changeFrequency,
    priority,
  }));
}
