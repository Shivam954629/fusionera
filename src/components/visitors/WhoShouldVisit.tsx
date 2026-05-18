"use client";
import React from "react";

export default function WhoShouldVisit() {
  return (
    <section
      id="WhoShouldVisit"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Who Should Visit
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era is designed for decision-makers and trade
              professionals seeking quality products, trusted suppliers, and new
              business opportunities within the home and hospitality sector.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
             The exhibition attracts:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-md leading-7 text-gray-600">
              <li>Retailers & Modern Trade Buyers</li>
              <li>Dealers & Distribution Networks</li>
              <li>Hotel & Hospitality Procurement Teams</li>
              <li>Importers & Exporters</li>
              <li>Interior & Design Professionals</li>
              <li>Corporate & Institutional Buyers</li>
              <li>E-commerce & Marketplace Sellers</li>
            </ul>
             <p className="mt-4 text-md leading-7 text-justify text-gray-600">
            The event offers a business-first environment where networking, sourcing, and collaboration happen naturally under one roof.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
