"use client";
import React from "react";

const STATS = [
  { value: "B2B", label: "Exclusive Format" },
  { value: "4", label: "Days of Business" },
  { value: "5+", label: "Product Sectors" },
  { value: "2026", label: "Edition" },
];

export default function AboutTheShow() {
  return (
    <div className="min-h-screen">
      <section className="relative isolate w-full overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/25" />
        <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full blur-3xl" style={{ background: "rgba(244,130,42,0.22)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(232,39,75,0.18)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.3em]" style={{ background: "rgba(244,130,42,0.15)", color: "#fdba74", border: "1px solid rgba(244,130,42,0.3)" }}>
            19th Edition · 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">About <span style={{ background: "linear-gradient(90deg,#F4822A,#FFAA00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>The Show</span></h1>
          <p className="mt-4 text-white/60 text-sm md:text-base max-w-xl mx-auto">
            A business networking destination for the home &amp; hospitality industry
          </p>
          <div className="mt-6 flex justify-center">
            <span className="h-1 w-24 rounded-full" style={{ background: "linear-gradient(90deg,#F4822A,#FFAA00)" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-10 space-y-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl p-5 text-center shadow-sm" style={{ background: "#ffffff", border: "1px solid #e8eeff" }}>
              <p className="text-3xl font-black" style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
              <p className="text-xs font-semibold mt-1" style={{ color: "#6b7280" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "1px solid #e8eeff" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg,#F4822A,#FFAA00)" }} />
          <div className="bg-white px-6 md:px-10 py-8 md:py-10 space-y-5">
            <p className="text-base md:text-lg leading-8 text-justify" style={{ color: "#374151" }}>
              Fusion The Era is more than just an exhibition — it is a business networking destination for the home and hospitality industry. The show brings together brands, manufacturers, retailers, distributors, and hospitality professionals under one roof to discover trends, exchange ideas, and create new business opportunities.
            </p>
            <p className="text-base md:text-lg leading-8 text-justify" style={{ color: "#374151" }}>
              The exhibition is exclusively focused on B2B interactions and professional trade engagement, ensuring that every visitor and exhibitor gains meaningful business value from their participation.
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: "linear-gradient(135deg,#090f2d,#1a2f7f)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-bold text-lg mb-1">Bharat Mandapam, Pragati Maidan, New Delhi</p>
          <p className="text-white/50 text-sm mb-5">July 4–7, 2026</p>
          <a href="/visitor-registration" className="inline-block px-8 py-3 rounded-xl text-white text-sm font-bold transition hover:opacity-90" style={{ background: "linear-gradient(135deg,#F4822A,#FFAA00)" }}>Register Now</a>
        </div>
      </div>
    </div>
  );
}
