"use client";
import React from "react";

export default function Support() {
  return (
    <section
      id="support"
      className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
        <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Help & Support
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              The Fusion The Era support team is available to assist exhibitors,
              visitors, buyers, and partners with exhibition-related queries and
              coordination.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Support services include:
              <ul className="mt-4 list-disc space-y-2 pl-6 text-md leading-7 text-[#1b2440]/85">
                <li>Online registration support</li>
                <li>Participation assistance</li>
                <li>Event and venue information</li>
                <li>Technical and operational guidance</li>
                <li>General communication support</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
