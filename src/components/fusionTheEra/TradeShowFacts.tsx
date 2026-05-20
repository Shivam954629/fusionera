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
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10">
      <div className="relative overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(26,20,100,0.1)", background: "#f0f4f8" }}>
        <div className="h-1.5" style={{ background: "#e84030" }} />
        <div className="px-6 md:px-8 py-8">
          <h2 className="text-2xl font-bold md:text-3xl text-[#1a1464] mb-6">
            Trade Show Facts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FACTS.map((f) => (
              <div key={f.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3" style={{ border: "1px solid rgba(26,20,100,0.06)", borderLeft: "3px solid #e84030" }}>
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <span className="font-bold text-sm" style={{ color: "#1a1464" }}>{f.stat}</span>
                  <span className="text-sm text-gray-500 ml-1">{f.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
