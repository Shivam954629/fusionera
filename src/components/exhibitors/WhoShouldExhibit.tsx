"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Who Should Exhibit";
const FALLBACK_PARAS = [
  "Fusion The Era is an ideal platform for companies looking to expand their business presence within India's growing home and hospitality market. The exhibition welcomes manufacturers, brands, importers, exporters, distributors, and suppliers from sectors including Houseware, HORECA, Stainless Steel Products, Kitchenware, Home Appliances, Décor, Furniture, and Lifestyle Solutions.",
  "Businesses aiming to launch new products, strengthen dealer networks, increase brand visibility, and connect with qualified trade buyers will find valuable opportunities through the exhibition.",
];

export default function WhoShouldExhibit() {
  const cms = usePageContent("who-should-exhibit");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="WhoShouldExhibit"
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
            <p className="mt-4 text-md leading-7 text-black text-justify">{paragraphs.join(" ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
