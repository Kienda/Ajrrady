import type { Metadata } from "next";
import galleryAlbums from "@/data/gallery.json";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { createMetadata } from "@/lib/metadata";
import type { GalleryAlbum } from "@/types/gallery";

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
      <Gallery albums={galleryAlbums as GalleryAlbum[]} />
    </>
  );
}
