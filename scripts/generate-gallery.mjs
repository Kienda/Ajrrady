import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

const publicDir = path.join(process.cwd(), "public");
const sourceDir = path.join(publicDir, "assets");
const outputDir = path.join(publicDir, "gallery");
const outputDataFile = path.join(process.cwd(), "data", "gallery.json");

const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);
const targetMaxBytes = 390 * 1024;
const preferredAlbumOrder = ["reunions", "fec-sy-2026", "actions", "evenements"];
const albumTitleMap = new Map([
  ["reunions", "Réunions"],
  ["fec-sy-2026", "FEC-SY 2026"],
  ["actions", "Actions"],
  ["evenements", "Événements"],
]);

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

async function main() {
  if (!(await directoryExists(sourceDir))) {
    throw new Error(`Missing source directory: ${sourceDir}`);
  }

  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  const sourceAlbums = await getSourceAlbums();
  const albums = [];
  const skipped = [];

  for (const sourceAlbum of sourceAlbums) {
    const images = [];
    const albumOutputDir = path.join(outputDir, sourceAlbum.slug);
    await fs.mkdir(albumOutputDir, { recursive: true });

    for (const filePath of sourceAlbum.files) {
      try {
        const image = await convertImage(filePath, sourceAlbum, albumOutputDir);
        images.push(image);
      } catch (error) {
        skipped.push({
          file: path.relative(process.cwd(), filePath).replaceAll(path.sep, "/"),
          reason: error instanceof Error ? error.message : String(error),
        });
      }
    }

    images.sort(compareImages);

    if (images.length > 0) {
      albums.push({
        slug: sourceAlbum.slug,
        title: sourceAlbum.title,
        count: images.length,
        images: images.map(({ fileName, takenAt, ...image }) => image),
      });
    }
  }

  albums.sort((a, b) => compareAlbumNames(a.slug, b.slug));

  await fs.writeFile(`${outputDataFile}.tmp`, `${JSON.stringify(albums, null, 2)}\n`);
  await fs.rename(`${outputDataFile}.tmp`, outputDataFile);

  const stats = await collectOutputStats();
  console.log(`Generated ${stats.count} WebP images in ${path.relative(process.cwd(), outputDir)}`);
  console.log(`Gallery payload written to ${path.relative(process.cwd(), outputDataFile)}`);
  console.log(`Largest image: ${formatBytes(stats.maxBytes)}; total gallery size: ${formatBytes(stats.totalBytes)}`);

  if (skipped.length > 0) {
    console.warn(`Skipped ${skipped.length} source files:`);
    for (const item of skipped) {
      console.warn(`- ${item.file}: ${item.reason}`);
    }
  }
}

async function getSourceAlbums() {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const rootFiles = entries
    .filter((entry) => entry.isFile() && isSupportedImage(entry.name))
    .map((entry) => path.join(sourceDir, entry.name));

  const albums = [];

  if (rootFiles.length > 0) {
    albums.push({
      slug: "photos-officielles",
      title: "Photos officielles",
      files: rootFiles.sort((a, b) => collator.compare(a, b)),
    });
  }

  const folders = entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .sort((a, b) => compareAlbumNames(a.name, b.name));

  for (const folder of folders) {
    const folderPath = path.join(sourceDir, folder.name);
    const files = await findImageFiles(folderPath);

    if (files.length === 0) {
      continue;
    }

    albums.push({
      slug: getAlbumSlug(folder.name),
      title: getAlbumTitle(folder.name),
      files,
    });
  }

  return albums;
}

async function findImageFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const results = await Promise.all(
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

  return results.flat().sort((a, b) => collator.compare(a, b));
}

