"use client";
import React from "react";

export default function ProductRange() {
  return (
    <section
      id="productrange"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Product Range
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era showcases products across multiple categories
              related to home, kitchen, hospitality, and lifestyle industries.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Categories include:
            </p>
            <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-600">
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
