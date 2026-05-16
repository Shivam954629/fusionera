"use client";
import React from "react";

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
        <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Benefits</h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              The exhibition is designed to help businesses save time, expand
              networks, and discover quality sourcing opportunities in one
              place.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Key visitor benefits include:
            </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-md leading-7 text-[#1b2440]/85">
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