async function convertImage(filePath, album, albumOutputDir) {
  const hash = crypto
    .createHash("sha1")
    .update(path.relative(sourceDir, filePath))
    .digest("hex")
    .slice(0, 8);
  const baseName = slugify(path.parse(filePath).name) || hash;
  const fileName = `${baseName}-${hash}.webp`;
  const outputPath = path.join(albumOutputDir, fileName);

  let maxWidth = 1200;
  let quality = 78;
  let outputBuffer;
  let metadata;

  while (maxWidth >= 800) {
    while (quality >= 36) {
      const pipeline = sharp(filePath, { failOn: "none" })
        .rotate()
        .resize({
          width: maxWidth,
          withoutEnlargement: true,
        })
        .webp({
          quality,
          effort: 5,
          smartSubsample: true,
        });

      outputBuffer = await pipeline.toBuffer();
      metadata = await sharp(outputBuffer).metadata();

      if (outputBuffer.length <= targetMaxBytes) {
        break;
      }

      quality -= 6;
    }

    if (outputBuffer && outputBuffer.length <= targetMaxBytes) {
      break;
    }

    maxWidth -= 100;
    quality = 70;
  }

  if (!outputBuffer || !metadata?.width || !metadata?.height) {
    throw new Error("Could not read image dimensions after conversion");
  }

  await fs.writeFile(outputPath, outputBuffer);

  const title = getImageTitle(path.basename(filePath));
  const dateInfo = getDateFromFileName(path.basename(filePath));
  const src = `/${path.relative(publicDir, outputPath).replaceAll(path.sep, "/")}`;

  return {
    id: path.relative(outputDir, outputPath).replaceAll(path.sep, "/"),
    src,
    alt: title ? `${title} - ${album.title}` : `Photo officielle AJRRADY - ${album.title}`,
    width: metadata.width,
    height: metadata.height,
    ...(title ? { title } : {}),
    ...(dateInfo ? { date: dateInfo.label } : {}),
    album: album.slug,
    albumTitle: album.title,
    fileName: path.basename(filePath),
    takenAt: dateInfo?.time,
  };
}

async function collectOutputStats() {
  const files = await findGeneratedWebp(outputDir);
  let totalBytes = 0;
  let maxBytes = 0;

  for (const file of files) {
    const stat = await fs.stat(file);
    totalBytes += stat.size;
    maxBytes = Math.max(maxBytes, stat.size);
  }

  return {
    count: files.length,
    totalBytes,
    maxBytes,
  };
}

async function findGeneratedWebp(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const results = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return findGeneratedWebp(entryPath);
      }

      return entry.isFile() && entry.name.endsWith(".webp") ? [entryPath] : [];
    }),
  );

  return results.flat();
}

async function directoryExists(directoryPath) {
  try {
    const stat = await fs.stat(directoryPath);
    return stat.isDirectory();
  } catch {
    return false;
  }
}

function isSupportedImage(fileName) {
  return supportedExtensions.has(path.extname(fileName).toLowerCase());
}

function getAlbumSlug(folderName) {
  const slug = slugify(folderName);

  if (slug.includes("fec-sy2025") || slug.includes("fec-sy-2025")) {
    return "fec-sy-2025";
  }

  if (slug.includes("fec-sy2026") || slug.includes("fec-sy-2026")) {
    return "fec-sy-2026";
  }

  return slug;
}

function getAlbumTitle(folderName) {
  const slug = getAlbumSlug(folderName);

  if (albumTitleMap.has(slug)) {
    return albumTitleMap.get(slug);
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

function getImageTitle(fileName) {
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

function isTechnicalTitle(value) {
  const compact = value.replace(/\s+/g, "").toLowerCase();

  if (/^\d+$/.test(compact)) {
    return true;
  }

  return /^(img|dsc|fbimg|screenshot|wa|ajrrady|ajrrdy)[a-z0-9]*$/.test(compact);
}

function getDateFromFileName(fileName) {
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

function createDateInfo(year, month, day) {
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

function compareImages(a, b) {
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

function compareAlbumNames(a, b) {
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

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitleCase(value) {
  return value
    .toLocaleLowerCase("fr-FR")
    .replace(/(^|\s|')\S/g, (letter) => letter.toLocaleUpperCase("fr-FR"));
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
