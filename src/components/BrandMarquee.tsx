"use client";

const categories = [
  "Houseware", "HORECA Ware", "Stainless Steel", "Home Appliances",
  "Cookware", "Tableware", "Plastic Ware", "Brass & Silver",
  "Glassware", "Baking & Aluminium", "Cooking Range & Chimney",
  "RO Water & Aerated Water", "Home Décor", "Kitchen Accessories",
  "Gifts & Handicrafts", "Home Furniture",
];

const exhibitorLogos = [
  { name: "Kotop Steel", src: "/images/brands/kotop-steel.jpg" },
  { name: "Shree MS", src: "/images/brands/shree-ms.jpg" },
  { name: "Shagun", src: "/images/brands/shagun.jpg" },
  { name: "India Gold", src: "/images/brands/india-gold.jpg" },
  { name: "Fusion", src: "/images/brands/fusion-brand.jpg" },
  { name: "Shagoon", src: "/images/brands/shagoon.jpg" },
];

export default function BrandMarquee() {
  return (
    <div className="w-full border-b border-white/10" style={{ background: "linear-gradient(90deg, #0c1148 0%, #101450 50%, #0c1148 100%)" }}>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee2 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track  { animation: marquee  32s linear infinite; }
        .marquee-track2 { animation: marquee2 28s linear infinite; }
        .marquee-track:hover, .marquee-track2:hover { animation-play-state: paused; }
      `}</style>

      {/* Row 1 — Exhibitor Logos */}
      <div className="overflow-hidden py-3 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1 px-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Exhibitors</span>
        </div>
        <div className="flex whitespace-nowrap marquee-track2">
          {[...exhibitorLogos, ...exhibitorLogos, ...exhibitorLogos, ...exhibitorLogos].map((logo, i) => (
            <div
              key={i}
              className="inline-flex flex-col items-center justify-center mx-6 flex-shrink-0"
              style={{ width: "80px" }}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-sm">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="w-full h-full object-contain p-1"
                  draggable={false}
                />
              </div>
              <span className="text-[9px] font-semibold text-white/50 mt-1 text-center leading-tight max-w-[72px] truncate">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — Product Categories */}
      <div className="overflow-hidden py-2">
        <div className="flex whitespace-nowrap marquee-track">
          {[...categories, ...categories].map((cat, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-7 text-xs font-semibold uppercase tracking-[0.15em] select-none"
              style={{ color: "#00c8de" }}
            >
              <span className="w-1 h-1 inline-block shrink-0" style={{ background: "#00c8de", opacity: 0.6, transform: "rotate(45deg)" }} />
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
