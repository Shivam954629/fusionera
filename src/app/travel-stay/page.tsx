"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";
import { useSiteSettings } from "@/lib/useSiteSettings";

const FALLBACK_TITLE = "Travel & Stay";
const FALLBACK_PARAS = [
  "Plan your visit to Fusion The Era with convenient travel, transport, and accommodation options near the venue.",
  "Getting There: Delhi Metro Blue Line to Pragati Maidan Metro Station. Taxi / App-based cabs: Drop-off at Gate 1 or Gate 2. DTC buses available near Pragati Maidan. IGI Airport is approximately 20–25 km from the venue. New Delhi and Nizamuddin railway stations are 5–8 km away. Auto rickshaws available for short-distance travel.",
  "Recommended Stay: Preferred accommodation options are available near the venue. Visitors and exhibitors may contact the team for hotel booking assistance and special rates. Nearby options include Hotel Samrat Chanakyapuri, The Ashok Chanakyapuri, Hotel Janpath Connaught Place, and budget hotels near Pragati Maidan / ITO.",
];

export default function TravelStayPage() {
  const siteSettings = useSiteSettings();
  const cms = usePageContent("travel-stay");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="TravelStay"
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {siteSettings.event_venue && (
        <p className="mt-4 text-lg leading-8" style={{ color: "#0c1148" }}>Venue: {siteSettings.event_venue}</p>
      )}
      {siteSettings.event_date && (
        <p className="mt-2 text-lg leading-8" style={{ color: "#0c1148" }}>Event Date: {siteSettings.event_date}</p>
      )}
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
