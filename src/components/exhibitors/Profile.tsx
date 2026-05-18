"use client";
import React from "react";

export default function Profile() {
  return (
    <section
      id="profile"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-white shadow-sm">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Exhibitor Profile
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era features participation from Indian and
              international companies representing Houseware, HORECA Products,
              Stainless Steel, Kitchenware, Home Appliances, Home Décor,
              Furniture, Gifts, and allied sectors.
            </p>

            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
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
