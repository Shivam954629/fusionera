"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";
import { useSiteSettings } from "@/lib/useSiteSettings";

const SCHEDULE = [
  { day: "Day 1", date: "Friday, July 4, 2026", time: "10:00 am – 07:00 pm", note: "Fusion The Era Plus Members only" },
  { day: "Day 2", date: "Saturday, July 5, 2026", time: "10:00 am – 07:00 pm", note: "All trade visitors" },
  { day: "Day 3", date: "Sunday, July 6, 2026", time: "10:00 am – 07:00 pm", note: "All trade visitors" },
  { day: "Day 4", date: "Monday, July 7, 2026", time: "10:00 am – 05:00 pm", note: "All trade visitors" },
];

const FALLBACK_TITLE = "Visiting Hours";
const FALLBACK_INTRO = "Fusion The Era welcomes trade visitors, buyers, distributors, and industry professionals to experience four days of business, networking, and innovation.";

export default function VisitingHoursPage() {
  const siteSettings = useSiteSettings();
  const cms = usePageContent("visiting-hours");
  const title = cms?.title || FALLBACK_TITLE;
  const intro = cms?.paragraphs[0] || FALLBACK_INTRO;

  return (
    <section
      id="VisitingHours"
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      <p className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{intro}</p>
      {siteSettings.event_venue && (
        <p className="mt-4 text-lg leading-8" style={{ color: "#0c1148" }}>Venue: {siteSettings.event_venue}</p>
      )}
      {siteSettings.event_date && (
        <p className="mt-2 text-lg leading-8" style={{ color: "#0c1148" }}>Event Date: {siteSettings.event_date}</p>
      )}
      <div className="mt-6 space-y-4">
        {SCHEDULE.map((s) => (
          <div key={s.day} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(12,17,72,0.15)" }}>
            <h3 className="text-lg font-bold" style={{ color: "#0c1148" }}>{s.day}</h3>
            <p className="mt-1 text-sm" style={{ color: "#374151" }}>{s.date}</p>
            <p className="mt-2 text-base font-semibold" style={{ color: "#0c1148" }}>{s.time}</p>
            <p className="mt-1 text-sm" style={{ color: "#374151" }}>{s.note}</p>
          </div>
        ))}
      </div>
      <h3 className="mt-8 text-xl font-bold" style={{ color: "#0c1148" }}>Entry Guidelines</h3>
      <ul className="mt-4 list-disc pl-5 text-lg leading-8" style={{ color: "#0c1148" }}>
        <li>All visitors must carry a valid registration number or QR code for entry.</li>
        <li>Pre-registered visitors can print their badge at the Visitor Registration Desk.</li>
        <li>Entry is strictly for trade visitors only.</li>
        <li>Visitors are requested to carry a business card for identification.</li>
        <li>Spot registration is available at the venue.</li>
      </ul>
    </section>
  );
}
