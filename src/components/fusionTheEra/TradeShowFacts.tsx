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

const GRADIENTS = [
  "linear-gradient(135deg,#3B82F6,#60A5FA)",
  "linear-gradient(135deg,#3B82F6,#60A5FA)",
  "linear-gradient(135deg,#00C8D4,#0080ff)",
  "linear-gradient(135deg,#60A5FA,#7DD3FC)",
  "linear-gradient(135deg,#10b981,#00C8D4)",
  "linear-gradient(135deg,#60A5FA,#3B82F6)",
  "linear-gradient(135deg,#7DD3FC,#60A5FA)",
  "linear-gradient(135deg,#3B82F6,#3B82F6)",
  "linear-gradient(135deg,#00C8D4,#60A5FA)",
  "linear-gradient(135deg,#60A5FA,#3B82F6)",
];

export default function TradeShowFacts() {
  return (
    <section
      id="Benefits"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Trade Show Facts
            </h2>
            
            <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-600">
              <li>Dedicated B2B Exhibition</li>
              <li>50,000+ Trade Visitors </li>
              <li>Visitors from 460+ Cities </li>
              <li>Indian & International Participation </li>
              <li>Strong Presence of Brands & Manufacturers</li>
              <li>Latest Products & Industry Innovations </li>
              <li>Focused Business Networking </li>
              <li>Dealer & Distributor Expansion </li>
              <li>Professional Exhibition Infrastructure </li>
	            <li>Exclusive Trade Audience</li>
  	
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}
