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
            {paragraphs.map((para, i) => (
              <p key={i} className="mt-4 text-md leading-7  text-black">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
