import type { Metadata } from "next";
import { seo, siteInfo } from "@/data/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({
  title = seo.title,
  description = seo.description,
  path = "/",
}: MetadataInput = {}): Metadata {
  const canonical = new URL(path, siteInfo.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
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
          alt: "AJRRADY - Unis pour servir, engagés pour développer Youkounkoun",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/Landingpage.jpg"],
    },
  };
}
