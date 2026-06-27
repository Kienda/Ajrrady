import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { galleryAlbums } from "@/src/data/gallery";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Galerie",
  path: "/galerie",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Photos officielles"
        description="Retrouvez les moments forts des activités, rencontres et événements portés par AJRRADY."
      />
      <Gallery albums={galleryAlbums} />
    </>
  );
}
