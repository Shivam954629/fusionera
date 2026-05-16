"use client";
import React from "react";

export default function ProductRange() {
  return (
    <section
      id="productrange"
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
              Product Range
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Fusion The Era showcases products across multiple categories
              related to home, kitchen, hospitality, and lifestyle industries.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Categories include:
            </p>
            <ul className="mt-4 list-disc pl-5 text-md leading-7 text-[#1b2440]/85">
              <li>Houseware & Kitchenware</li>
              <li>Stainless Steel Products</li>
              <li>HORECA & Commercial Solutions</li>
              <li>Home Appliances</li>
              <li>Kitchen Essentials & Utility Products</li>
              <li>Tableware & Dining Solutions</li>
              <li>Furniture & Home Décor</li>
              <li>Gifts & Lifestyle Collections</li>
              <li>Hospitality Supplies & Allied Products</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
