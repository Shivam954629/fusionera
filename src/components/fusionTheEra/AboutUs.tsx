"use client";
import React from "react";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-white shadow-sm">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
          
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">About Fusion The Era</h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era is a dedicated trade exhibition designed for the
              evolving home and hospitality industry in India. Covering
              Houseware, HORECA Products, Stainless Steel, Kitchenware, and Home
              Appliances, the exhibition creates a professional platform for
              business networking, sourcing, and industry collaboration.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              The event brings together manufacturers, brands, exporters,
              importers, distributors, retailers, and hospitality buyers from
              India and overseas, helping businesses connect with the right
              trade partners under one roof.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Driven by innovation, business growth, and market opportunities,
              Fusion The Era enables exhibitors to showcase their latest
              products, interact directly with high-potential buyers, and
              strengthen their presence in India’s expanding consumer market.
              The exhibition continues to gain recognition as a valuable B2B
              platform for companies seeking meaningful business connections and
              long-term growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
