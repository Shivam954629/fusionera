"use client";
import React from "react";

export default function TradeShowFacts() {
  return (
    <section
      id="tradeshowfacts"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Trade Show Facts
            </h2>
          <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-600">
            <li>Dedicated B2B Exhibition</li>
            <li>50,000+ Trade Visitors</li>
            <li>Visitors from 460+ Cities</li>
            <li>Indian & International Participation</li>
            <li>Strong Presence of Brands & Manufacturers</li>
            <li>Latest Products & Industry Innovations</li>
            <li>Focused Business Networking</li>
            <li>Dealer & Distributor Expansion</li>
            <li>Professional Exhibition Infrastructure</li>
            <li>Exclusive Trade Audience</li>
          </ul>
       
          </div>
        </div>
      </div>
    </section>
  );
}
