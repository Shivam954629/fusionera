"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";
import { useSiteSettings } from "@/lib/useSiteSettings";

const FALLBACK_TITLE = "Visitor Facilities";
const FALLBACK_PARAS = [
  "Fusion The Era is committed to providing a comfortable and productive experience for all trade visitors. A wide range of facilities are available at the venue to ensure you can focus on business while we take care of your needs.",
  "Key facilities include: ATM facilities for convenient cash withdrawals, Business centre with internet, printing, scanning, and stationery, Car hire support for local and outstation travel, Courier services, Hotel and accommodation assistance near the venue, Left luggage storage, Medical and first aid support with ambulance standby, Visitor parking on a pay-per-use basis, Prayer room, Restaurants, cafeteria, and drinking water facilities, Taxi and transport support from venue gates, and Travel desk for tickets, hotel reservations, and tour packages.",
];

export default function VisitorFacilitiesPage() {
  const siteSettings = useSiteSettings();
  const cms = usePageContent("visitor-facilities");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="VisitorFacilities"
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {siteSettings.event_venue && (
        <p className="mt-4 text-lg leading-8" style={{ color: "#0c1148" }}>Venue: {siteSettings.event_venue}</p>
      )}
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
