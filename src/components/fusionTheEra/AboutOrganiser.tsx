"use client";
import React from "react";

export default function AboutOrganizer() {
  return (
    <div className="min-h-screen">
      <section className="relative isolate w-full overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/25" />
        <div className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full blur-3xl" style={{ background: "rgba(255,170,0,0.2)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(244,130,42,0.18)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.3em]" style={{ background: "rgba(255,170,0,0.15)", color: "#fcd34d", border: "1px solid rgba(255,170,0,0.3)" }}>
            Fusion The Era
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">About <span style={{ background: "linear-gradient(90deg,#FFAA00,#F4822A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Organiser</span></h1>
          <p className="mt-4 text-white/60 text-sm md:text-base max-w-xl mx-auto">
            V-Tech Innovation Services — building impactful trade exhibitions
          </p>
          <div className="mt-6 flex justify-center">
            <span className="h-1 w-24 rounded-full" style={{ background: "linear-gradient(90deg,#FFAA00,#F4822A)" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-10 space-y-8">
        <div className="rounded-2xl overflow-hidden shadow-lg" style={{ border: "1px solid #e8eeff" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg,#FFAA00,#F4822A)" }} />
          <div className="bg-white px-6 md:px-10 py-8 md:py-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: "linear-gradient(135deg,#FFAA00,#F4822A)" }}>
                🏢
              </div>
              <div>
                <h2 className="text-xl font-black" style={{ color: "#1a1a2e" }}>V-Tech Innovation Services</h2>
                <p className="text-sm" style={{ color: "#6b7280" }}>Organiser of Fusion The Era</p>
              </div>
            </div>
            <p className="text-base md:text-lg leading-8 text-justify" style={{ color: "#374151" }}>
              Fusion The Era is organized by V-Tech Innovation Services, a company committed to creating impactful business exhibitions and industry-focused networking platforms. With a vision to connect businesses through professionally managed trade events, the organization focuses on delivering quality experiences, strong industry outreach, and meaningful business opportunities for exhibitors and visitors alike.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "🎯", title: "Mission", desc: "Connect businesses through professionally managed trade events" },
            { icon: "👁️", title: "Vision", desc: "Build India's most impactful B2B trade platform for home & hospitality" },
            { icon: "💡", title: "Values", desc: "Quality, innovation, and meaningful industry connections" },
          ].map((v) => (
            <div key={v.title} className="rounded-2xl p-5 shadow-sm" style={{ background: "#ffffff", border: "1px solid #e8eeff" }}>
              <span className="text-3xl">{v.icon}</span>
              <h3 className="font-bold text-sm mt-3 mb-1" style={{ color: "#1a1a2e" }}>{v.title}</h3>
              <p className="text-xs leading-5" style={{ color: "#6b7280" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
