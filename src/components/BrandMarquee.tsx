"use client";

const brands = [
  "Houseware", "HORECA Ware", "Stainless Steel", "Home Appliances",
  "Cookware", "Tableware", "Plastic Ware", "Brass & Silver",
  "Glassware", "Baking & Aluminium", "Cooking Range & Chimney",
  "RO Water & Aerated Water", "Home Décor", "Kitchen Accessories",
  "Gifts & Handicrafts", "Home Furniture",
];

export default function BrandMarquee() {
  return (
    <div className="w-full overflow-hidden py-2 border-b border-white/10" style={{ background: "linear-gradient(90deg, #0c1148 0%, #101450 50%, #0c1148 100%)" }}>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 32s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="flex whitespace-nowrap marquee-track">
        {[...brands, ...brands].map((brand, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-7 text-xs font-semibold uppercase tracking-[0.15em] select-none"
            style={{ color: "#ffffff" }}
          >
            <span className="w-1 h-1 inline-block shrink-0" style={{ background: "#ffffff", opacity: 0.6, transform: "rotate(45deg)" }} />
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
