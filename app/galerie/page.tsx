import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { getGalleryAlbums } from "@/lib/gallery";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Galerie",
  path: "/galerie",
});

export const revalidate = 3600;

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Photos officielles"
        description="Retrouvez les moments forts des activités, rencontres et événements portés par AJRRADY."
      />
      <Gallery albums={albums} />
    </>
  );
}
