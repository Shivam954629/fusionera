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
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative isolate w-full overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/25" />
        <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full blur-3xl" style={{ background: "rgba(232,39,75,0.22)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(244,130,42,0.18)" }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full blur-3xl" style={{ background: "rgba(232,39,75,0.07)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.3em]" style={{ background: "rgba(232,39,75,0.15)", color: "#ff8fa3", border: "1px solid rgba(232,39,75,0.3)" }}>
            Fusion The Era 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">About <span style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Fusion The Era</span></h1>
          <p className="mt-4 text-white/60 text-sm md:text-base max-w-xl mx-auto leading-7">
            India&apos;s dedicated trade exhibition for the home &amp; hospitality industry
          </p>
          <div className="mt-6 flex justify-center">
            <span className="h-1 w-24 rounded-full" style={{ background: "linear-gradient(90deg,#E8274B,#F4822A,#FFAA00)" }} />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-10 space-y-8">
        {/* Main card */}
        <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "1px solid #e8eeff" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg,#E8274B,#F4822A,#FFAA00)" }} />
          <div className="bg-white px-6 md:px-10 py-8 md:py-10">
            <p className="text-base md:text-lg leading-8 text-justify" style={{ color: "#374151" }}>
              Fusion The Era is a dedicated trade exhibition designed for the evolving home and hospitality industry in India. Covering Houseware, HORECA Products, Stainless Steel, Kitchenware, and Home Appliances, the exhibition creates a professional platform for business networking, sourcing, and industry collaboration.
            </p>
            <p className="mt-5 text-base md:text-lg leading-8 text-justify" style={{ color: "#374151" }}>
              The event brings together manufacturers, brands, exporters, importers, distributors, retailers, and hospitality buyers from India and overseas, helping businesses connect with the right trade partners under one roof.
            </p>
            <p className="mt-5 text-base md:text-lg leading-8 text-justify" style={{ color: "#374151" }}>
              Driven by innovation, business growth, and market opportunities, Fusion The Era enables exhibitors to showcase their latest products, interact directly with high-potential buyers, and strengthen their presence in India&apos;s expanding consumer market.
            </p>
          </div>
        </div>

        {/* Highlights grid */}
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ color: "#1a1a2e" }}>Focus Areas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="rounded-xl p-4 flex items-center gap-3 transition hover:shadow-md" style={{ background: "#ffffff", border: "1px solid #e8eeff" }}>
                <span className="text-2xl flex-shrink-0">{h.icon}</span>
                <span className="text-sm font-semibold" style={{ color: "#1a1a2e" }}>{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: "linear-gradient(135deg,#090f2d,#1a2f7f)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-bold text-lg mb-1">India&apos;s Premier B2B Trade Exhibition</p>
          <p className="text-white/50 text-sm mb-5">July 4–7, 2026 · Bharat Mandapam, Pragati Maidan, New Delhi</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/visitor-registration" className="px-6 py-2.5 rounded-xl text-white text-sm font-bold transition hover:opacity-90" style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}>Register as Visitor</a>
            <a href="/exhibitors-registration" className="px-6 py-2.5 rounded-xl text-sm font-bold transition hover:opacity-90" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>Register as Exhibitor</a>
          </div>
        </div>
      </div>
    </div>
  );
}
