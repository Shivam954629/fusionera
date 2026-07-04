import { readFile } from "node:fs/promises";
import { join } from "node:path";

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

  // Fonts are passed to Satori explicitly, because the production server has
  // no system fonts installed — without this, text renders as blank boxes.
  const [robotoBold, robotoBlack] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Roboto-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Roboto-Black.ttf")),
  ]);

  const displayName = truncate(name, 26);
  const displayCompany = truncate(company || "", 26);

  const { default: satori } = await import("satori");
  const { Resvg } = await import("@resvg/resvg-js");

  const element = {
    type: "div",
    props: {
      style: { display: "flex", flexDirection: "column", width: "600px", height: "820px", background: "#5ba3f5", fontFamily: "Roboto" },
      children: [
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 0 10px" },
            children: [
              { type: "span", props: { style: { color: "white", fontSize: 18, fontWeight: 700 }, children: "Thank You for Registering!" } },
              { type: "span", props: { style: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 6 }, children: "Your badge is attached below." } },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", alignItems: "center", margin: "0 20px", padding: "24px 20px", borderRadius: "18px", background: "linear-gradient(160deg, #0a0730 0%, #1a1464 60%, #1e3a8a 100%)" },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", width: "140px", height: "140px", borderRadius: "70px", background: "white", alignItems: "center", justifyContent: "center", marginBottom: "12px" },
                  children: [{ type: "img", props: { src: logoBase64, width: 120, height: 30 } }],
                },
              },
              { type: "span", props: { style: { color: "white", fontSize: 22, fontWeight: 700, letterSpacing: 4 }, children: "FUSION THE ERA" } },
              { type: "span", props: { style: { color: "#f0b429", fontSize: 44, fontWeight: 900, marginTop: 4 }, children: "2026" } },
              {
                type: "div",
                props: {
                  style: { display: "flex", marginTop: 14, padding: "8px 22px", borderRadius: "18px", background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.25)" },
                  children: [{ type: "span", props: { style: { color: "white", fontSize: 14, fontWeight: 700 }, children: "15 · 16 · 17 · 18 August 2026" } }],
                },
              },
              { type: "span", props: { style: { color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 10 }, children: "Bharat Mandapam, Pragati Maidan, New Delhi" } },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "row", alignItems: "center", margin: "20px 20px 0", padding: "22px", borderRadius: "18px", background: "white" },
            children: [
              { type: "img", props: { src: qrCodeDataUrl, width: 180, height: 180, style: { borderRadius: "10px", border: "2px solid #e5e7eb" } } },
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column", marginLeft: "24px" },
                  children: [
                    { type: "span", props: { style: { color: "#1a1a2e", fontSize: 20, fontWeight: 700 }, children: displayName } },
                    { type: "span", props: { style: { color: "#374151", fontSize: 14, marginTop: 8 }, children: displayCompany } },
                    { type: "span", props: { style: { color: "#9ca3af", fontSize: 12, marginTop: 6 }, children: regNo } },
                    { type: "div", props: { style: { display: "flex", width: "310px", height: "1px", background: "#eef0f5", margin: "12px 0" } } },
                    { type: "span", props: { style: { color: "#1e3a8a", fontSize: 12, fontWeight: 700 }, children: "SCAN AT ENTRY GATE" } },
                    { type: "span", props: { style: { color: "#9ca3af", fontSize: 11, marginTop: 4 }, children: "Valid for all 4 event days" } },
                  ],
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", justifyContent: "center", margin: "20px 20px 0", height: "68px", borderRadius: "16px", background: "#1e3a8a" },
            children: [{ type: "span", props: { style: { color: "white", fontSize: 32, fontWeight: 700, letterSpacing: 10 }, children: "VISITOR" } }],
          },
        },
      ],
    },
  };

  const svg = await satori(element as never, {
    width: 600,
    height: 820,
    fonts: [
      { name: "Roboto", data: robotoBold, weight: 700, style: "normal" },
      { name: "Roboto", data: robotoBlack, weight: 900, style: "normal" },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 600 } });
  return Buffer.from(resvg.render().asPng());
}
