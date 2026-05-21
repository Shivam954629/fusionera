"use client";
import React from "react";

const CATEGORIES = [
  { icon: "🥘", label: "Houseware & Kitchenware" },
  { icon: "⚙️", label: "Stainless Steel Products" },
  { icon: "🏨", label: "HORECA & Commercial" },
  { icon: "🔌", label: "Home Appliances" },
  { icon: "🍴", label: "Kitchen Essentials & Utility" },
  { icon: "🍽️", label: "Tableware & Dining" },
  { icon: "🛋️", label: "Furniture & Home Décor" },
  { icon: "🎁", label: "Gifts & Lifestyle" },
  { icon: "🏩", label: "Hospitality Supplies" },
];

export default function ProductRange() {
  return (
    <section
      id="range"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#cae9ff]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl">Product Range</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <p className="mt-4 text-md leading-7 text-justify text-black">
              Fusion The Era showcases products across multiple categories
              related to home, kitchen, hospitality, and lifestyle industries,
              connecting buyers with the best manufacturers and brands.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-4 rounded-xl px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(0,80,157,0.15)",
                  }}
                >
                  <span className="text-2xl flex-shrink-0">{c.icon}</span>
                  <span className="font-semibold text-sm text-[#00509d]">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
