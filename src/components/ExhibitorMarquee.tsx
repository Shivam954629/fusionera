"use client";

import { useEffect, useState } from "react";

interface Brand {
  id: number | string;
  name: string;
  logo_url: string;
  is_published: boolean;
}

// 25 fallback brands — enough to always fill the strip even on wide screens
const fallbackBrands: Brand[] = [
  { id: "f1",  name: "Milton",        logo_url: "", is_published: true },
  { id: "f2",  name: "Treo",          logo_url: "", is_published: true },
  { id: "f3",  name: "Borosil",       logo_url: "", is_published: true },
  { id: "f4",  name: "Cello",         logo_url: "", is_published: true },
  { id: "f5",  name: "Hawkins",       logo_url: "", is_published: true },
  { id: "f6",  name: "Prestige",      logo_url: "", is_published: true },
  { id: "f7",  name: "Pigeon",        logo_url: "", is_published: true },
  { id: "f8",  name: "Butterfly",     logo_url: "", is_published: true },
  { id: "f9",  name: "Wonderchef",    logo_url: "", is_published: true },
  { id: "f10", name: "Vinod",         logo_url: "", is_published: true },
  { id: "f11", name: "Bajaj",         logo_url: "", is_published: true },
  { id: "f12", name: "Philips",       logo_url: "", is_published: true },
  { id: "f13", name: "Signoraware",   logo_url: "", is_published: true },
  { id: "f14", name: "Nayasa",        logo_url: "", is_published: true },
  { id: "f15", name: "Tupperware",    logo_url: "", is_published: true },
  { id: "f16", name: "Lock & Lock",   logo_url: "", is_published: true },
  { id: "f17", name: "Femora",        logo_url: "", is_published: true },
  { id: "f18", name: "Dynore",        logo_url: "", is_published: true },
  { id: "f19", name: "Solimo",        logo_url: "", is_published: true },
  { id: "f20", name: "Embassy",       logo_url: "", is_published: true },
  { id: "f21", name: "Viceroy",       logo_url: "", is_published: true },
  { id: "f22", name: "Renberg",       logo_url: "", is_published: true },
  { id: "f23", name: "Kuber",         logo_url: "", is_published: true },
  { id: "f24", name: "Bergner",       logo_url: "", is_published: true },
  { id: "f25", name: "iBell",         logo_url: "", is_published: true },
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

  // Repeat enough times so the strip is always visually full (min 2 copies, 4 if few brands)
  const copies = brands.length < 10 ? 4 : 2;
  const track = Array.from({ length: copies }, () => brands).flat();

  return (
    <div className="w-full bg-white" style={{ borderTop: "1px solid #e5e7eb" }}>
      {/* Section header — HGH style */}
      <div className="text-center pt-8 pb-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a1464]">
          Our Exhibitors
        </h2>
        <div className="h-px w-20 bg-[#1a1464]/20 mt-3 mx-auto" />
      </div>

      {/* Marquee strip — HGH flat style */}
      <div
        className="w-full overflow-hidden"
        style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}
      >
        <style>{`
          @keyframes marquee-brands {
            0%   { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / ${copies})); }
          }
          .brands-track {
            display: flex;
            align-items: center;
            width: max-content;
            animation: marquee-brands ${brands.length * 2.4}s linear infinite;
          }
          .brands-track:hover { animation-play-state: paused; }
        `}</style>

        <div className="brands-track">
          {track.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="inline-flex items-center justify-center flex-shrink-0 select-none"
              style={{
                padding: "18px 44px",
                borderRight: "1px solid #e5e7eb",
                minWidth: "160px",
              }}
            >
              {brand.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  style={{
                    height: "40px",
                    maxWidth: "120px",
                    objectFit: "contain",
                    filter: "grayscale(15%)",
                  }}
                />
              ) : (
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "0.07em",
                    color: "#1a1464",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    opacity: 0.82,
                  }}
                >
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
