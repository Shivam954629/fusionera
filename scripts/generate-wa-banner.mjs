import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const logoBuffer = await readFile(join(root, "public/images/logo.jpeg"));
const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0a0730"/>
      <stop offset="60%" stop-color="#1a1464"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
    <clipPath id="logoClip">
      <circle cx="600" cy="200" r="130"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Logo circle white bg -->
  <circle cx="600" cy="200" r="132" fill="white" opacity="0.95"/>
  <!-- Logo image -->
  <image x="470" y="70" width="260" height="260" href="${logoBase64}" preserveAspectRatio="xMidYMid meet" clip-path="url(#logoClip)"/>
  <!-- Logo border ring -->
  <circle cx="600" cy="200" r="132" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3"/>

  <!-- FUSION THE ERA -->
  <text x="600" y="378" text-anchor="middle" fill="white" font-size="52" font-weight="bold" font-family="Arial, Helvetica, sans-serif" letter-spacing="8">FUSION THE ERA</text>

  <!-- 2026 -->
  <text x="600" y="450" text-anchor="middle" fill="#f0b429" font-size="72" font-weight="bold" font-family="Arial, Helvetica, sans-serif">2026</text>

  <!-- Date pill -->
  <rect x="375" y="468" width="450" height="52" rx="26" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
  <text x="600" y="501" text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="Arial, Helvetica, sans-serif">4 · 5 · 6 · 7 July 2026</text>

  <!-- Venue -->
  <text x="600" y="568" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="18" font-family="Arial, Helvetica, sans-serif">Bharat Mandapam, Pragati Maidan, New Delhi</text>
</svg>`;

const sharp = (await import("sharp")).default;
const png = await sharp(Buffer.from(svg), { density: 150 }).png().toBuffer();
await writeFile(join(root, "public/images/wa-banner.png"), png);
console.log("Done! Saved to: public/images/wa-banner.png");
