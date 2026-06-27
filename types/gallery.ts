export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  date?: string;
  album: string;
  albumTitle: string;
  blurDataURL?: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  count: number;
  images: GalleryImage[];
};
