"use client";
import { useSiteSettings } from "@/lib/useSiteSettings";
import Link from "next/link";

const FACILITIES = [
  {
    icon: "🏧",
    title: "ATM Facilities",
    desc: "ATM machines are available within the exhibition premises for convenient cash withdrawals during show days.",
    gradient: "linear-gradient(135deg,#E8274B,#F4822A)",
  },
  {
    icon: "💼",
    title: "Business Centre",
    desc: "Equipped with computers, internet access, document printing, business card printing, scanning, and stationery. Available during show hours (chargeable).",
    gradient: "linear-gradient(135deg,#7B2FBE,#E91E8C)",
  },
  {
    icon: "🚗",
    title: "Car Hire",
    desc: "A variety of economy and luxury cars with drivers available for local and outstation travel through our official travel partner.",
    gradient: "linear-gradient(135deg,#00C8D4,#0080ff)",
  },
  {
    icon: "📦",
    title: "Courier Services",
    desc: "Courier service desks located near the visitor registration area for sending and receiving packages during the show.",
    gradient: "linear-gradient(135deg,#F4822A,#FFAA00)",
  },
  {
    icon: "🏨",
    title: "Hotel & Accommodation",
    desc: "Negotiated rates at nearby partner hotels. Check the Travel & Stay section for recommended accommodation near the venue.",
    gradient: "linear-gradient(135deg,#10b981,#059669)",
  },
  {
    icon: "🧳",
    title: "Left Luggage",
    desc: "Free left luggage storage available near the visitor registration area throughout all show days (9 am – 7:30 pm).",
    gradient: "linear-gradient(135deg,#E91E8C,#7B2FBE)",
  },
  {
    icon: "🏥",
    title: "Medical / First Aid",
    desc: "First aid facilities with trained medical staff available on-site. An ambulance is on standby during all show days for emergencies.",
    gradient: "linear-gradient(135deg,#E8274B,#c0392b)",
  },
  {
    icon: "🅿️",
    title: "Parking",
    desc: "Designated visitor car parking available on a pay-per-use basis at the venue. Vehicle security is maintained throughout show hours.",
    gradient: "linear-gradient(135deg,#374151,#1a1a2e)",
  },
  {
    icon: "🙏",
    title: "Prayer Room",
    desc: "A quiet prayer room is available near the visitor entrance area during all trade show hours for spiritual needs.",
    gradient: "linear-gradient(135deg,#FFAA00,#F4822A)",
  },
  {
    icon: "🍽️",
    title: "Restaurants / Cafeteria",
    desc: "Multiple food and beverage options inside the venue offering Indian and continental cuisine. Free drinking water stations available throughout.",
    gradient: "linear-gradient(135deg,#00C8D4,#10b981)",
  },
  {
    icon: "🚕",
    title: "Taxi & Transport",
    desc: "Metered taxis, radio taxis, and ride-sharing services (Ola/Uber) available at designated pickup points outside the venue gates.",
    gradient: "linear-gradient(135deg,#F4822A,#E8274B)",
  },
  {
    icon: "✈️",
    title: "Travel Desk",
    desc: "Comprehensive travel desk offering air ticket booking, hotel reservations, and tour packages. Available on all show days during show hours.",
    gradient: "linear-gradient(135deg,#7B2FBE,#00C8D4)",
  },
];

export default function VisitorFacilitiesPage() {
  const siteSettings = useSiteSettings();

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative isolate w-full overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(232,39,75,0.2)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl" style={{ background: "rgba(0,200,212,0.15)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3" style={{ color: "#8cecff" }}>
            Visitor Services
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Visitor Facilities</h1>
          <p className="mt-3 text-white/60 text-sm">
            Everything you need for a comfortable visit to {siteSettings.event_venue}
          </p>
          <div className="mt-5 flex justify-center">
            <span className="h-1 w-20 rounded-full" style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        {/* Intro */}
        <div className="rounded-2xl p-5 md:p-7 mb-8 shadow-sm" style={{ border: "1px solid #dde6ff", background: "#ffffff" }}>
          <div className="h-1 w-12 rounded-full mb-4" style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)" }} />
          <p className="text-sm md:text-base leading-7 text-justify" style={{ color: "#374151" }}>
            Fusion The Era is committed to providing a comfortable and productive experience for all trade visitors. A wide range of facilities are available at the venue to ensure you can focus on business while we take care of your needs.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {FACILITIES.map((f) => (
            <div key={f.title} className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #dde6ff" }}>
              <div className="h-1.5" style={{ background: f.gradient }} />
              <div className="bg-white p-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3 flex-shrink-0"
                  style={{ background: "#f4f6ff" }}
                >
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
            href="/visitor-registration"
            className="rounded-2xl p-5 text-center hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}
          >
            <p className="text-white font-bold text-sm">Register as Visitor</p>
            <p className="text-white/70 text-xs mt-1">Free entry for trade visitors</p>
          </Link>
          <Link
            href="/visiting-hours"
            className="rounded-2xl p-5 text-center transition"
            style={{ border: "1px solid #dde6ff", background: "#ffffff" }}
          >
            <p className="font-bold text-sm" style={{ color: "#1a1a2e" }}>Visiting Hours</p>
            <p className="text-xs mt-1" style={{ color: "#6b7280" }}>{siteSettings.event_date}</p>
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
