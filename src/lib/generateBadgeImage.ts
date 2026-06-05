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

  const svg = `<svg width="600" height="800" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Outer background -->
  <rect width="600" height="800" fill="#5ba3f5"/>

  <!-- Top text -->
  <text x="300" y="36" text-anchor="middle" fill="white" font-size="15" font-family="Arial, Helvetica, sans-serif">Thank You for Registering!</text>
  <text x="300" y="62" text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="Arial, Helvetica, sans-serif" letter-spacing="2">Visitor Registration</text>

  <!-- Header dark card -->
  <rect x="16" y="78" width="568" height="360" rx="16" fill="#0e1655"/>

  <!-- Logo -->
  <image x="110" y="100" width="380" height="110" href="${logoBase64}" preserveAspectRatio="xMidYMid meet"/>

  <!-- FUSION THE ERA -->
  <text x="300" y="265" text-anchor="middle" fill="white" font-size="26" font-weight="bold" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">FUSION THE ERA</text>

  <!-- 2026 -->
  <text x="300" y="312" text-anchor="middle" fill="#f59e0b" font-size="44" font-weight="bold" font-family="Arial, Helvetica, sans-serif">2026</text>

  <!-- Date pill -->
  <rect x="130" y="326" width="340" height="44" rx="22" fill="rgba(255,255,255,0.15)"/>
  <text x="300" y="354" text-anchor="middle" fill="white" font-size="17" font-family="Arial, Helvetica, sans-serif">4 · 5 · 6 · 7 July 2026</text>

  <!-- Venue -->
  <text x="300" y="408" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-size="13" font-family="Arial, Helvetica, sans-serif">Bharat Mandapam, Pragati Maidan, New Delhi</text>

  <!-- White QR card -->
  <rect x="16" y="458" width="568" height="246" rx="16" fill="white"/>

  <!-- QR Code -->
  <image x="30" y="472" width="190" height="190" href="${qrCodeDataUrl}"/>

  <!-- Visitor details -->
  <text x="240" y="520" fill="#1a1560" font-size="19" font-weight="bold" font-family="Arial, Helvetica, sans-serif">${displayName}</text>
  <text x="240" y="552" fill="#6b7280" font-size="14" font-family="Arial, Helvetica, sans-serif">${displayCompany}</text>
  <text x="240" y="582" fill="#9ca3af" font-size="13" font-family="Arial, Helvetica, sans-serif">${displayRegNo}</text>

  <!-- VISITOR banner -->
  <rect x="16" y="722" width="568" height="62" rx="16" fill="#4a90e2"/>
  <text x="300" y="763" text-anchor="middle" fill="white" font-size="30" font-weight="bold" letter-spacing="8" font-family="Arial, Helvetica, sans-serif">VISITOR</text>
</svg>`;

  // Use sharp for SVG → PNG conversion
  const sharp = (await import("sharp")).default;
  return await sharp(Buffer.from(svg)).png().toBuffer();
}
