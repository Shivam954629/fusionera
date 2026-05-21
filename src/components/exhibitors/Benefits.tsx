"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Benefits";
const FALLBACK_PARAS = [
  "Exhibiting at Fusion The Era offers businesses a valuable opportunity to connect with a targeted trade audience and accelerate market growth.",
  "Direct access to qualified buyers and distributors, strong brand visibility within the industry, opportunities for product launches and demonstrations, networking with retailers, hospitality buyers, and sourcing teams, and expansion of dealer and distribution networks.",
];

export default function Benefits() {
  const cms = usePageContent("exhibitor-benefits");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section id="Benefits" className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom" style={{ background: "#fef9c3" }} data-reveal-delay="50">
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
