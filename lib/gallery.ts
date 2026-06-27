import fs from "fs/promises";
import path from "path";
import type { GalleryAlbum, GalleryImage } from "@/types/gallery";

type Dimensions = {
  width: number;
  height: number;
};

type DateInfo = {
  label: string;
  time: number;
};

type GalleryImageRecord = GalleryImage & {
  fileName: string;
  takenAt?: number;
};

const publicDir = path.join(process.cwd(), "public");
const galleryDir = path.join(publicDir, "gallery");
const fallbackAssetsDir = path.join(publicDir, "assets");

const supportedImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
]);

const preferredAlbumOrder = ["reunions", "fec-sy-2026", "actions", "evenements"];

const albumTitleMap: Record<string, string> = {
  reunions: "Réunions",
  "fec-sy-2026": "FEC-SY 2026",
  actions: "Actions",
  evenements: "Événements",
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const collator = new Intl.Collator("fr-FR", {
  numeric: true,
  sensitivity: "base",
});

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAzMiAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB4Mj0iMSIgeTE9IjAiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjRjhGNkZDIi8+PHN0b3Agb2Zmc2V0PSIwLjU1IiBzdG9wLWNvbG9yPSIjRURFNUY1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRTlGN0VGIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNnKSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjI0Ii8+PC9zdmc+";

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const root = await resolveGalleryRoot();

  if (!root) {
    return [];
  }

  const entries = await readDirectory(root);
  const rootImageFiles = entries
    .filter((entry) => entry.isFile() && isSupportedImage(entry.name))
    .map((entry) => path.join(root, entry.name));

  const folderEntries = entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .sort((a, b) => compareAlbumNames(a.name, b.name));

  const albums: GalleryAlbum[] = [];

  if (rootImageFiles.length > 0) {
    const album = await createAlbum(
      "photos-officielles",
      "Photos officielles",
      rootImageFiles,
    );

    if (album.count > 0) {
      albums.push(album);
    }
  }

  const discoveredAlbums = await Promise.all(
    folderEntries.map(async (entry) => {
      const folderPath = path.join(root, entry.name);
      const files = await findImageFiles(folderPath);
      const slug = slugify(entry.name);
      return createAlbum(slug, getAlbumTitle(entry.name), files);
    }),
  );

  albums.push(...discoveredAlbums.filter((album) => album.count > 0));

  return albums.sort((a, b) => compareAlbumNames(a.slug, b.slug));
}

async function resolveGalleryRoot() {
  if (await directoryExists(galleryDir)) {
    return galleryDir;
  }

  if (await directoryExists(fallbackAssetsDir)) {
    return fallbackAssetsDir;
  }

  return null;
}

async function directoryExists(directoryPath: string) {
  try {
    const stat = await fs.stat(directoryPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

async function readDirectory(directoryPath: string) {
  try {
    return await fs.readdir(directoryPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function findImageFiles(directoryPath: string): Promise<string[]> {
  const entries = await readDirectory(directoryPath);
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory() && !entry.name.startsWith(".")) {
        return findImageFiles(entryPath);
      }

      if (entry.isFile() && isSupportedImage(entry.name)) {
        return [entryPath];
      }

      return [];
    }),
  );

  return files.flat().sort((a, b) => collator.compare(a, b));
}

async function createAlbum(
  slug: string,
  title: string,
  files: string[],
): Promise<GalleryAlbum> {
  const records = await Promise.all(
    files.map((filePath) => createImageRecord(filePath, slug, title)),
  );

  const images = records
    .filter(isDefined)
    .sort(compareImages)
    .map(({ fileName, takenAt, ...image }) => image);

  return {
    slug,
    title,
    count: images.length,
    images,
  };
}

async function createImageRecord(
  filePath: string,
  album: string,
  albumTitle: string,
): Promise<GalleryImageRecord | null> {
  const dimensions = await getImageDimensions(filePath);

  if (!dimensions) {
    return null;
  }

  const fileName = path.basename(filePath);
  const publicPath = toPublicPath(filePath);
  const title = getImageTitle(fileName);
  const dateInfo = getDateFromFileName(fileName);

  return {
    id: path.relative(publicDir, filePath).replaceAll(path.sep, "/"),
    src: publicPath,
    alt: title ? `${title} - ${albumTitle}` : `Photo officielle AJRRADY - ${albumTitle}`,
    width: dimensions.width,
    height: dimensions.height,
    title,
    date: dateInfo?.label,
    album,
    albumTitle,
    blurDataURL,
    fileName,
    takenAt: dateInfo?.time,
  };
}

async function getImageDimensions(filePath: string): Promise<Dimensions | null> {
  const buffer = await readHeader(filePath);

  if (!buffer) {
    return null;
  }

  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".png") {
    return getPngDimensions(buffer);
  }

  if (extension === ".gif") {
    return getGifDimensions(buffer);
  }

  if (extension === ".webp") {
    return getWebpDimensions(buffer);
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return getJpegDimensions(buffer);
  }

  return null;
}

async function readHeader(filePath: string) {
  let handle: fs.FileHandle | undefined;

  try {
    handle = await fs.open(filePath, "r");
    const buffer = Buffer.alloc(1024 * 1024);
    const result = await handle.read(buffer, 0, buffer.length, 0);
    return buffer.subarray(0, result.bytesRead);
  } catch {
    return null;
  } finally {
    await handle?.close();
  }
}

function getPngDimensions(buffer: Buffer): Dimensions | null {
  if (
    buffer.length < 24 ||
    buffer.toString("ascii", 1, 4) !== "PNG" ||
    buffer.toString("ascii", 12, 16) !== "IHDR"
  ) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function getGifDimensions(buffer: Buffer): Dimensions | null {
  if (buffer.length < 10 || buffer.toString("ascii", 0, 3) !== "GIF") {
    return null;
  }

  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8),
  };
}

