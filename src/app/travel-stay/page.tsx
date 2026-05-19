"use client";

import { useSiteSettings } from "@/lib/useSiteSettings";
import Link from "next/link";

const TRANSPORT = [
  "Delhi Metro: Blue Line to Pragati Maidan Metro Station",
  "Taxi / App-based cabs: Drop-off at Gate 1 or Gate 2",
  "DTC buses available near Pragati Maidan",
  "IGI Airport is approximately 20–25 km from the venue",
  "New Delhi and Nizamuddin railway stations are 5–8 km away",
  "Auto rickshaws available for short-distance travel",
];

const HOTELS = [
  "Hotel Samrat, Chanakyapuri — Luxury stay",
  "The Ashok, Chanakyapuri — Premium stay",
  "Hotel Janpath, Connaught Place — Business stay",
  "Budget Hotels near Pragati Maidan / ITO",
];

export default function TravelStayPage() {
  const siteSettings = useSiteSettings();

  return (
    <section
      id="TravelStay"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Travel &amp; Stay
            </h2>

            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Plan your visit to Fusion The Era with convenient travel,
              transport, and accommodation options near the venue.
            </p>

            <p className="mt-4 text-md leading-7 text-gray-600">
              Venue: {siteSettings.event_venue}
            </p>

            <p className="mt-2 text-md leading-7 text-gray-600">
              Event Date: {siteSettings.event_date}
            </p>

            <p className="mt-2 text-md leading-7 text-gray-600">
              Address: Pragati Maidan, New Delhi – 110001
            </p>

            <p className="mt-2 text-md leading-7 text-gray-600">
              Entry: Gate 1 &amp; Gate 2
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">
                Getting There
              </h3>

              <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-600">
                {TRANSPORT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">
                Recommended Stay
              </h3>

              <p className="mt-4 text-md leading-7 text-justify text-gray-600">
                Preferred accommodation options are available near the venue.
                Visitors and exhibitors may contact the team for hotel booking
                assistance and special rates.
              </p>

              <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-600">
                {HOTELS.map((hotel) => (
                  <li key={hotel}>{hotel}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}