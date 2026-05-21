"use client";

import { useEffect, useState } from "react";

interface Brand {
  id: number | string;
  name: string;
  logo_url: string;
  is_published: boolean;
}

const fallbackBrands: Brand[] = [
  { id: "f1", name: "Kotop Steel",  logo_url: "/images/brands/kotop-steel.jpg",  is_published: true },
  { id: "f2", name: "Shree MS",     logo_url: "/images/brands/shree-ms.jpg",     is_published: true },
  { id: "f3", name: "Shagun",       logo_url: "/images/brands/shagun.jpg",       is_published: true },
  { id: "f4", name: "India Gold",   logo_url: "/images/brands/india-gold.jpg",   is_published: true },
  { id: "f5", name: "Fusion",       logo_url: "/images/brands/fusion-brand.jpg", is_published: true },
  { id: "f6", name: "Shagoon",      logo_url: "/images/brands/shagoon.jpg",      is_published: true },
  { id: "f7", name: "Saga Steel",   logo_url: "/images/brands/saga-steel-logo.jpg",     is_published: true },
  { id: "f8", name: "KHR",          logo_url: "/images/brands/khr-logo.jpg",             is_published: true },
];

function BrandLogo({ brand }: { brand: Brand }) {
  if (!brand.logo_url) {
    return (
      <div
        style={{
          width: "200px",
          height: "110px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "8px",
          border: "1px solid rgba(12,17,72,0.12)",
        }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: "18px",
            color: "#0c1148",
            letterSpacing: "0.05em",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
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
      style={{ width: "200px", height: "110px", objectFit: "contain" }}
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
                // For fallback brands: use DB logo only if it's a proper external URL (Cloudinary etc.)
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
              style={{ padding: "24px 56px", borderRight: "1px solid #e5e7eb" }}
            >
              <BrandLogo brand={brand} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
