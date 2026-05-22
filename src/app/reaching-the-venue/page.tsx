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
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl text-white">{title}</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>
            <p className="mt-4 text-md leading-7 text-black text-justify">{paragraphs.join(" ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
