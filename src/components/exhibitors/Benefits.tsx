"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Benefits";

const FALLBACK_PARAS = [
  "Exhibiting at Fusion The Era offers businesses a valuable opportunity to connect with a targeted trade audience and accelerate market growth.",
];

const BENEFITS_POINTS = [
  "Direct access to qualified buyers and distributors",
  "Strong brand visibility within the industry",
  "Opportunities for product launches and demonstrations",
  "Networking with retailers, hospitality buyers, and sourcing teams",
  "Expansion of dealer and distribution networks",
  "Business growth and market expansion opportunities",
];

export default function Benefits() {
  const cms = usePageContent("exhibitor-benefits");

  const title = cms?.title || FALLBACK_TITLE;

  const paragraphs =
    cms?.paragraphs?.length > 0
      ? cms.paragraphs
      : FALLBACK_PARAS;

  return (
    <section
      id="Benefits"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            {/* Heading */}
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {title}
              </h2>

              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>

            {/* Intro */}
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="mt-4 text-md leading-7 text-black text-justify"
              >
                {para}
              </p>
            ))}

            {/* Highlight Benefits */}
            <div className="mt-8">
              <div className="inline-block">
                <h3 className="text-xl font-bold text-white md:text-2xl">
                  Key Benefits
                </h3>

                <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {BENEFITS_POINTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-white/90 px-4 py-3 text-sm leading-6 text-[#00509d] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="mt-1 text-[#f0b429]">●</span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}