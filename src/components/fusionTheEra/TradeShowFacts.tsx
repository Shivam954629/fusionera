"use client";
import React from "react";

const FACTS = [
  { icon: "🤝", stat: "B2B", label: "Dedicated Exhibition" },
  { icon: "👥", stat: "50,000+", label: "Trade Visitors" },
  { icon: "🏙️", stat: "460+", label: "Cities Represented" },
  { icon: "🌏", stat: "Indian & Intl", label: "Participation" },
  { icon: "🏷️", stat: "Top Brands", label: "& Manufacturers" },
  { icon: "🚀", stat: "Latest", label: "Products & Innovations" },
  { icon: "💼", stat: "Focused", label: "Business Networking" },
  { icon: "🔗", stat: "Dealer", label: "& Distributor Expansion" },
  { icon: "🏛️", stat: "Premium", label: "Exhibition Infrastructure" },
  { icon: "🎯", stat: "Exclusive", label: "Trade Audience" },
];

export default function TradeShowFacts() {
  return (
    <section className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom" style={{ background: "#fef9c3" }} data-reveal-delay="50">
      <h2 className="text-2xl font-bold md:text-3xl mb-6" style={{ color: "#0c1148" }}>
        Trade Show Facts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FACTS.map((f) => (
          <div key={f.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3" style={{ border: "1px solid rgba(12,17,72,0.1)", borderLeft: "3px solid #0c1148" }}>
            <span className="text-xl flex-shrink-0">{f.icon}</span>
            <div>
              <span className="font-bold text-sm" style={{ color: "#0c1148" }}>{f.stat}</span>
              <span className="text-sm ml-1" style={{ color: "#374151" }}>{f.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
