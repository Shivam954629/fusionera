"use client";
import React from "react";

export default function VenuePage() {
  return (
    <main className="min-h-screen py-8 md:py-12">
      <section
        id="contact"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
        data-reveal-delay="50"
      >
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(7,11,52,0.9)_0%,rgba(11,30,91,0.88)_48%,rgba(17,45,122,0.86)_100%)] shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#070B34]/95 via-[#0B1E5B]/92 to-[#112D7A]/90"></div>
          <div className="relative grid gap-6 p-4 text-white sm:p-6 md:p-8">
            <div>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                Reaching the Venue
              </h2>
              <p className="mt-4 text-md leading-7 text-justify text-gray-300">
                Located in the New Delhi, Bharat Mandapam at Pragati Maidan
                stands as one of India&apos;s most prestigious international
                exhibition and convention destinations. With world-class
                infrastructure, seamless connectivity, and modern facilities,
                the venue offers a convenient and professional experience for
                exhibitors and visitors attending Fusion The Era.
              </p>
              <p className="mt-4 text-md leading-7 text-justify text-gray-300">
                The venue is well connected through major road networks, Delhi
                Metro, railway stations, and Indira Gandhi International
                Airport, making travel smooth and accessible from across India
                and overseas.
              </p>
              <p className="mt-4 text-md leading-7 text-justify text-gray-300">
                Venue Details <br />
                Venue: Bharat Mandapam (IECC) <br />
                Address: Pragati Maidan, New Delhi, India <br />
                Connectivity:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-md leading-7 text-gray-300">
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
              <p className="mt-4 text-md leading-7 text-justify text-gray-300">
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
