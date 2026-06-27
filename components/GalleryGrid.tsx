"use client";

import { GalleryCard } from "@/components/GalleryCard";
import type { GalleryImage } from "@/types/gallery";

type GalleryGridProps = {
  images: GalleryImage[];
  onImageSelect: (image: GalleryImage) => void;
};

export function GalleryGrid({ images, onImageSelect }: GalleryGridProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {images.map((image, index) => (
        <GalleryCard
          key={image.id}
          image={image}
          priority={index < 6}
          onOpen={onImageSelect}
        />
      ))}
    </div>
  );
}
