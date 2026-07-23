/**
 * Generates Mend's app icons from an SVG mark: moss field, bone "M", and an
 * ember STITCH running beneath the letter. The stitch is the brand: kintsugi,
 * the repaired seam is the part that glows. (The old mark ended in a period,
 * which the suite's other apps use; Mend now carries its own signature.)
 * Outputs the icon set app.json references.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { Buffer } from "node:buffer";

const MOSS = "#38553f";
const BONE = "#f4f4ee";
const EMBER = "#d9a057";

// A hand-stitch zigzag centered under the letter: seven stitches, rounded.
const STITCH_POINTS = "262,772 332,728 402,772 472,728 542,772 612,728 682,772 752,728";

const mark = (bg) => `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  ${bg ? `<rect width="1024" height="1024" fill="${MOSS}"/>` : ""}
  <text x="507" y="616" font-family="Georgia, 'Times New Roman', serif" font-weight="700"
        font-size="520" fill="${BONE}" text-anchor="middle">M</text>
  <polyline points="${STITCH_POINTS}" fill="none" stroke="${EMBER}"
            stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
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
