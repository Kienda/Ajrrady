"use client";

import type { GalleryAlbum } from "@/types/gallery";

type AlbumFilterProps = {
  albums: GalleryAlbum[];
  activeAlbum: string;
  totalCount: number;
  onAlbumChange: (album: string) => void;
};

export function AlbumFilter({
  albums,
  activeAlbum,
  totalCount,
  onAlbumChange,
}: AlbumFilterProps) {
  if (albums.length <= 1) {
    return null;
  }

  const options = [
    { slug: "all", title: "Toutes", count: totalCount },
    ...albums.map((album) => ({
      slug: album.slug,
      title: album.title,
      count: album.count,
    })),
  ];

  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div
        className="inline-flex min-w-full gap-2 rounded-2xl border border-ajPurple/10 bg-[#F8F6FC] p-2 shadow-sm sm:min-w-0"
        role="tablist"
        aria-label="Albums"
      >
        {options.map((option) => {
          const active = activeAlbum === option.slug;

          return (
            <button
              key={option.slug}
              type="button"
              role="tab"
              aria-selected={active}
              className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition-[background-color,color,box-shadow,transform] duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ajGreen motion-reduce:hover:translate-y-0 ${
                active
                  ? "bg-ajPurple text-white shadow-lg"
                  : "bg-white text-ajPurple hover:bg-white/80 hover:text-ajGreen"
              }`}
              onClick={() => onAlbumChange(option.slug)}
            >
              <span>{option.title}</span>
              <span className={active ? "ml-2 text-white/75" : "ml-2 text-slate-500"}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
