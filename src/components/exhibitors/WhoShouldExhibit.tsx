"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Who Should Exhibit";

const FALLBACK_PARAS = [
  "Fusion The Era is an ideal platform for companies looking to expand their business presence within India's growing home and hospitality market.",
];

const EXHIBIT_TOPICS = [
  "Manufacturers",
  "Brands",
  "Importers",
  "Exporters",
  "Distributors",
  "Suppliers",
  "Houseware",
  "HORECA",
  "Stainless Steel Products",
  "Kitchenware",
  "Home Appliances",
  "Home Décor",
  "Furniture",
  "Lifestyle Solutions",
];

export default function WhoShouldExhibit() {
  const cms = usePageContent("who-should-exhibit");

  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs?.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="WhoShouldExhibit"
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

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EXHIBIT_TOPICS.map((topic) => (
              <li
                key={topic}
                className="flex items-center gap-3 rounded-xl border border-[#00509d]/15 bg-white/90 px-4 py-3 text-sm font-medium text-[#00509d] shadow-sm"
              >
                <span className="flex-shrink-0 text-[#f0b429]">●</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-left text-sm leading-6 text-black sm:text-base sm:leading-7 md:text-justify">
            Businesses aiming to launch new products, strengthen dealer
            networks, increase brand visibility, and connect with qualified
            trade buyers will find valuable opportunities through the exhibition.
          </p>
        </div>
      </div>
    </section>
  );
}