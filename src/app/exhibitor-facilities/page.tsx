"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";
import { useSiteSettings } from "@/lib/useSiteSettings";

const FALLBACK_TITLE = "Exhibitor Facilities";
const FALLBACK_PARAS = [
  "Fusion The Era provides exhibitors with comprehensive on-site support and premium facilities to ensure a smooth, professional, and productive exhibition experience.",
  "Key facilities include: ATM facilities for quick cash access, Business centre with internet, printing, and scanning, Booth setup and technical support, Courier and freight handling support, Reserved exhibitor parking on a pass basis, Medical and first aid support, 24-hour booth security, Restaurants and cafeteria facilities, Electricity and utility support, Wi-Fi and internet access, Daily housekeeping support, and Dedicated exhibitor service desk.",
];

export default function ExhibitorFacilitiesPage() {
  const siteSettings = useSiteSettings();
  const cms = usePageContent("exhibitor-facilities");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="ExhibitorFacilities"
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
              <p className="mt-4 text-md leading-7  text-black">
                World-class infrastructure at {siteSettings.event_venue}
              </p>
            )}
            <p className="mt-4 text-md leading-7 text-black text-justify">{paragraphs.join(" ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
