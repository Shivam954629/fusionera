"use client";
import React from "react";
import Home from "../Home";

export default function List() {
  return (
    <section
      id="list"
      className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
        <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Exhibitor List
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
             Fusion The Era hosts participation from a wide range of Indian and international exhibitors representing the home and hospitality industry.
            </p>

            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
            The exhibitor list includes:
            </p>
            <ul className="mt-4 list-disc pl-5 text-md leading-7 text-[#1b2440]/85">
            <li>Houseware Brands</li>
            <li>Kitchenware Manufacturers </li>
            <li>HORECA Solution Providers </li>
            <li>Home Appliance Companies</li>
            <li>Stainless Steel Product Suppliers</li>
            <li>Home Décor & Lifestyle Brands</li>
            <li>Furniture & Utility Product Companies</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
