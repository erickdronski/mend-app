/**
 * Generates Mend's app icons from an SVG wordmark: moss field, bone "M",
 * ember dot. Outputs the icon set app.json references.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const MOSS = "#38553f";
const BONE = "#f4f4ee";
const EMBER = "#d9a057";

const mark = (bg, pad = 0) => `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  ${bg ? `<rect width="1024" height="1024" fill="${MOSS}"/>` : ""}
  <text x="472" y="${640 + pad}" font-family="Georgia, 'Times New Roman', serif" font-weight="700"
        font-size="560" fill="${BONE}" text-anchor="middle">M</text>
  <circle cx="768" cy="608" r="56" fill="${EMBER}"/>
</svg>`;

mkdirSync("assets/images", { recursive: true });

await sharp(Buffer.from(mark(true))).resize(1024, 1024).png().toFile("assets/images/icon.png");
await sharp(Buffer.from(mark(false)))
  .resize(1024, 1024)
  .png()
  .toFile("assets/images/android-icon-foreground.png");
await sharp(Buffer.from(mark(false))).resize(512, 512).png().toFile("assets/images/splash-icon.png");
await sharp(Buffer.from(mark(true))).resize(48, 48).png().toFile("assets/images/favicon.png");

console.log("icons written");
