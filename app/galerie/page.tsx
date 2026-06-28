import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { galleryAlbums, galleryImages } from "@/src/data/gallery";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, imageGallerySchema, webPageSchema } from "@/lib/schemas";

export const metadata: Metadata = createMetadata({
  title: "Galerie Photos – Youkounkoun, Guinée",
  description:
    "Photos et vidéos des activités de l'AJRRADY à Youkounkoun, Koundara. Festival FEC-SY, actions éducatives et événements communautaires.",
  keywords: [
    "AJRRADY",
    "Youkounkoun",
    "Koundara",
    "Guinée",
    "galerie",
    "photos",
    "FEC-SY",
    "activités",
    "association guinéenne",
  ],
  path: "/galerie",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Galerie", path: "/galerie" }])} />
      <JsonLd data={webPageSchema({ path: "/galerie", name: "Galerie Photos – Youkounkoun, Guinée | AJRRADY", description: "Photos et vidéos des activités de l'AJRRADY à Youkounkoun, Koundara. Festival FEC-SY, actions éducatives et événements communautaires." })} />
      <JsonLd data={imageGallerySchema(galleryImages)} />
      <PageHero
        eyebrow="Galerie"
        title="Photos officielles"
        description="Retrouvez les moments forts des activités, rencontres et événements portés par AJRRADY."
      />
      <Gallery albums={galleryAlbums} />
    </>
  );
}
