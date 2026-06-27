"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import type { GalleryImage } from "@/types/gallery";

type LightboxProps = {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (direction: -1 | 1) => void;
};

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const image = activeIndex >= 0 ? images[activeIndex] : undefined;
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!image) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        onNavigate(-1);
      }

      if (event.key === "ArrowRight" && hasMultipleImages) {
        onNavigate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasMultipleImages, image, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/85 text-white backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Photo agrandie"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div
            className="relative flex h-full min-h-0 flex-col px-4 py-4 sm:px-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold shadow-lg ring-1 ring-white/15">
                {activeIndex + 1} / {images.length}
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white shadow-lg ring-1 ring-white/15 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Fermer"
                onClick={onClose}
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mt-4 min-h-0 flex-1">
              {hasMultipleImages ? (
                <button
                  type="button"
                  className="absolute left-0 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-lg ring-1 ring-white/15 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-2"
                  aria-label="Image précédente"
                  onClick={() => onNavigate(-1)}
                >
                  <ChevronLeft aria-hidden="true" className="h-7 w-7" />
                </button>
              ) : null}

              <motion.div
                key={image.id}
                className="relative mx-auto h-full w-full max-w-7xl"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  className="object-contain"
                />
              </motion.div>

              {hasMultipleImages ? (
                <button
                  type="button"
                  className="absolute right-0 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-lg ring-1 ring-white/15 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-2"
                  aria-label="Image suivante"
                  onClick={() => onNavigate(1)}
                >
                  <ChevronRight aria-hidden="true" className="h-7 w-7" />
                </button>
              ) : null}
            </div>

            {image.title || image.date ? (
              <div className="mx-auto mt-4 max-w-4xl text-center">
                {image.title ? (
                  <p className="text-base font-bold leading-snug">{image.title}</p>
                ) : null}
                {image.date ? (
                  <p className="mt-1 text-sm font-semibold text-white/70">{image.date}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
