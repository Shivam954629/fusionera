"use client";
import React from "react";

export default function AboutUs() {
  return (
    <section
      id="about"
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
          
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">About Fusion The Era</h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Fusion The Era is a dedicated trade exhibition designed for the
              evolving home and hospitality industry in India. Covering
              Houseware, HORECA Products, Stainless Steel, Kitchenware, and Home
              Appliances, the exhibition creates a professional platform for
              business networking, sourcing, and industry collaboration.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              The event brings together manufacturers, brands, exporters,
              importers, distributors, retailers, and hospitality buyers from
              India and overseas, helping businesses connect with the right
              trade partners under one roof.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
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
