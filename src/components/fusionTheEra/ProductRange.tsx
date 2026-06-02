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
      className="w-full bg-[#5B9BD5] py-6 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative py-4 text-[#00509d] sm:py-6 md:py-8">
          <div className="w-fit">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Product Range
            </h2>
            <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
          </div>

          <p className="mt-4 text-sm leading-6 text-black sm:text-base sm:leading-7">
            Fusion The Era showcases products across multiple categories related
            to home, kitchen, hospitality, and lifestyle industries, connecting
            buyers with the best manufacturers and brands.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-xl border border-[#00509d]/15 bg-white/70 px-4 py-3"
              >
                <span className="flex-shrink-0 text-2xl">{c.icon}</span>

                <span className="text-sm font-semibold text-[#00509d]">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}