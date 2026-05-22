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
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#cae9ff]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            {siteSettings.event_venue && (
              <p className="mt-4 text-md leading-7 text-black">
                Venue: {siteSettings.event_venue}
              </p>
            )}
            {siteSettings.event_date && (
              <p className="mt-2 text-md leading-7 text-black">
                Event Date: {siteSettings.event_date}
              </p>
            )}
            <p className="mt-4 text-md leading-7 text-black text-justify">{paragraphs.join(" ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
