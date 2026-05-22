"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";
import { useSiteSettings } from "@/lib/useSiteSettings";

const FALLBACK_TITLE = "Travel & Stay";

const FALLBACK_PARAS = [
  "Plan your visit to Fusion The Era with convenient travel, transport, and accommodation options near the venue.",
];

const TRAVEL_POINTS = [
  "Delhi Metro Blue Line to Pragati Maidan Metro Station",
  "Taxi / App-based cabs drop-off at Gate 1 or Gate 2",
  "DTC buses available near Pragati Maidan",
  "IGI Airport is approximately 20–25 km from the venue",
  "New Delhi and Nizamuddin railway stations are 5–8 km away",
  "Auto rickshaws available for short-distance travel",
];

const STAY_POINTS = [
  "Hotel Samrat, Chanakyapuri — Luxury stay",
  "The Ashok, Chanakyapuri — Premium stay",
  "Hotel Janpath, Connaught Place — Business stay",
  "Budget hotels near Pragati Maidan / ITO",
];

export default function TravelStayPage() {
  const siteSettings = useSiteSettings();

  const cms = usePageContent("travel-stay");

  const title = cms?.title || FALLBACK_TITLE;

  const paragraphs =
    cms?.paragraphs?.length > 0 ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="TravelStay"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {title}
              </h2>

              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>

            {siteSettings.event_venue && (
              <p className="mt-4 text-md leading-7 text-black">
                <span className="font-semibold text-white">Venue:</span>{" "}
                {siteSettings.event_venue}
              </p>
            )}

            {siteSettings.event_date && (
              <p className="mt-2 text-md leading-7 text-black">
                <span className="font-semibold text-white">Event Date:</span>{" "}
                {siteSettings.event_date}
              </p>
            )}

            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="mt-4 text-md leading-7 text-black text-justify"
              >
                {para}
              </p>
            ))}

            <div className="mt-8">
              <div className="inline-block">
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  Getting There
                </h3>

                <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {TRAVEL_POINTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white/90 px-4 py-3 text-sm leading-6 text-[#00509d] shadow-sm"
                  >
                    <span className="mt-1 text-[#f0b429]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <div className="inline-block">
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  Recommended Stay
                </h3>

                <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {STAY_POINTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white/90 px-4 py-3 text-sm leading-6 text-[#00509d] shadow-sm"
                  >
                    <span className="mt-1 text-[#f0b429]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}