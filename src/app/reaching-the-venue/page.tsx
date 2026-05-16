"use client";
import React from "react";

export default function VenuePage() {
  return (
    <main className="min-h-screen py-8 md:py-12">
      <section
        id="contact"
        className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
        data-reveal-delay="50"
      >
        <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
          <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
            <div>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                Reaching the Venue
              </h2>
              <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                Located in the New Delhi, Bharat Mandapam at Pragati Maidan
                stands as one of India&apos;s most prestigious international
                exhibition and convention destinations. With world-class
                infrastructure, seamless connectivity, and modern facilities,
                the venue offers a convenient and professional experience for
                exhibitors and visitors attending Fusion The Era.
              </p>
              <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                The venue is well connected through major road networks, Delhi
                Metro, railway stations, and Indira Gandhi International
                Airport, making travel smooth and accessible from across India
                and overseas.
              </p>
              <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                Venue Details <br />
                Venue: Bharat Mandapam (IECC) <br />
                Address: Pragati Maidan, New Delhi, India <br />
                Connectivity:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-md leading-7 text-[#1b2440]/85">
                <li>
                  Nearest Metro Station: Supreme Court Metro Station / Pragati
                  Maidan Metro Station
                </li>
                <li>Nearest Railway Station: New Delhi Railway Station</li>
                <li>
                  Nearest Airport: Indira Gandhi International Airport (IGI
                  Airport)
                </li>
                <li>
                  Easily accessible via taxis, app-based cabs, buses, and public
                  transport
                </li>
              </ul>
              <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                Visitors can also explore nearby hotels, business hubs, and
                hospitality facilities conveniently located around the venue
                area.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
