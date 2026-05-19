"use client";

import Link from "next/link";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function ExhibitorFacilitiesPage() {
  const siteSettings = useSiteSettings();

  return (
    <div className="min-h-screen">
      <section
        id="ExhibitorFacilities"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
        data-reveal-delay="50"
      >
        <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
          <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
            <div>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                Exhibitor Facilities
              </h2>

              <p className="mt-4 text-md leading-7 text-justify text-gray-600">
                Fusion The Era provides exhibitors with comprehensive on-site
                support and premium facilities to ensure a smooth, professional,
                and productive exhibition experience.
              </p>

              <p className="mt-4 text-md leading-7 text-justify text-gray-600">
                World-class infrastructure at {siteSettings.event_venue}
              </p>

              <p className="mt-4 text-md leading-7 text-justify text-gray-600">
                Key facilities include:
              </p>

              <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-600">
                <li>ATM facilities for quick cash access</li>
                <li>Business centre with internet, printing, and scanning</li>
                <li>Booth setup and technical support</li>
                <li>Courier and freight handling support</li>
                <li>Reserved exhibitor parking on a pass basis</li>
                <li>Medical and first aid support</li>
                <li>24-hour booth security</li>
                <li>Restaurants and cafeteria facilities</li>
                <li>Electricity and utility support</li>
                <li>Wi-Fi and internet access</li>
                <li>Daily housekeeping support</li>
                <li>Dedicated exhibitor service desk</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}