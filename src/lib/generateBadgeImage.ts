import { readFile } from "node:fs/promises";
import { join } from "node:path";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 3) + "..." : text;
}

export async function generateBadgeImage(params: {
  name: string;
  company: string;
  regNo: string;
  qrCodeDataUrl: string;
}): Promise<Buffer> {
  const { name, company, regNo, qrCodeDataUrl } = params;

  const logoBuffer = await readFile(join(process.cwd(), "public/images/logo.jpeg"));
  const logoBase64 = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;

  const displayName = escapeXml(truncate(name, 26));
  const displayCompany = escapeXml(truncate(company || "", 26));
  const displayRegNo = escapeXml(regNo);

  const svg = `<svg width="600" height="820" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

  <!-- Outer background -->
  <rect width="600" height="820" fill="#5ba3f5"/>

  <!-- Top greeting text -->
  <text x="300" y="38" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="Arial, Helvetica, sans-serif">Thank You for Registering!</text>
  <text x="300" y="64" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="13" font-family="Arial, Helvetica, sans-serif">Your badge is attached below.</text>

  <!-- Event banner card -->
  <rect x="20" y="80" width="560" height="330" rx="18" fill="#0a0730"/>
  <rect x="20" y="80" width="560" height="330" rx="18" fill="url(#bannerGrad)"/>
  <defs>
    <linearGradient id="bannerGrad" x1="0" y1="0" x2="600" y2="410" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0a0730"/>
      <stop offset="60%" stop-color="#1a1464"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>

  <!-- Logo circle background -->
  <circle cx="300" cy="165" r="70" fill="white" opacity="0.95"/>
  <!-- Logo image -->
  <image x="230" y="95" width="140" height="140" href="${logoBase64}" preserveAspectRatio="xMidYMid meet" clip-path="circle(70px at 70px 70px)"/>
  <!-- Logo border ring -->
  <circle cx="300" cy="165" r="70" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2.5"/>

  <!-- FUSION THE ERA -->
  <text x="300" y="258" text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="Arial, Helvetica, sans-serif" letter-spacing="4">FUSION THE ERA</text>

  <!-- 2026 -->
  <text x="300" y="306" text-anchor="middle" fill="#f0b429" font-size="48" font-weight="bold" font-family="Arial, Helvetica, sans-serif">2026</text>

  <!-- Date pill -->
  <rect x="150" y="318" width="300" height="36" rx="18" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
  <text x="300" y="341" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="Arial, Helvetica, sans-serif">15 · 16 · 17 · 18 August 2026</text>

  <!-- Venue -->
  <text x="300" y="378" text-anchor="middle" fill="rgba(255,255,255,0.65)" font-size="12" font-family="Arial, Helvetica, sans-serif">Bharat Mandapam, Pragati Maidan, New Delhi</text>

  <!-- White visitor info card -->
  <rect x="20" y="428" width="560" height="220" rx="18" fill="white"/>

  <!-- QR Code -->
  <image x="36" y="444" width="180" height="180" href="${qrCodeDataUrl}"/>

  <!-- Visitor details -->
  <text x="234" y="492" fill="#1a1a2e" font-size="20" font-weight="bold" font-family="Arial, Helvetica, sans-serif">${displayName}</text>
  <text x="234" y="522" fill="#374151" font-size="14" font-family="Arial, Helvetica, sans-serif">${displayCompany}</text>
  <text x="234" y="548" fill="#9ca3af" font-size="12" font-family="Arial, Helvetica, sans-serif">${displayRegNo}</text>

  <!-- VISITOR banner -->
  <rect x="20" y="664" width="560" height="68" rx="16" fill="#4a90e2"/>
  <text x="300" y="708" text-anchor="middle" fill="white" font-size="32" font-weight="bold" letter-spacing="10" font-family="Arial, Helvetica, sans-serif">VISITOR</text>
</svg>`;

  // Use sharp for SVG → PNG conversion
  const sharp = (await import("sharp")).default;
  return await sharp(Buffer.from(svg), { density: 150 }).png().toBuffer();
}
