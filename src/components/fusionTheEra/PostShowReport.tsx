"use client";
import React from "react";

export default function PostShowReport() {
  return (
    <div className="min-h-screen">
      <section className="relative isolate w-full overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/25" />
        <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full blur-3xl" style={{ background: "rgba(16,185,129,0.2)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(0,200,212,0.18)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.3em]" style={{ background: "rgba(16,185,129,0.15)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.3)" }}>
            Past Edition
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">Post Show <span style={{ background: "linear-gradient(90deg,#10b981,#00C8D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Report</span></h1>
          <p className="mt-4 text-white/60 text-sm md:text-base max-w-xl mx-auto">
            Highlights and outcomes from previous Fusion The Era exhibitions
          </p>
          <div className="mt-6 flex justify-center">
            <span className="h-1 w-24 rounded-full" style={{ background: "linear-gradient(90deg,#10b981,#00C8D4)" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-10 space-y-8">
        <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "1px solid #e8eeff" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg,#10b981,#00C8D4)" }} />
          <div className="bg-white px-6 md:px-10 py-8 md:py-10 space-y-5">
            <p className="text-base md:text-lg leading-8 text-justify" style={{ color: "#374151" }}>
              Fusion The Era successfully brought together businesses, buyers, and industry professionals in a focused trade environment designed to support business growth and collaboration.
            </p>
            <p className="text-base md:text-lg leading-8 text-justify" style={{ color: "#374151" }}>
              The exhibition reflected growing interest from the market, with active participation, strong visitor engagement, and positive feedback from exhibitors and attendees across India.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "✅", title: "Active Participation", desc: "Strong exhibitor turnout from across the country" },
            { icon: "📈", title: "High Engagement", desc: "Record-breaking visitor interactions and business meetings" },
            { icon: "⭐", title: "Positive Feedback", desc: "Excellent ratings from both exhibitors and trade visitors" },
          ].map((h) => (
            <div key={h.title} className="rounded-2xl p-5 shadow-sm text-center" style={{ background: "#ffffff", border: "1px solid #e8eeff" }}>
              <span className="text-3xl">{h.icon}</span>
              <h3 className="font-bold text-sm mt-3 mb-1" style={{ color: "#1a1a2e" }}>{h.title}</h3>
              <p className="text-xs leading-5" style={{ color: "#6b7280" }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