function getWebpDimensions(buffer: Buffer): Dimensions | null {
  if (
    buffer.length < 30 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return null;
  }

  const format = buffer.toString("ascii", 12, 16);

  if (format === "VP8X") {
    return {
      width: 1 + readUInt24LE(buffer, 24),
      height: 1 + readUInt24LE(buffer, 27),
    };
  }

  if (format === "VP8 " && buffer.length >= 30) {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }

  if (format === "VP8L" && buffer.length >= 25 && buffer[20] === 0x2f) {
    const b0 = buffer[21];
    const b1 = buffer[22];
    const b2 = buffer[23];
    const b3 = buffer[24];

    return {
      width: 1 + (((b1 & 0x3f) << 8) | b0),
      height: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)),
    };
  }

  return null;
}

function getJpegDimensions(buffer: Buffer): Dimensions | null {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;
  let orientation: number | undefined;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    let marker = buffer[offset + 1];
    offset += 2;

    while (marker === 0xff && offset < buffer.length) {
      marker = buffer[offset];
      offset += 1;
    }

    if (marker === 0xda || marker === 0xd9) {
      break;
    }

    if (marker >= 0xd0 && marker <= 0xd7) {
      continue;
    }

    if (offset + 2 > buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset);
    const segmentStart = offset + 2;
    const segmentEnd = offset + segmentLength;

    if (segmentLength < 2 || segmentEnd > buffer.length) {
      break;
    }

    if (marker === 0xe1 && orientation === undefined) {
      orientation = getExifOrientation(buffer.subarray(segmentStart, segmentEnd));
    }

    if (isStartOfFrame(marker) && segmentStart + 5 < segmentEnd) {
      let width = buffer.readUInt16BE(segmentStart + 3);
      let height = buffer.readUInt16BE(segmentStart + 1);

      if (orientation && orientation >= 5 && orientation <= 8) {
        [width, height] = [height, width];
      }

      return { width, height };
    }

    offset += segmentLength;
  }

  return null;
}

function getExifOrientation(segment: Buffer) {
  if (segment.length < 14 || segment.toString("ascii", 0, 6) !== "Exif\0\0") {
    return undefined;
  }

  const tiffOffset = 6;
  const endian = segment.toString("ascii", tiffOffset, tiffOffset + 2);
  const littleEndian = endian === "II";

  if (!littleEndian && endian !== "MM") {
    return undefined;
  }

  const readUInt16 = (offset: number) =>
    littleEndian ? segment.readUInt16LE(offset) : segment.readUInt16BE(offset);
  const readUInt32 = (offset: number) =>
    littleEndian ? segment.readUInt32LE(offset) : segment.readUInt32BE(offset);

  if (tiffOffset + 8 > segment.length) {
    return undefined;
  }

  const firstIfdOffset = readUInt32(tiffOffset + 4);
  const ifdStart = tiffOffset + firstIfdOffset;

  if (ifdStart + 2 > segment.length) {
    return undefined;
  }

  const entries = readUInt16(ifdStart);

  for (let index = 0; index < entries; index += 1) {
    const entryOffset = ifdStart + 2 + index * 12;

    if (entryOffset + 12 > segment.length) {
      return undefined;
    }

    const tag = readUInt16(entryOffset);

    if (tag === 0x0112) {
      return readUInt16(entryOffset + 8);
    }
  }

  return undefined;
}

