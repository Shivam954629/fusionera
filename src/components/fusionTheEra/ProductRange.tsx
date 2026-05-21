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
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>
        Product Range
      </h2>
      <p className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>
        Fusion The Era showcases products across multiple categories related to home,
        kitchen, hospitality, and lifestyle industries, connecting buyers with the best
        manufacturers and brands.
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-4 rounded-xl px-4 py-3"
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(12,17,72,0.15)" }}
          >
            <span className="text-2xl flex-shrink-0">{c.icon}</span>
            <span className="font-semibold text-sm" style={{ color: "#0c1148" }}>{c.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
