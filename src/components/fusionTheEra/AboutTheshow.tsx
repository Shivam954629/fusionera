"use client";
import React from "react";

const STATS = [
  { value: "B2B", label: "Exclusive Format" },
  { value: "4", label: "Days of Business" },
  { value: "5+", label: "Product Sectors" },
  { value: "2026", label: "Edition" },
];

export default function AboutTheShow() {
  return (
    <section
      id="profile"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              About the Show
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
             Fusion The Era is more than just an exhibition — it is a business
              networking destination for the home and hospitality industry. The
              show brings together brands, manufacturers, retailers,
              distributors, and hospitality professionals under one roof to
              discover trends, exchange ideas, and create new business
              opportunities.
            </p>

            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
               The exhibition is exclusively focused on B2B interactions and
              professional trade engagement, ensuring that every visitor and
              exhibitor gains meaningful business value from their
              participation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
