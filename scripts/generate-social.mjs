import { mkdir, writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import path from "node:path";
import sharp from "sharp";
import { loadInsights } from "./lib/insights.mjs";

const args = process.argv.slice(2);
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};
const requestedId = valueAfter("--id");
const requestedOut = valueAfter("--out");
const root = process.cwd();
const outRoot = path.resolve(root, requestedOut ?? "social/generated");
const data = await loadInsights(root);
const published = data.items.filter((item) => item.status === "published");
const items = requestedId ? published.filter((item) => item.id === requestedId) : published;

if (!items.length) throw new Error(requestedId ? `No published insight found for '${requestedId}'.` : "No published insights found.");

const palette = {
  forest: "#233c2c",
  forest2: "#38553f",
  bone: "#f4f4ee",
  ink: "#1f2721",
  muted: "#667067",
  amber: "#d9a057",
  amberDeep: "#9c5f1e",
  line: "#d9dcce",
  fern: "#dfe7d8",
};

function escapeXml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function wrap(value, maxCharacters, maxLines = 8) {
  const words = String(value).trim().split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxCharacters || !current) current = next;
    else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;
  const clipped = lines.slice(0, maxLines);
  clipped[maxLines - 1] = `${clipped[maxLines - 1].replace(/[.,;:]?$/, "")}...`;
  return clipped;
}

function linesSvg(lines, { x, y, size, lineHeight, color, weight = 700 }) {
  return `<text x="${x}" y="${y}" fill="${color}" font-family="Avenir Next, Helvetica, Arial, sans-serif" font-size="${size}" font-weight="${weight}">${lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("")}</text>`;
}

function wordmark(x, y, color, accent, scale = 1) {
  return `
    <text x="${x}" y="${y}" fill="${color}" font-family="Avenir Next, Helvetica, Arial, sans-serif" font-size="${44 * scale}" font-weight="800" letter-spacing="-1">Mend</text>
    <polyline points="${x},${y + 14 * scale} ${x + 22 * scale},${y + 7 * scale} ${x + 44 * scale},${y + 14 * scale} ${x + 66 * scale},${y + 7 * scale} ${x + 88 * scale},${y + 14 * scale}" fill="none" stroke="${accent}" stroke-width="${4 * scale}" stroke-linecap="round" stroke-linejoin="round" />`;
}

function renderSlide(item, slide, width, height) {
  const story = height / width > 1.5;
  const margin = story ? 86 : 82;
  const titleSize = story ? 80 : 72;
  const bodySize = story ? 39 : 34;
  const titleChars = story ? 21 : 25;
  const bodyChars = story ? 34 : 40;
  const titleY = story ? 480 : 390;
  const titleLine = story ? 92 : 82;
  const bodyLine = story ? 56 : 49;
  const fields = slide === 1
    ? { kicker: item.eyebrow, title: item.social.coverTitle, body: item.social.coverBody, dark: true }
    : slide === 2
      ? { kicker: "What the research means", title: item.social.explainTitle, body: item.social.explainBody, dark: false }
      : { kicker: "Practice, not perfection", title: item.social.practiceTitle, body: item.social.practiceBody, dark: true };
  const bg = fields.dark ? palette.forest : palette.bone;
  const titleColor = fields.dark ? palette.bone : palette.ink;
  const bodyColor = fields.dark ? "#d9dfd5" : palette.muted;
  const accent = slide === 3 ? palette.amber : fields.dark ? "#e9c98f" : palette.amberDeep;
  const titleLines = wrap(fields.title, titleChars, 5);
  const bodyY = titleY + titleLines.length * titleLine + (story ? 58 : 42);
  const bodyLines = wrap(fields.body, bodyChars, story ? 7 : 6);
  const source = `${item.source.journal} · ${item.source.year}`;

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${bg}" />
    <circle cx="${width - 40}" cy="120" r="240" fill="${fields.dark ? "#ffffff" : palette.forest}" opacity="0.055" />
    <circle cx="80" cy="${height - 40}" r="280" fill="${fields.dark ? "#000000" : palette.amber}" opacity="0.055" />
    ${wordmark(margin, story ? 130 : 110, titleColor, accent, story ? 1.18 : 1)}
    <text x="${margin}" y="${story ? 350 : 285}" fill="${accent}" font-family="Avenir Next, Helvetica, Arial, sans-serif" font-size="${story ? 25 : 22}" font-weight="700" letter-spacing="4">${escapeXml(fields.kicker.toUpperCase())}</text>
    ${linesSvg(titleLines, { x: margin, y: titleY, size: titleSize, lineHeight: titleLine, color: titleColor, weight: 800 })}
    ${linesSvg(bodyLines, { x: margin, y: bodyY, size: bodySize, lineHeight: bodyLine, color: bodyColor, weight: 500 })}
    <line x1="${margin}" y1="${height - (story ? 245 : 190)}" x2="${width - margin}" y2="${height - (story ? 245 : 190)}" stroke="${fields.dark ? "#ffffff" : palette.line}" opacity="${fields.dark ? 0.18 : 1}" />
    <text x="${margin}" y="${height - (story ? 175 : 125)}" fill="${accent}" font-family="Avenir Next, Helvetica, Arial, sans-serif" font-size="${story ? 25 : 21}" font-weight="700">${escapeXml(slide === 3 ? "TRY IT TOGETHER IN MEND" : source.toUpperCase())}</text>
    <text x="${width - margin}" y="${height - (story ? 175 : 125)}" text-anchor="end" fill="${bodyColor}" font-family="Avenir Next, Helvetica, Arial, sans-serif" font-size="${story ? 23 : 20}" font-weight="600">${slide} / 3</text>
  </svg>`;
}

async function generate(item) {
  const directory = path.join(outRoot, item.id);
  await mkdir(directory, { recursive: true });
  const files = [];
  for (const format of [
    { name: "instagram", width: 1080, height: 1350 },
    { name: "story", width: 1080, height: 1920 },
  ]) {
    for (let slide = 1; slide <= 3; slide += 1) {
      const file = `${format.name}-${String(slide).padStart(2, "0")}.png`;
      await sharp(Buffer.from(renderSlide(item, slide, format.width, format.height))).png({ quality: 96 }).toFile(path.join(directory, file));
      files.push(file);
    }
  }
  const caption = `${item.social.caption}\n\nSource: ${item.source.authors}, ${item.source.journal} (${item.source.year})\n${item.source.url}\n\n${item.social.hashtags.map((tag) => `#${tag}`).join(" ")}\n`;
  await writeFile(path.join(directory, "caption.txt"), caption);
  await writeFile(path.join(directory, "alt-text.txt"), `${item.social.altText}\n`);
  await writeFile(path.join(directory, "manifest.json"), `${JSON.stringify({ id: item.id, publishedAt: item.publishedAt, source: item.source, files }, null, 2)}\n`);
  return { id: item.id, directory, files: files.length };
}

const generated = [];
for (const item of items) generated.push(await generate(item));
console.log(`Generated ${generated.length} Mend social package${generated.length === 1 ? "" : "s"} in ${outRoot}`);
for (const item of generated) console.log(`- ${item.id}: ${item.files} images + caption + alt text + manifest`);
