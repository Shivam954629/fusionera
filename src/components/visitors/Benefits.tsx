"use client";
import React from "react";

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(7,11,52,0.9)_0%,rgba(11,30,91,0.88)_48%,rgba(17,45,122,0.86)_100%)] shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070B34]/95 via-[#0B1E5B]/92 to-[#112D7A]/90"></div>
        <div className="relative grid gap-6 p-4 text-white sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Benefits</h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-300">
              The exhibition is designed to help businesses save time, expand
              networks, and discover quality sourcing opportunities in one
              place.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-300">
              Key visitor benefits include:
            </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-md leading-7 text-gray-300">
                <li>Access to Indian and international exhibitors</li>
                <li>Direct interaction with industry professionals</li>
                <li>Opportunities for collaboration and business expansion</li>
                <li>Exposure to new launches and product innovations</li>
                <li>Efficient sourcing for retail and hospitality businesses</li>
              </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
