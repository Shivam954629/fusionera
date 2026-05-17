"use client";
import React from "react";

export default function TradeShowFacts() {
  return (
    <section
      id="tradeshowfacts"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(7,11,52,0.9)_0%,rgba(11,30,91,0.88)_48%,rgba(17,45,122,0.86)_100%)] shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80"
          alt="Furniture background in modern living room"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#070B34]/95 via-[#0B1E5B]/92 to-[#112D7A]/90"></div>
        <div className="relative grid gap-6 p-4 text-white sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Trade Show Facts
            </h2>
          <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-300">
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
