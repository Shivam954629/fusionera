"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Reaching the Venue";
const FALLBACK_PARAS = [
  "Located in New Delhi, Bharat Mandapam at Pragati Maidan stands as one of India's most prestigious international exhibition and convention destinations. With world-class infrastructure, seamless connectivity, and modern facilities, the venue offers a convenient and professional experience for exhibitors and visitors attending Fusion The Era.",
  "The venue is well connected through major road networks, Delhi Metro, railway stations, and Indira Gandhi International Airport, making travel smooth and accessible from across India and overseas.",
  "Nearest Metro Station: Supreme Court Metro Station / Pragati Maidan Metro Station. Nearest Railway Station: New Delhi Railway Station. Nearest Airport: Indira Gandhi International Airport (IGI Airport). Easily accessible via taxis, app-based cabs, buses, and public transport.",
  "Visitors can also explore nearby hotels, business hubs, and hospitality facilities conveniently located around the venue area.",
];

export default function VenuePage() {
  const cms = usePageContent("reaching-the-venue");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
