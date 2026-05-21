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
    <section id="WhoShouldExhibit" className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom" style={{ background: "#fef9c3" }} data-reveal-delay="50">
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
