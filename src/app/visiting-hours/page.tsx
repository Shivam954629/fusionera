"use client";
import { useSiteSettings } from "@/lib/useSiteSettings";
import Link from "next/link";

const SCHEDULE = [
  {
    day: "Day 1",
    date: "Friday, July 4, 2026",
    time: "10:00 am – 07:00 pm",
    note: "Fusion The Era Plus Members only",
    highlight: true,
  },
  {
    day: "Day 2",
    date: "Saturday, July 5, 2026",
    time: "10:00 am – 07:00 pm",
    note: "All trade visitors",
    highlight: false,
  },
  {
    day: "Day 3",
    date: "Sunday, July 6, 2026",
    time: "10:00 am – 07:00 pm",
    note: "All trade visitors",
    highlight: false,
  },
  {
    day: "Day 4",
    date: "Monday, July 7, 2026",
    time: "10:00 am – 05:00 pm",
    note: "All trade visitors",
    highlight: false,
  },
];

const QUICK_LINKS = [
  { label: "Visitor Registration", href: "/visitor-registration" },
  { label: "Exhibitors List", href: "/exhibitorlist" },
  { label: "Reaching The Venue", href: "/reaching-the-venue" },
  { label: "Travel & Stay", href: "/travel-stay" },
  { label: "Visitor Facilities", href: "/visitor-facilities" },
];

export default function VisitingHoursPage() {
  const siteSettings = useSiteSettings();

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative isolate w-full overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(232,39,75,0.2)" }} />
        <div className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl" style={{ background: "rgba(244,130,42,0.15)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3" style={{ color: "#8cecff" }}>
            Fusion The Era 2026
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Visiting Hours</h1>
          <p className="mt-3 text-white/60 text-sm">
            {siteSettings.event_venue} · {siteSettings.event_date}
          </p>
          <div className="mt-5 flex justify-center">
            <span className="h-1 w-20 rounded-full" style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN SCHEDULE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Venue Info */}
          <div className="rounded-2xl p-5 md:p-6 shadow-sm" style={{ border: "1px solid #dde6ff", background: "#ffffff" }}>
            <div className="h-1 w-12 rounded-full mb-4" style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)" }} />
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#E8274B" }}>Venue</p>
                <p className="font-semibold" style={{ color: "#1a1a2e" }}>{siteSettings.event_venue}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#E8274B" }}>Entry</p>
                <p className="font-semibold" style={{ color: "#1a1a2e" }}>Gate 1 &amp; Gate 2</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#E8274B" }}>Halls</p>
                <p className="font-semibold" style={{ color: "#1a1a2e" }}>Exhibition Halls A, B &amp; C</p>
              </div>
            </div>
          </div>

          {/* Schedule Cards */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#1a1a2e" }}>Show Schedule</h2>
            <div className="space-y-3">
              {SCHEDULE.map((s) => (
                <div
                  key={s.day}
                  className="rounded-2xl overflow-hidden shadow-sm"
                  style={{ border: `1px solid ${s.highlight ? "#E8274B" : "#dde6ff"}` }}
                >
                  <div
                    className="h-1.5"
                    style={{ background: s.highlight ? "linear-gradient(90deg,#E8274B,#F4822A)" : "linear-gradient(90deg,#00C8D4,#7B2FBE)" }}
                  />
                  <div className="bg-white p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex-shrink-0 flex flex-col items-center justify-center font-black"
                      style={{ background: s.highlight ? "linear-gradient(135deg,#E8274B,#F4822A)" : "#f4f6ff", color: s.highlight ? "#fff" : "#1a1a2e" }}
                    >
                      <span className="text-xs">{s.day.split(" ")[0]}</span>
                      <span className="text-lg leading-tight">{s.day.split(" ")[1]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm md:text-base" style={{ color: "#1a1a2e" }}>{s.date}</p>
                      <p className="text-base md:text-lg font-black mt-0.5" style={{ color: "#E8274B" }}>{s.time}</p>
                      <p className="text-xs mt-1" style={{ color: "#6b7280" }}>{s.note}</p>
                    </div>
                    {s.highlight && (
                      <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}>
                        Early Access
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Entry Info */}
          <div className="rounded-2xl p-5 md:p-6" style={{ background: "#fff8e1", border: "1px solid #f59e0b" }}>
            <p className="text-sm font-bold text-amber-800 mb-2">📋 Entry Guidelines</p>
            <ul className="space-y-2 text-xs text-amber-700 list-disc list-inside">
              <li>All visitors must carry a valid registration number or QR code for entry.</li>
              <li>Pre-registered visitors can print their badge at the Visitor Registration Desk (Hall A).</li>
              <li>Entry is strictly for trade visitors — no children below 18 years allowed inside halls.</li>
              <li>Visitors are requested to carry their business card for identification.</li>
              <li>Spot registration is available at the venue for a fee of ₹500.</li>
            </ul>
          </div>

          {/* Register CTA */}
          <div className="rounded-2xl p-5 md:p-6 text-center" style={{ background: "linear-gradient(135deg,#090f2d,#1a2f7f)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <p className="text-white font-bold text-base mb-1">Not registered yet?</p>
            <p className="text-white/60 text-sm mb-4">Register for free entry to Fusion The Era 2026</p>
            <Link
              href="/visitor-registration"
              className="inline-block px-8 py-3 rounded-xl text-white font-bold text-sm transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}
            >
              Register as Visitor
            </Link>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-5">
          {/* Quick Links */}
          <div className="rounded-2xl p-5 shadow-sm" style={{ border: "1px solid #dde6ff", background: "#ffffff" }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#1a1a2e" }}>Quick Links</h3>
            <div className="space-y-1">
              {QUICK_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition hover:bg-red-50"
                  style={{ color: "#374151" }}
                >
                  {l.label}
                  <span style={{ color: "#E8274B" }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl p-5 shadow-sm" style={{ border: "1px solid #dde6ff", background: "#ffffff" }}>
            <h3 className="text-sm font-bold mb-3" style={{ color: "#1a1a2e" }}>Visitor Services</h3>
            <div className="space-y-2 text-xs" style={{ color: "#374151" }}>
              <p>📞 {siteSettings.contact_delhi_mobile}</p>
              <p>📞 {siteSettings.contact_mumbai_mobile}</p>
              <a href={`mailto:${siteSettings.contact_delhi_email}`} className="block text-[#E8274B] hover:underline">
                ✉️ {siteSettings.contact_delhi_email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
