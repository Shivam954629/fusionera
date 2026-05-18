"use client";
import React from "react";

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-white shadow-sm">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Benefits</h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              The exhibition is designed to help businesses save time, expand
              networks, and discover quality sourcing opportunities in one
              place.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Key visitor benefits include:
            </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-md leading-7 text-gray-600">
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
