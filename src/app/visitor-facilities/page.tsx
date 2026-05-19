"use client";

import { useSiteSettings } from "@/lib/useSiteSettings";
import Link from "next/link";

const FACILITIES = [
  "ATM facilities for convenient cash withdrawals",
  "Business centre with internet, printing, scanning, and stationery",
  "Car hire support for local and outstation travel",
  "Courier services for sending and receiving packages",
  "Hotel and accommodation assistance near the venue",
  "Left luggage storage near the visitor registration area",
  "Medical and first aid support with ambulance standby",
  "Visitor parking on a pay-per-use basis",
  "Prayer room available near the visitor entrance",
  "Restaurants, cafeteria, and drinking water facilities",
  "Taxi and transport support from venue gates",
  "Travel desk for tickets, hotel reservations, and tour packages",
];

export default function VisitorFacilitiesPage() {
  const siteSettings = useSiteSettings();

  return (
    <section
      id="VisitorFacilities"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Visitor Facilities
            </h2>

            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era is committed to providing a comfortable and
              productive experience for all trade visitors. A wide range of
              facilities are available at the venue to ensure you can focus on
              business while we take care of your needs.
            </p>

            <p className="mt-4 text-md leading-7 text-gray-600">
              Venue: {siteSettings.event_venue}
            </p>

            <p className="mt-4 text-md leading-7 text-gray-600">
              Key facilities include:
            </p>

            <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-600">
              {FACILITIES.map((facility) => (
                <li key={facility}>{facility}</li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}