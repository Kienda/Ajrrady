import type { MetadataRoute } from "next";
import { routes, siteInfo } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteInfo.url).toString(),
    lastModified: new Date("2026-06-18"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
