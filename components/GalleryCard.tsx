"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();
  const hasDetails = Boolean(image.title || image.date);

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease }}
      className="mb-4 break-inside-avoid"
    >
      <button
        type="button"
        className="group block w-full overflow-hidden rounded-2xl bg-white text-left shadow-lg ring-1 ring-slate-100 transition-[box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ajGreen motion-reduce:hover:translate-y-0"
        onClick={() => onOpen(image)}
      >
        <span className="relative block overflow-hidden bg-[#F8F6FC]">
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
            className="h-auto w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.08]"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {hasDetails ? (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 px-4 pb-4 pt-10 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0">
              {image.title ? (
                <span className="block text-sm font-extrabold leading-snug text-white">
                  {image.title}
                </span>
              ) : null}
              {image.date ? (
                <span className="mt-1 block text-xs font-bold text-white/80">
                  {image.date}
                </span>
              ) : null}
            </span>
          ) : null}
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
