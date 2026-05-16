"use client";
import React from "react";

export default function Profile() {
  return (
    <section
      id="profile"
      className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
        <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Exhibitor Profile
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Fusion The Era features participation from Indian and
              international companies representing Houseware, HORECA Products,
              Stainless Steel, Kitchenware, Home Appliances, Home Décor,
              Furniture, Gifts, and allied sectors.
            </p>

            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              The exhibition attracts established brands, emerging businesses,
              manufacturers, distributors, and suppliers looking to expand their
              business reach and connect with the right trade audience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
