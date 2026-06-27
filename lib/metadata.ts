import type { Metadata } from "next";
import { seo, siteInfo } from "@/data/site";

type MetadataInput = {
  title?: string;
  titleAbsolute?: string;
  description?: string;
  keywords?: string[];
  path?: string;
};

export function createMetadata({
  title = seo.title,
  titleAbsolute,
  description = seo.description,
  keywords = seo.keywords,
  path = "/",
}: MetadataInput = {}): Metadata {
  const canonical = new URL(path, siteInfo.url).toString();
  const displayTitle = titleAbsolute ?? title;

  return {
    title: titleAbsolute ? { absolute: titleAbsolute } : title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: displayTitle,
      description,
      url: canonical,
      siteName: siteInfo.name,
      locale: "fr_GN",
      type: "website",
      images: [
        {
          url: "/Landingpage.jpg",
          width: 1366,
          height: 768,
          alt: "AJRRADY – Association pour le Développement de Youkounkoun, Guinée",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: ["/Landingpage.jpg"],
    },
  };
}
