"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Reaching the Venue";

const VENUE_HIGHLIGHTS = [
  {
    title: "Venue",
    value: "Bharat Mandapam, Pragati Maidan, New Delhi",
  },
  {
    title: "Nearest Metro",
    value: "Pragati Maidan & Supreme Court Metro Station",
  },
  {
    title: "Nearest Railway Station",
    value: "New Delhi Railway Station",
  },
  {
    title: "Nearest Airport",
    value: "Indira Gandhi International Airport (IGI)",
  },
  {
    title: "Transport Access",
    value: "Taxis, App-based Cabs, Buses & Public Transport",
  },
  {
    title: "Nearby Facilities",
    value: "Hotels, Business Hubs & Hospitality Facilities",
  },
];

const FALLBACK_PARAS = [
  "Located in New Delhi, Bharat Mandapam at Pragati Maidan stands as one of India's most prestigious international exhibition and convention destinations.",

  "With world-class infrastructure, seamless connectivity, and modern facilities, the venue offers a convenient and professional experience for exhibitors and visitors attending Fusion The Era.",
];

export default function VenuePage() {
  const cms = usePageContent("reaching-the-venue");

  const title = cms?.title || FALLBACK_TITLE;

  const paragraphs =
    cms?.paragraphs?.length > 0
      ? cms.paragraphs
      : FALLBACK_PARAS;

  return (
    <section
      id="contact"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            {/* Heading */}
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {title}
              </h2>

              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>

            {/* Intro */}
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="mt-4 text-md leading-7 text-black text-justify"
              >
                {para}
              </p>
            ))}

            {/* Highlights */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VENUE_HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#d6e9f7] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-sm font-bold text-[#00509d]">
                    {item.title}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-black sm:text-base">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}