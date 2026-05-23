"use client";

import { useEffect, useState } from "react";

interface Brand {
  id: number | string;
  name: string;
  logo_url: string;
  is_published: boolean;
}

const slogans: Record<string, string> = {
  "Kotop Steel":              "Quality For Life",
  "Shree MS":                 "",
  "Shagun":                   "",
  "India Gold":               "Advanced Cookware",
  "Fusion":                   "",
  "Shagoon":                  "100% Stainless Steel",
  "Saga Steel":               "Exclusive Home Product Range",
  "KHR":                      "Love Cooking - First Cooking!",
  "Jai Baba Ji":              "Stainless Steel",
  "Global Designer Collection": "Designer Collection",
  "Royal Chef":               "",
  "Nagina":                   "Premium Kitchenware",
  "AAA":                      "Total Kitchen Solution",
  "IndiChef":                 "",
  "goodflame":                "",
};

// Brands with dark/coloured backgrounds — skip multiply blend
const darkBgBrands = new Set(["Royal Chef", "Nagina"]);

const fallbackBrands: Brand[] = [
  { id: "f1", name: "Kotop Steel",  logo_url: "/images/brands/kotop-steel-logo.jpg",         is_published: true },
  { id: "f2", name: "Shree MS",     logo_url: "/images/brands/shree-ms.jpg",                 is_published: true },
  { id: "f3", name: "Shagun",       logo_url: "/images/brands/shagun.jpg",                   is_published: true },
  { id: "f4", name: "India Gold",   logo_url: "/images/brands/india-gold.jpg",               is_published: true },
  { id: "f5", name: "Fusion",       logo_url: "/images/brands/fusion-brand.jpg",             is_published: true },
  { id: "f6", name: "Shagoon",      logo_url: "/images/brands/shagoon-logo.jpg",             is_published: true },
  { id: "f7", name: "Saga Steel",   logo_url: "/images/brands/saga-steels-logo.jpg",         is_published: true },
  { id: "f8", name: "KHR",          logo_url: "/images/brands/khr-logo.jpg",                 is_published: true },
  { id: "f9", name: "Jai Baba Ji",  logo_url: "/images/brands/jai-baba-ji.jpg",             is_published: true },
  { id: "f10", name: "TNT",                      logo_url: "/images/brands/tnt-the-next-trend.jpg",          is_published: true },
  { id: "f11", name: "Global Designer Collection", logo_url: "/images/brands/global-designer-collection.jpg", is_published: true },
  { id: "f12", name: "Royal Chef",               logo_url: "/images/brands/royal-chef.jpg",                  is_published: true },
  { id: "f13", name: "Nagina",                   logo_url: "/images/brands/nagina.jpg",                      is_published: true },
  { id: "f14", name: "AAA",                      logo_url: "/images/brands/aaa-total-kitchen.jpg",           is_published: true },
  { id: "f15", name: "IndiChef",                 logo_url: "/images/brands/indichef.jpg",                    is_published: true },
  { id: "f16", name: "goodflame",                logo_url: "/images/brands/goodflame.jpg",                   is_published: true },
];

function BrandLogo({ brand }: { brand: Brand }) {
  if (!brand.logo_url) {
    return (
      <div style={{ width: "200px", height: "110px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontWeight: 800, fontSize: "18px", color: "#0c1148", textAlign: "center" }}>
          {brand.name}
        </span>
      </div>
    );
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={brand.logo_url.replace(/ /g, "%20")}
      alt={brand.name}
      style={{
        width: "200px",
        height: "110px",
        objectFit: "contain",
        mixBlendMode: darkBgBrands.has(brand.name) ? "normal" : "multiply",
      }}
    />
  );
}

export default function ExhibitorMarquee() {
  const [brands, setBrands] = useState<Brand[]>(fallbackBrands);

  useEffect(() => {
    fetch("/api/admin/brands", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const apiPublished = (data?.data ?? []).filter((b: Brand) => b.is_published);
        if (apiPublished.length > 0) {
          const apiNames = new Set(apiPublished.map((b: Brand) => b.name.toLowerCase()));
          const merged = [
            ...fallbackBrands.filter((fb) => !apiNames.has(fb.name.toLowerCase())),
            ...apiPublished.map((b: Brand) => {
              const fb = fallbackBrands.find((f) => f.name.toLowerCase() === b.name.toLowerCase());
              if (fb) {
                const isExternalUrl = b.logo_url && b.logo_url.startsWith("http") && !b.logo_url.includes(" ");
                return isExternalUrl ? b : { ...b, logo_url: fb.logo_url };
              }
              return b;
            }),
          ];
          setBrands(merged);
        }
      })
      .catch(() => {});
  }, []);

  const copies = 4;
  const track = Array.from({ length: copies }, () => brands).flat();

  return (
    <div className="w-full" style={{ background: "#f0b429", borderTop: "4px solid #1a1464" }}>
      <div
        className="w-full overflow-hidden"
        style={{ borderTop: "1px solid #dde3ef", borderBottom: "1px solid #dde3ef" }}
      >
        <style>{`
          @keyframes marquee-brands {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
          .brands-track {
            display: flex;
            align-items: center;
            width: max-content;
            animation: marquee-brands ${brands.length * 3}s linear infinite;
          }
          .brands-track:hover { animation-play-state: paused; }
        `}</style>

        <div className="brands-track">
          {track.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="inline-flex items-center justify-center flex-shrink-0 select-none"
              style={{ padding: "20px 48px", borderRight: "1px solid #e5e7eb" }}
            >
              <BrandLogo brand={brand} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
