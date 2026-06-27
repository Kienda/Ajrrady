"use client";

import { Image as ImageIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AlbumFilter } from "@/components/AlbumFilter";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HighlightText } from "@/components/HighlightText";
import { Lightbox } from "@/components/Lightbox";
import type { GalleryAlbum, GalleryImage } from "@/types/gallery";

type GalleryProps = {
  albums: GalleryAlbum[];
};

const allAlbums = "all";

export function Gallery({ albums }: GalleryProps) {
  const [activeAlbum, setActiveAlbum] = useState(allAlbums);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  const totalCount = useMemo(
    () => albums.reduce((total, album) => total + album.count, 0),
    [albums],
  );

  const images = useMemo(() => {
    if (activeAlbum === allAlbums) {
      return albums.flatMap((album) => album.images);
    }

    return albums.find((album) => album.slug === activeAlbum)?.images ?? [];
  }, [activeAlbum, albums]);

  const activeIndex = useMemo(() => {
    if (!activeImageId) {
      return -1;
    }

    return images.findIndex((image) => image.id === activeImageId);
  }, [activeImageId, images]);

  useEffect(() => {
    if (activeAlbum === allAlbums) {
      return;
    }

    if (!albums.some((album) => album.slug === activeAlbum)) {
      setActiveAlbum(allAlbums);
    }
  }, [activeAlbum, albums]);

  const openImage = useCallback((image: GalleryImage) => {
    setActiveImageId(image.id);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveImageId(null);
  }, []);

  const navigateLightbox = useCallback(
    (direction: -1 | 1) => {
      setActiveImageId((currentId) => {
        if (images.length === 0) {
          return null;
        }

        const currentIndex = currentId
          ? images.findIndex((image) => image.id === currentId)
          : 0;
        const safeIndex = currentIndex >= 0 ? currentIndex : 0;
        const nextIndex = (safeIndex + direction + images.length) % images.length;

        return images[nextIndex].id;
      });
    },
    [images],
  );

  if (totalCount === 0) {
    return <GalleryEmptyState />;
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ajGreen">
              <HighlightText text="Galerie AJRRADY" />
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ajPurple sm:text-4xl">
              Activités en images
            </h2>
          </div>
          <p className="text-sm font-bold text-slate-500">
            {images.length} / {totalCount} photos
          </p>
        </div>

        <AlbumFilter
          albums={albums}
          activeAlbum={activeAlbum}
          totalCount={totalCount}
          onAlbumChange={(album) => {
            setActiveAlbum(album);
            setActiveImageId(null);
          }}
        />

        <GalleryGrid images={images} onImageSelect={openImage} />
      </div>

      <Lightbox
        images={images}
        activeIndex={activeIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </section>
  );
}

function GalleryEmptyState() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-[min(900px,calc(100%-32px))] rounded-2xl border border-dashed border-ajPurple/30 bg-[#F8F6FC] p-8 text-center shadow-lg transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0 sm:p-10">
        <ImageIcon aria-hidden="true" className="mx-auto h-12 w-12 text-ajGreen" />
        <h2 className="mt-4 text-2xl font-black text-ajPurple">
          Photos officielles bientôt disponibles
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
          <HighlightText text={"\"La galerie sera régulièrement mise à jour avec les activités d'AJRRADY.\""} />
        </p>
      </div>
    </section>
  );
}
