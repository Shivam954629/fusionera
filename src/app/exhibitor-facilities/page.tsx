"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";
import { useSiteSettings } from "@/lib/useSiteSettings";

const FALLBACK_TITLE = "Exhibitor Facilities";

const FALLBACK_PARAS = [
  "Fusion The Era provides exhibitors with comprehensive on-site support and premium facilities to ensure a smooth, professional, and productive exhibition experience.",
];

const FACILITIES = [
  "ATM facilities for quick cash access",
  "Business centre with internet, printing, and scanning",
  "Booth setup and technical support",
  "Courier and freight handling support",
  "Reserved exhibitor parking on a pass basis",
  "Medical and first aid support",
  "24-hour booth security",
  "Restaurants and cafeteria facilities",
  "Electricity and utility support",
  "Wi-Fi and internet access",
  "Daily housekeeping support",
  "Dedicated exhibitor service desk",
];

export default function ExhibitorFacilitiesPage() {
  const siteSettings = useSiteSettings();
  const cms = usePageContent("exhibitor-facilities");

  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs?.length
    ? cms.paragraphs
    : FALLBACK_PARAS;

  return (
    <section
      id="ExhibitorFacilities"
      className="w-full bg-[#5B9BD5] py-6 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative py-4 text-[#00509d] sm:py-6 md:py-8">
          <div className="w-fit">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              {title}
            </h2>

            <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
          </div>

          {siteSettings.event_venue && (
            <p className="mt-4 text-left text-sm leading-6 text-black sm:text-base sm:leading-7">
              World-class infrastructure at{" "}
              <span className="font-semibold text-white">
                {siteSettings.event_venue}
              </span>
            </p>
          )}

          <div className="mt-4 space-y-3 md:space-y-4">
            {paragraphs.map((para, index) => (
              <p
                key={index}
                className="text-left text-sm leading-6 text-black sm:text-base sm:leading-7 md:text-justify"
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <div className="w-fit">
              <h3 className="text-xl font-bold text-white md:text-2xl">
                Key Facilities
              </h3>

              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FACILITIES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-[#00509d]/15 bg-white/90 px-4 py-3 text-sm leading-6 text-[#00509d] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="mt-1 flex-shrink-0 text-[#f0b429]">
                    ●
                  </span>

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}