"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Exhibitor Profile";
const FALLBACK_PARAS = [
  "Fusion The Era features participation from Indian and international companies representing Houseware, HORECA Products, Stainless Steel, Kitchenware, Home Appliances, Home Décor, Furniture, Gifts, and allied sectors.",
  "The exhibition attracts established brands, emerging businesses, manufacturers, distributors, and suppliers looking to expand their business reach and connect with the right trade audience.",
];

export default function Profile() {
  const cms = usePageContent("exhibitor-profile");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs?.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="profile"
      className="w-full bg-[#5B9BD5] py-6 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative py-4 text-[#00509d] sm:py-6 md:py-8">
          <div className="w-fit">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              {title}
            </h2>
            <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
          </div>

          <div className="mt-4 space-y-3 md:space-y-4">
            {paragraphs.map((para, index) => (
              <p
                key={index}
                className="text-left text-sm leading-6 text-black sm:text-base sm:leading-7 md:text-justify"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}