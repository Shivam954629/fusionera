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
    <section
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl text-white">
                Trade Show Facts: 1st Edition
              </h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3"
                  style={{
                    border: "1px solid rgba(0,80,157,0.15)",
                    borderLeft: "3px solid #00509d",
                  }}
                >
                  <span className="text-xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <span className="font-bold text-sm text-[#00509d]">
                      {f.stat}
                    </span>
                    <span className="text-sm ml-1 text-gray-600">
                      {f.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
