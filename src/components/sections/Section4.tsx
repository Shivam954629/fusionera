import React from "react";

const cards = [
  {
    title: "Direct B2B Connections",
    text: "Meet hypermarkets, hotel chains, retailers and serious trade buyers face-to-face.",
  },
  {
    title: "Indian & Global Brands",
    text: "Connect with 600+ exhibitors — Indian manufacturers, importers, private labels and global brands.",
  },
  {
    title: "Pragati Maidan, Delhi",
    text: "Bharat Mandapam — International Exhibition & Convention Centre. World-class infrastructure.",
  },
  {
    title: "Targeted Trade Audience",
    text: "50,000+ qualified trade visitors from 460 cities. Only B2B — no retail consumers.",
  },
  {
    title: "Full Stall Support",
    text: "In-house stall fabrication, design to installation. Just show up and sell.",
  },
  {
    title: "360° Promotion",
    text: "Massive digital + physical outreach — WhatsApp, SMS, Email, banners, hoardings, TV, radio.",
  },
];

// Single accent color from logo — the red
const ACCENT = "#e84030";

export default function Section4() {
  return (
    <section
      id="why"
      className="w-full py-12 md:py-16 bg-white reveal-on-scroll"
      data-reveal-delay="0"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* Heading */}
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[#1a1464]">
            Why Fusion The Era?
          </h2>
          <div className="h-px w-20 bg-[#1a1464]/20 mt-3 mx-auto" />
        </div>

        {/* Cards — all same red left border */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white p-5 md:p-6 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
              style={{
                border: `1px solid rgba(26,20,100,0.08)`,
                borderLeft: `4px solid ${ACCENT}`,
              }}
            >
              <h3 className="text-sm font-bold text-[#1a1464] uppercase tracking-[0.05em] leading-snug">
                {card.title}
              </h3>
              <div className="w-6 h-0.5" style={{ background: ACCENT }} />
              <p className="text-sm leading-6 text-gray-500">{card.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
