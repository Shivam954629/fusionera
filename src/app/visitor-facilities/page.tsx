"use client";
import React from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

const FACILITIES = [
  "Banking & ATM Support",
  "Business Assistance Centre",
  "Local Transport & Car Rental Services",
  "Courier & Logistics Assistance",
  "Hotel & Stay Assistance",
  "Luggage Assistance Facility",
  "Emergency Medical Support",
  "Vehicle Parking Facility",
  "Prayer & Meditation Room",
  "Food Court & Refreshment Services",
  "Cab & Taxi Assistance",
  "Travel Coordination Services",
];

export default function VisitorFacilitiesPage() {
  const siteSettings = useSiteSettings();

  return (
    <section
      id="VisitorFacilities"
      className="w-full bg-[#5B9BD5] py-6 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative py-4 text-[#00509d] sm:py-6 md:py-8">
          <div className="w-fit">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Visitor Facilities
            </h2>
            <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
          </div>

          {siteSettings.event_venue && (
            <p className="mt-4 text-left text-sm leading-6 text-black sm:text-base sm:leading-7">
              <span className="font-semibold">Venue:</span>{" "}
              <span className="font-semibold text-white">
                {siteSettings.event_venue}
              </span>
            </p>
          )}

          <p className="mt-4 text-left text-sm leading-6 text-black sm:text-base sm:leading-7 md:text-justify">
            Fusion The Era 2026 is committed to providing a professional,
            convenient, and well-managed exhibition experience for exhibitors,
            buyers, business delegates, and trade visitors. A wide range of
            visitor support services and operational facilities will be
            available at the venue to ensure smooth participation throughout
            the exhibition period.
          </p>

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