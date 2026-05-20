import React from "react";
import Link from "next/link";

const Divider = () => <div className="h-px w-20 bg-[#1a1464]/20 my-4" />;

const steps = [
  { no: "01", title: "Stall Booking", desc: "Contact our team to book your stall. Choose from various stall sizes and configurations. Pay the stall advance to confirm your booking." },
  { no: "02", title: "Exhibitor Registration", desc: "Complete your online exhibitor registration with your company details, product categories, and key contact information." },
  { no: "03", title: "Stall Allotment", desc: "Stall allotment is done on a first-come, first-served basis after payment confirmation. You will receive your stall number and hall map." },
  { no: "04", title: "Stall Setup", desc: "Setup begins one day before the show opens. Bare stalls and shell scheme stalls are both available. Bring your branding, products, and display materials." },
  { no: "05", title: "Show Days", desc: "The show runs for 4 days (July 4–7, 2026). Exhibitors get free passes for their team. Entry is strictly B2B — no retail visitors." },
  { no: "06", title: "Post-Show", desc: "Dismantling begins on the last day after closing time. Our team will share visitor enquiry data and post-show analytics within 7 working days." },
];

const faqs = [
  { q: "What is the stall size available?", a: "Stall sizes start from 9 sq. mt. (3×3) and go up to custom large formats. Both shell scheme and bare space are available." },
  { q: "What is included in the shell scheme stall?", a: "Shell scheme includes: panel walls, fascia board with your company name, carpet flooring, 1 table, 2 chairs, and basic lighting." },
  { q: "Can I bring my own stall design?", a: "Yes. Bare space exhibitors can bring their own custom fabricated stall. All designs must comply with venue safety guidelines." },
  { q: "How many exhibitor passes do I get?", a: "You receive exhibitor passes based on your stall size. Additional passes can be requested from our team." },
  { q: "Who can visit the show?", a: "Fusion The Era is strictly a B2B event. Only trade visitors — dealers, distributors, retailers, buyers, and industry professionals — are allowed." },
  { q: "When does the setup begin?", a: "Setup begins the day before the show opens. You will receive the exact setup schedule after stall allotment." },
];

export default function ExhibitorManualPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a1464 100%)" }} />
        <div className="absolute inset-0 -z-10 bg-black/20" />
        <div className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(232,64,48,0.15)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3 text-white/70">Fusion The Era 2026 · 1st Edition</p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Exhibitor Manual</h1>
          <p className="mt-3 text-white/60 text-sm max-w-xl mx-auto">
            Everything you need to know to exhibit at Fusion The Era — from booking to post-show.
          </p>
          <div className="mt-5 flex justify-center">
            <span className="h-1 w-20 rounded-full" style={{ background: "#e84030" }} />
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-10 space-y-12">

        {/* Exhibitor Steps */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a1464] text-center">Step-by-Step Guide</h2>
          <Divider />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {steps.map((s) => (
              <div key={s.no} className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(26,20,100,0.1)", boxShadow: "0 2px 8px rgba(26,20,100,0.04)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-black mb-3" style={{ background: "#e84030" }}>{s.no}</div>
                <h3 className="font-bold text-[#1a1464] text-sm mb-1">{s.title}</h3>
                <p className="text-xs leading-6 text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Info */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(26,20,100,0.1)" }}>
          <div className="h-1" style={{ background: "#e84030" }} />
          <div className="bg-white p-6 md:p-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a1464] mb-4">Key Show Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Venue", value: "Bharat Mandapam, New Delhi" },
                { label: "Dates", value: "July 4–7, 2026" },
                { label: "Edition", value: "1st Edition" },
                { label: "Format", value: "B2B Only" },
              ].map(item => (
                <div key={item.label} className="rounded-lg p-4 text-center" style={{ background: "#f0f4f8" }}>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="font-bold text-[#1a1464] text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a1464] text-center">Frequently Asked Questions</h2>
          <Divider />
          <div className="space-y-3 mt-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(26,20,100,0.08)" }}>
                <p className="font-semibold text-[#1a1464] text-sm">{f.q}</p>
                <p className="text-sm text-gray-500 leading-6 mt-1.5">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-xl p-8 text-center" style={{ background: "linear-gradient(135deg,#090f2d,#1a1464)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <h3 className="text-white font-bold text-lg mb-2">Ready to Exhibit?</h3>
          <p className="text-white/60 text-sm mb-6">Book your stall now for Fusion The Era 2026 — 1st Edition.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/exhibitors-registration" className="inline-block rounded px-8 py-3 text-white text-sm font-bold transition hover:opacity-90" style={{ background: "#e84030", boxShadow: "0 4px 14px rgba(232,64,48,0.35)" }}>
              Register as Exhibitor
            </Link>
            <Link href="/contact" className="inline-block rounded px-8 py-3 text-white text-sm font-semibold transition border border-white/30 hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
