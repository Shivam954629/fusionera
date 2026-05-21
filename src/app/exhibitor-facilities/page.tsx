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
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {siteSettings.event_venue && (
        <p className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>
          World-class infrastructure at {siteSettings.event_venue}
        </p>
      )}
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
