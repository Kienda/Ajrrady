"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryImage } from "@/types/gallery";

type GalleryCardProps = {
  image: GalleryImage;
  priority: boolean;
  onOpen: (image: GalleryImage) => void;
};

const ease = [0.22, 1, 0.36, 1] as const;
const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAzMiAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjRjhGNkZDIi8+PHN0b3Agb2Zmc2V0PSIwLjU1IiBzdG9wLWNvbG9yPSIjRURFNUY1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRTlGN0VGIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNnKSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjI0Ii8+PC9zdmc+";

export function GalleryCard({ image, priority, onOpen }: GalleryCardProps) {
  const hasDetails = Boolean(image.title || image.date);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease }}
      className="mb-4 break-inside-avoid"
    >
      <button
        type="button"
        className="group block w-full overflow-hidden rounded-2xl bg-white text-left shadow-lg ring-1 ring-slate-100 transition-shadow duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ajGreen"
        onClick={() => onOpen(image)}
      >
        <span className="block overflow-hidden bg-[#F8F6FC]">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={image.blurDataURL ?? blurDataURL}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </span>

        {hasDetails ? (
          <span className="block px-4 py-3">
            {image.title ? (
              <span className="block text-sm font-bold leading-snug text-ajPurple">
                {image.title}
              </span>
            ) : null}
            {image.date ? (
              <span className="mt-1 block text-xs font-semibold text-slate-500">
                {image.date}
              </span>
            ) : null}
          </span>
        ) : null}
      </button>
    </motion.article>
  );
}
