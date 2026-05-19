"use client";
import React from "react";

const CATEGORIES = [
  { icon: "🥘", label: "Houseware & Kitchenware", gradient: "linear-gradient(135deg,#E8274B,#F4822A)" },
  { icon: "⚙️", label: "Stainless Steel Products", gradient: "linear-gradient(135deg,#374151,#6b7280)" },
  { icon: "🏨", label: "HORECA & Commercial", gradient: "linear-gradient(135deg,#7B2FBE,#E91E8C)" },
  { icon: "🔌", label: "Home Appliances", gradient: "linear-gradient(135deg,#00C8D4,#0080ff)" },
  { icon: "🍴", label: "Kitchen Essentials & Utility", gradient: "linear-gradient(135deg,#F4822A,#FFAA00)" },
  { icon: "🍽️", label: "Tableware & Dining", gradient: "linear-gradient(135deg,#10b981,#00C8D4)" },
  { icon: "🛋️", label: "Furniture & Home Décor", gradient: "linear-gradient(135deg,#E91E8C,#F4822A)" },
  { icon: "🎁", label: "Gifts & Lifestyle", gradient: "linear-gradient(135deg,#FFAA00,#E8274B)" },
  { icon: "🏩", label: "Hospitality Supplies", gradient: "linear-gradient(135deg,#E8274B,#7B2FBE)" },
];

export default function ProductRange() {
  return (
    <div className="min-h-screen">
      <section className="relative isolate w-full overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/25" />
        <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full blur-3xl" style={{ background: "rgba(232,39,75,0.22)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(244,130,42,0.18)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.3em]" style={{ background: "rgba(232,39,75,0.15)", color: "#ff8fa3", border: "1px solid rgba(232,39,75,0.3)" }}>
            Exhibition Categories
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">Product <span style={{ background: "linear-gradient(90deg,#E8274B,#F4822A,#FFAA00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Range</span></h1>
          <p className="mt-4 text-white/60 text-sm md:text-base max-w-xl mx-auto">
            9 product segments · Home, kitchen, hospitality &amp; lifestyle
          </p>
          <div className="mt-6 flex justify-center">
            <span className="h-1 w-24 rounded-full" style={{ background: "linear-gradient(90deg,#E8274B,#F4822A,#FFAA00)" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-10 space-y-8">
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #e8eeff" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg,#E8274B,#F4822A,#FFAA00)" }} />
          <div className="bg-white px-6 md:px-8 py-6">
            <p className="text-base leading-7 text-center" style={{ color: "#374151" }}>
              Fusion The Era showcases products across multiple categories related to home, kitchen, hospitality, and lifestyle industries, connecting buyers with the best manufacturers and brands.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group" style={{ border: "1px solid #e8eeff" }}>
              <div className="h-1" style={{ background: c.gradient }} />
              <div className="bg-white p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "#f4f6ff" }}>{c.icon}</div>
                <span className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>{c.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg,#090f2d,#1a2f7f)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-bold mb-4">Interested in exhibiting your products?</p>
          <a href="/exhibitors-registration" className="inline-block px-8 py-3 rounded-xl text-white text-sm font-bold transition hover:opacity-90" style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}>Register as Exhibitor</a>
        </div>
      </div>
    </div>
  );
}
