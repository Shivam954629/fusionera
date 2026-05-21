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
    <section id="list" className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom" style={{ background: "#fef9c3" }} data-reveal-delay="50">
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
