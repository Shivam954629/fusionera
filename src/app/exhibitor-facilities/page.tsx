"use client";
import { useSiteSettings } from "@/lib/useSiteSettings";
import Link from "next/link";

const FACILITIES = [
  {
    icon: "🏧",
    title: "ATM Facilities",
    desc: "ATM machines available within the exhibition premises for quick cash access during set-up and show days.",
    gradient: "linear-gradient(135deg,#E8274B,#F4822A)",
  },
  {
    icon: "💼",
    title: "Business Centre",
    desc: "Fully equipped business centre with computers, internet, printing, scanning, and stationery services. Available to exhibitors during show hours.",
    gradient: "linear-gradient(135deg,#7B2FBE,#E91E8C)",
  },
  {
    icon: "🔧",
    title: "Booth Setup Support",
    desc: "Technical support team available during hall setup days to assist with booth assembly, electrical connections, and display installations.",
    gradient: "linear-gradient(135deg,#F4822A,#FFAA00)",
  },
  {
    icon: "📦",
    title: "Courier & Freight",
    desc: "Dedicated freight and courier handling desk for receiving and dispatching goods and samples to and from the exhibition venue.",
    gradient: "linear-gradient(135deg,#00C8D4,#0080ff)",
  },
  {
    icon: "🅿️",
    title: "Exhibitor Parking",
    desc: "Reserved exhibitor vehicle parking available on a pass basis. Passes can be collected from the Exhibitor Services Desk.",
    gradient: "linear-gradient(135deg,#374151,#1a1a2e)",
  },
  {
    icon: "🏥",
    title: "Medical / First Aid",
    desc: "On-site first aid station with trained staff. Ambulance available throughout setup, show days, and breakdown.",
    gradient: "linear-gradient(135deg,#E8274B,#c0392b)",
  },
  {
    icon: "🔐",
    title: "Booth Security",
    desc: "24-hour security cover during setup, show days, and breakdown. Exhibitors are advised to secure valuables overnight.",
    gradient: "linear-gradient(135deg,#1a1a2e,#374151)",
  },
  {
    icon: "🍽️",
    title: "Restaurants / Cafeteria",
    desc: "Multiple food and beverage outlets inside the venue. Special exhibitor meal packages available on request.",
    gradient: "linear-gradient(135deg,#10b981,#00C8D4)",
  },
  {
    icon: "💡",
    title: "Electricity & Utilities",
    desc: "Standard electrical supply included in built-up booths. Additional power requirements can be arranged through the Exhibitor Manual.",
    gradient: "linear-gradient(135deg,#FFAA00,#F4822A)",
  },
  {
    icon: "🌐",
    title: "Wi-Fi & Internet",
    desc: "High-speed Wi-Fi access available inside the exhibition halls. Connection details provided in the Exhibitor Kit.",
    gradient: "linear-gradient(135deg,#7B2FBE,#00C8D4)",
  },
  {
    icon: "🧹",
    title: "Housekeeping",
    desc: "Daily booth cleaning service provided for all booth types during the show. Additional cleaning requests can be raised at the service desk.",
    gradient: "linear-gradient(135deg,#E91E8C,#F4822A)",
  },
  {
    icon: "📞",
    title: "Exhibitor Service Desk",
    desc: "Dedicated help desk staffed throughout the show to handle all exhibitor requirements, queries, and on-site support.",
    gradient: "linear-gradient(135deg,#E8274B,#7B2FBE)",
  },
];

export default function ExhibitorFacilitiesPage() {
  const siteSettings = useSiteSettings();

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative isolate w-full overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(123,47,190,0.2)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl" style={{ background: "rgba(233,30,140,0.15)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3" style={{ color: "#C084FC" }}>
            Exhibitor Services
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Exhibitor Facilities</h1>
          <p className="mt-3 text-white/60 text-sm">
            World-class infrastructure at {siteSettings.event_venue}
          </p>
          <div className="mt-5 flex justify-center">
            <span className="h-1 w-20 rounded-full" style={{ background: "linear-gradient(90deg,#7B2FBE,#E91E8C)" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        {/* Intro */}
        <div className="rounded-2xl p-5 md:p-7 mb-8 shadow-sm" style={{ border: "1px solid #dde6ff", background: "#ffffff" }}>
          <div className="h-1 w-12 rounded-full mb-4" style={{ background: "linear-gradient(90deg,#7B2FBE,#E91E8C)" }} />
          <p className="text-sm md:text-base leading-7 text-justify" style={{ color: "#374151" }}>
            Fusion The Era provides exhibitors with comprehensive on-site support and premium facilities to ensure a smooth, professional, and productive exhibition experience. From setup to breakdown, our team is here to assist you at every step.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {FACILITIES.map((f) => (
            <div key={f.title} className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #dde6ff" }}>
              <div className="h-1.5" style={{ background: f.gradient }} />
              <div className="bg-white p-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: "#f4f6ff" }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "#1a1a2e" }}>{f.title}</h3>
                <p className="text-xs leading-5" style={{ color: "#6b7280" }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/exhibitors-registration"
            className="rounded-2xl p-5 text-center hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg,#7B2FBE,#E91E8C)" }}
          >
            <p className="text-white font-bold text-sm">Exhibitor Registration</p>
            <p className="text-white/70 text-xs mt-1">Book your stall today</p>
          </Link>
          <Link
            href="/pay-stall-advance"
            className="rounded-2xl p-5 text-center transition"
            style={{ border: "1px solid #dde6ff", background: "#ffffff" }}
          >
            <p className="font-bold text-sm" style={{ color: "#1a1a2e" }}>Pay Stall Advance</p>
            <p className="text-xs mt-1" style={{ color: "#6b7280" }}>Secure your preferred space</p>
          </Link>
          <Link
            href="/travel-stay"
            className="rounded-2xl p-5 text-center transition"
            style={{ border: "1px solid #dde6ff", background: "#ffffff" }}
          >
            <p className="font-bold text-sm" style={{ color: "#1a1a2e" }}>Travel &amp; Stay</p>
            <p className="text-xs mt-1" style={{ color: "#6b7280" }}>Hotels &amp; transport guide</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