function readUInt24LE(buffer: Buffer, offset: number) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function isStartOfFrame(marker: number) {
  return (
    (marker >= 0xc0 && marker <= 0xc3) ||
    (marker >= 0xc5 && marker <= 0xc7) ||
    (marker >= 0xc9 && marker <= 0xcb) ||
    (marker >= 0xcd && marker <= 0xcf)
  );
}

function isSupportedImage(fileName: string) {
  return supportedImageExtensions.has(path.extname(fileName).toLowerCase());
}

function toPublicPath(filePath: string) {
  const relativePath = path.relative(publicDir, filePath);
  const encodedPath = relativePath
    .split(path.sep)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/${encodedPath}`;
}

function getAlbumTitle(folderName: string) {
  const slug = slugify(folderName);

  if (albumTitleMap[slug]) {
    return albumTitleMap[slug];
  }

  const cleaned = folderName
    .replace(/^photos[-_\s]*/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\bFEC\s*SY\s*(\d{4})\b/i, "FEC-SY $1")
    .replace(/\bpreparatifs\b/i, "Préparatifs")
    .replace(/\bedition\s*(\d*)\b/i, "Édition $1")
    .replace(/\s+/g, " ")
    .trim();

  return toTitleCase(cleaned || folderName)
    .replace(/\bFec-sy\b/gi, "FEC-SY")
    .replace(/\bAjrrady\b/g, "AJRRADY");
}

function getImageTitle(fileName: string) {
  const baseName = path.parse(fileName).name;
  const cleaned = baseName
    .replace(/\b(copie|copy)\b/gi, "")
    .replace(/[_\-~()[\].]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned || isTechnicalTitle(cleaned)) {
    return undefined;
  }

  return toTitleCase(cleaned).replace(/\bAjrrady\b/g, "AJRRADY");
}

function isTechnicalTitle(value: string) {
  const compact = value.replace(/\s+/g, "").toLowerCase();

  if (/^\d+$/.test(compact)) {
    return true;
  }

  return /^(img|dsc|fbimg|screenshot|wa|ajrrady|ajrrdy)[a-z0-9]*$/.test(compact);
}

function getDateFromFileName(fileName: string): DateInfo | undefined {
  const baseName = path.parse(fileName).name;
  const dateMatch = baseName.match(/(20\d{2})[-_]?([01]\d)[-_]?([0-3]\d)/);

  if (dateMatch) {
    return createDateInfo(
      Number(dateMatch[1]),
      Number(dateMatch[2]),
      Number(dateMatch[3]),
    );
  }

  const timestampMatch = baseName.match(/\b(1[4-9]\d{11}|2\d{12})\b/);

  if (timestampMatch) {
    const timestamp = Number(timestampMatch[1]);
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();

    if (year >= 2015 && year <= 2035) {
      return {
        label: dateFormatter.format(date),
        time: timestamp,
      };
    }
  }

  return undefined;
}

function createDateInfo(year: number, month: number, day: number): DateInfo | undefined {
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return undefined;
  }

  return {
    label: dateFormatter.format(date),
    time: date.getTime(),
  };
}

function compareImages(a: GalleryImageRecord, b: GalleryImageRecord) {
  if (a.takenAt && b.takenAt && a.takenAt !== b.takenAt) {
    return b.takenAt - a.takenAt;
  }

  if (a.takenAt && !b.takenAt) {
    return -1;
  }

  if (!a.takenAt && b.takenAt) {
    return 1;
  }

  return collator.compare(a.fileName, b.fileName);
}

function compareAlbumNames(a: string, b: string) {
  const aIndex = preferredAlbumOrder.indexOf(slugify(a));
  const bIndex = preferredAlbumOrder.indexOf(slugify(b));

  if (aIndex !== -1 || bIndex !== -1) {
    return (
      (aIndex === -1 ? preferredAlbumOrder.length : aIndex) -
      (bIndex === -1 ? preferredAlbumOrder.length : bIndex)
    );
  }

  return collator.compare(a, b);
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitleCase(value: string) {
  return value
    .toLocaleLowerCase("fr-FR")
    .replace(/(^|\s|')\S/g, (letter) => letter.toLocaleUpperCase("fr-FR"));
}

function isDefined<T>(value: T | null): value is T {
  return value !== null;
}
