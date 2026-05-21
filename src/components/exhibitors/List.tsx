"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Exhibitor List";
const FALLBACK_PARAS = [
  "Fusion The Era hosts participation from a wide range of Indian and international exhibitors representing the home and hospitality industry.",
  "The exhibitor list includes Houseware Brands, Kitchenware Manufacturers, HORECA Solution Providers, Home Appliance Companies, Stainless Steel Product Suppliers, Home Décor & Lifestyle Brands, and Furniture & Utility Product Companies.",
];

export default function List() {
  const cms = usePageContent("exhibitor-list");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="list"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#cae9ff]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="mt-4 text-md leading-7 text-justify text-black"
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
