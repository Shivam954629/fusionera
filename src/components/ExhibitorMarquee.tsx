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
];

export default function ExhibitorMarquee() {
  const [brands, setBrands] = useState<Brand[]>(fallbackBrands);

  useEffect(() => {
    fetch("/api/admin/brands", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const published = (data?.data ?? []).filter((b: Brand) => b.is_published);
        if (published.length > 0) setBrands(published);
      })
      .catch(() => {});
  }, []);

  const copies = 4;
  const track = Array.from({ length: copies }, () => brands).flat();

  return (
    <div className="w-full bg-white" style={{ borderTop: "1px solid #e5e7eb" }}>
      {/* Marquee strip */}
      <div
        className="w-full overflow-hidden"
        style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}
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
              <div style={{ width: "140px", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  style={{ width: "140px", height: "80px", objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
