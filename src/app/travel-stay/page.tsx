"use client";
import { useSiteSettings } from "@/lib/useSiteSettings";
import Link from "next/link";

const HOTELS = [
  {
    name: "Hotel Samrat",
    area: "Chanakyapuri, New Delhi",
    dist: "~8 km from Bharat Mandapam",
    stars: 4,
    type: "Luxury",
    color: "#E8274B",
  },
  {
    name: "The Ashok",
    area: "Chanakyapuri, New Delhi",
    dist: "~9 km from Bharat Mandapam",
    stars: 5,
    type: "Premium",
    color: "#7B2FBE",
  },
  {
    name: "Hotel Janpath",
    area: "Connaught Place, New Delhi",
    dist: "~6 km from Bharat Mandapam",
    stars: 4,
    type: "Business",
    color: "#F4822A",
  },
  {
    name: "Budget Hotels — Pragati Maidan Area",
    area: "Mathura Road / ITO, New Delhi",
    dist: "~1–3 km from Bharat Mandapam",
    stars: 3,
    type: "Budget",
    color: "#00C8D4",
  },
];

const TRANSPORT = [
  {
    icon: "🚇",
    title: "Delhi Metro",
    desc: "Take the Blue Line to Pragati Maidan Metro Station (directly adjacent to Bharat Mandapam). Highly recommended — avoid peak hour traffic.",
    highlight: true,
  },
  {
    icon: "🚖",
    title: "Taxi / App-based Cabs",
    desc: "Ola and Uber are widely available. Drop-off point: Gate 1 or Gate 2, Bharat Mandapam. Pre-book for early morning arrivals.",
  },
  {
    icon: "🚌",
    title: "DTC Bus",
    desc: "Several DTC routes pass near Pragati Maidan. Suitable for budget travel from central Delhi areas.",
  },
  {
    icon: "✈️",
    title: "From IGI Airport",
    desc: "Approximately 20–25 km from Indira Gandhi International Airport. Metro: Airport Express → New Delhi Station → Blue Line to Pragati Maidan (~50 min). Cab: 45–60 min depending on traffic.",
  },
  {
    icon: "🚂",
    title: "From Railway Station",
    desc: "New Delhi Station and Nizamuddin Station are 5–8 km away. Taxis/autos readily available outside stations.",
  },
  {
    icon: "🛺",
    title: "Auto Rickshaw",
    desc: "Metered autos available from nearby Metro stations and markets. Suitable for short-distance travel around the venue area.",
  },
];

export default function TravelStayPage() {
  const siteSettings = useSiteSettings();

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative isolate w-full overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(0,200,212,0.2)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl" style={{ background: "rgba(232,39,75,0.15)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3" style={{ color: "#8cecff" }}>
            Plan Your Visit
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Travel &amp; Stay</h1>
          <p className="mt-3 text-white/60 text-sm">
            Getting to {siteSettings.event_venue} · {siteSettings.event_date}
          </p>
          <div className="mt-5 flex justify-center">
            <span className="h-1 w-20 rounded-full" style={{ background: "linear-gradient(90deg,#00C8D4,#E8274B)" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-10 space-y-10">
        {/* Venue Card */}
        <div className="rounded-2xl p-5 md:p-7 shadow-sm" style={{ border: "1px solid #dde6ff", background: "#ffffff" }}>
          <div className="h-1 w-12 rounded-full mb-4" style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)" }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-bold mb-3" style={{ color: "#1a1a2e" }}>Venue Address</h2>
              <div className="space-y-2 text-sm" style={{ color: "#374151" }}>
                <p className="font-semibold text-base" style={{ color: "#1a1a2e" }}>{siteSettings.event_venue}</p>
                <p>Pragati Maidan, New Delhi – 110001</p>
                <p>Entry: Gate 1 &amp; Gate 2</p>
                <p>Exhibition Halls: A, B &amp; C</p>
              </div>
              <Link
                href="/reaching-the-venue"
                className="inline-block mt-4 px-5 py-2 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}
              >
                📍 Detailed Directions
              </Link>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-3" style={{ color: "#1a1a2e" }}>Show Dates</h2>
              <div
                className="rounded-xl p-4"
                style={{ background: "linear-gradient(135deg,#090f2d,#1a2f7f)" }}
              >
                <p className="text-white font-black text-lg">{siteSettings.event_date}</p>
                <p className="text-white/60 text-sm mt-1">10:00 am – 07:00 pm (last day till 5 pm)</p>
                <p className="text-white/50 text-xs mt-2">Pre-registration required for free entry</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transport */}
        <div>
          <h2 className="text-xl font-bold mb-5" style={{ color: "#1a1a2e" }}>Getting There</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRANSPORT.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl p-5 shadow-sm"
                style={{
                  border: `1px solid ${t.highlight ? "#E8274B" : "#dde6ff"}`,
                  background: t.highlight ? "#fff5f5" : "#ffffff",
                }}
              >
                <div className="text-2xl mb-2">{t.icon}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color: t.highlight ? "#E8274B" : "#1a1a2e" }}>
                  {t.title}
                  {t.highlight && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Recommended</span>}
                </h3>
                <p className="text-xs leading-5" style={{ color: "#6b7280" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hotels */}
        <div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Recommended Stay</h2>
          <p className="text-sm mb-5" style={{ color: "#6b7280" }}>
            Negotiated rates and preferred accommodation options near the venue. Contact our team for special rates.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOTELS.map((h) => (
              <div key={h.name} className="rounded-2xl overflow-hidden shadow-sm" style={{ border: "1px solid #dde6ff" }}>
                <div className="h-1.5" style={{ background: `linear-gradient(90deg,${h.color},${h.color}aa)` }} />
                <div className="bg-white p-4 md:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: "#1a1a2e" }}>{h.name}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{h.area}</p>
                      <p className="text-xs" style={{ color: "#6b7280" }}>{h.dist}</p>
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 text-white"
                      style={{ background: h.color }}
                    >
                      {h.type}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-0.5">
                    {Array.from({ length: h.stars }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                    {Array.from({ length: 5 - h.stars }).map((_, i) => (
                      <span key={i} className="text-gray-200 text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact for Assistance */}
        <div className="rounded-2xl p-5 md:p-6" style={{ background: "linear-gradient(135deg,#090f2d,#1a2f7f)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-white font-bold text-base">Need help with travel planning?</p>
              <p className="text-white/60 text-sm mt-1">Our team can assist with hotel bookings and transport arrangements</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/80">
                <span>📞 {siteSettings.contact_delhi_mobile}</span>
                <span>📞 {siteSettings.contact_mumbai_mobile}</span>
              </div>
            </div>
            <a
              href={`mailto:${siteSettings.contact_delhi_email}`}
              className="flex-shrink-0 px-6 py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90 text-center"
              style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
