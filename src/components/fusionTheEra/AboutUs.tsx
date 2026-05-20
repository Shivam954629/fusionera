"use client";
import React from "react";

const HIGHLIGHTS = [
  { label: "B2B Platform", icon: "🤝" },
  { label: "Home & Hospitality", icon: "🏠" },
  { label: "Houseware & HORECA", icon: "🍽️" },
  { label: "Stainless Steel", icon: "⚙️" },
  { label: "Home Appliances", icon: "🔌" },
  { label: "Kitchenware", icon: "🥘" },
];

export default function AboutUs() {
  return (
     <section
      id="WhoShouldExhibit"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              About Fusion The Era
            </h2>
            {/* Highlight chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {HIGHLIGHTS.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                  style={
                    h.label === "B2B Platform"
                      ? { background: "#e84030", color: "#fff" }
                      : { background: "#1a1464", color: "#fff" }
                  }
                >
                  {h.label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
               Fusion The Era is a dedicated trade exhibition designed for the
              evolving home and hospitality industry in India. Covering
              Houseware, HORECA Products, Stainless Steel, Kitchenware, and Home
              Appliances, the exhibition creates a{" "}
              <span className="font-bold text-[#1a1464]">professional business platform</span>{" "}
              for business networking, sourcing, and industry collaboration.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Driven by innovation, business growth, and market opportunities,
              Fusion The Era enables exhibitors to showcase their latest
              products, interact directly with high-potential buyers, and
              strengthen their presence in India&apos;s expanding consumer
              market.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              The event brings together manufacturers, brands, exporters,
              importers, distributors, retailers, and hospitality buyers from
              India and overseas, helping businesses connect with the right
              trade partners under one roof.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
