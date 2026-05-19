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
  "linear-gradient(135deg,#E8274B,#F4822A)",
  "linear-gradient(135deg,#7B2FBE,#E91E8C)",
  "linear-gradient(135deg,#00C8D4,#0080ff)",
  "linear-gradient(135deg,#F4822A,#FFAA00)",
  "linear-gradient(135deg,#10b981,#00C8D4)",
  "linear-gradient(135deg,#E91E8C,#7B2FBE)",
  "linear-gradient(135deg,#FFAA00,#F4822A)",
  "linear-gradient(135deg,#E8274B,#7B2FBE)",
  "linear-gradient(135deg,#00C8D4,#E91E8C)",
  "linear-gradient(135deg,#F4822A,#E8274B)",
];

export default function TradeShowFacts() {
  return (
    <div className="min-h-screen">
      <section className="relative isolate w-full overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/25" />
        <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full blur-3xl" style={{ background: "rgba(0,200,212,0.2)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(232,39,75,0.18)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.3em]" style={{ background: "rgba(0,200,212,0.15)", color: "#67e8f9", border: "1px solid rgba(0,200,212,0.3)" }}>
            Show Statistics
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">Trade Show <span style={{ background: "linear-gradient(90deg,#00C8D4,#E8274B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Facts</span></h1>
          <p className="mt-4 text-white/60 text-sm md:text-base max-w-xl mx-auto">
            Numbers that define India&apos;s premier home &amp; hospitality trade show
          </p>
          <div className="mt-6 flex justify-center">
            <span className="h-1 w-24 rounded-full" style={{ background: "linear-gradient(90deg,#00C8D4,#E8274B)" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {FACTS.map((f, i) => (
            <div key={f.label} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" style={{ border: "1px solid #e8eeff" }}>
              <div className="h-1" style={{ background: GRADIENTS[i] }} />
              <div className="bg-white p-4 text-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mx-auto mb-3" style={{ background: "#f4f6ff" }}>{f.icon}</div>
                <p className="text-base font-black leading-tight" style={{ background: GRADIENTS[i], WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{f.stat}</p>
                <p className="text-xs mt-1 font-medium leading-4" style={{ color: "#6b7280" }}>{f.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl p-6 md:p-8 text-center" style={{ background: "linear-gradient(135deg,#090f2d,#1a2f7f)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white font-bold text-lg mb-1">Be Part of India&apos;s Growing Trade Show</p>
          <p className="text-white/50 text-sm mb-5">Join thousands of trade professionals at Fusion The Era 2026</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/visitor-registration" className="px-6 py-2.5 rounded-xl text-white text-sm font-bold transition hover:opacity-90" style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}>Register as Visitor</a>
            <a href="/exhibitors-registration" className="px-6 py-2.5 rounded-xl text-sm font-bold transition hover:opacity-90" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>Become an Exhibitor</a>
          </div>
        </div>
      </div>
    </div>
  );
}
