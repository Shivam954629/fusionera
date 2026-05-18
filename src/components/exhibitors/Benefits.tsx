"use client";
import React from "react";

export default function Benefits() {
  return (
    <section
      id="Benefits"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-white shadow-sm">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Benefits
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Exhibiting at Fusion The Era offers businesses a valuable opportunity to connect with a targeted trade audience and accelerate market growth.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
             Key benefits include:
            </p>
            <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-600">
              <li>Direct access to qualified buyers and distributors</li>
              <li>Strong brand visibility within the industry</li>
              <li>Opportunities for product launches and demonstrations</li>
              <li>Networking with retailers, hospitality buyers, and sourcing teams</li>
              <li>Expansion of dealer and distribution networks</li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  );
}
