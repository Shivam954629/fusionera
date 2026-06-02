"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Terms of Service";

const FALLBACK_PARAS = [
  "Fusion The Era serves as a business networking and sourcing platform for professionals connected with the home and hospitality industry.",
  "The organizers reserve the right to revise exhibition schedules, policies, participation criteria, or operational arrangements whenever required for effective event management.",
  "Users may not reproduce, distribute, or commercially use any branding, website content, graphics, or exhibition materials associated with Fusion The Era without authorization.",
  "All participants are expected to maintain professional standards and cooperate with exhibition guidelines during the event.",
];

export default function Terms() {
  const cms = usePageContent("terms");

  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs?.length
    ? cms.paragraphs
    : FALLBACK_PARAS;

  return (
    <section
      id="terms"
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