"use client";
import React from "react";

export default function WhoShouldVisit() {
  return (
    <section
      id="WhoShouldVisit"
      className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80"
          alt="Furniture background in modern living room"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
        <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Who Should Visit
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Fusion The Era is designed for decision-makers and trade
              professionals seeking quality products, trusted suppliers, and new
              business opportunities within the home and hospitality sector.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
             The exhibition attracts:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-md leading-7 text-[#1b2440]/85">
              <li>Retailers & Modern Trade Buyers</li>
              <li>Dealers & Distribution Networks</li>
              <li>Hotel & Hospitality Procurement Teams</li>
              <li>Importers & Exporters</li>
              <li>Interior & Design Professionals</li>
              <li>Corporate & Institutional Buyers</li>
              <li>E-commerce & Marketplace Sellers</li>
            </ul>
             <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
            The event offers a business-first environment where networking, sourcing, and collaboration happen naturally under one roof.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
