"use client";
import React from "react";

export default function Support() {
  return (
    <section
      id="support"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Help & Support</h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              The Fusion The Era support team is available to assist exhibitors,
              visitors, buyers, and partners with exhibition-related queries and
              coordination.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Support services include:
            <ul className="mt-4 list-disc space-y-2 pl-6 text-md leading-7 text-gray-600">
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
