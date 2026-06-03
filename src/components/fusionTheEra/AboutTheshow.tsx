"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "About the Show";
const FALLBACK_PARAS = [
  "Fusion The Era is more than just an exhibition — it is a business networking destination for the home and hospitality industry. The show brings together brands, manufacturers, retailers, distributors, and hospitality professionals under one roof to discover trends, exchange ideas, and create new business opportunities.",
  "The exhibition is exclusively focused on B2B interactions and professional trade engagement, ensuring that every visitor and exhibitor gains meaningful business value from their participation.",
];

export default function AboutTheShow() {
  const cms = usePageContent("about-the-show");
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
                className="text-sm leading-6 text-black text-left sm:text-base sm:leading-7 md:text-justify"
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