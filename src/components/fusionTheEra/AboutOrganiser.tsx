"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "About the Organizer";
const FALLBACK_PARAS = [
  "Fusion The Era is organized by V-Tech Innovation Services, a company committed to creating impactful business exhibitions and industry-focused networking platforms. With a vision to connect businesses through professionally managed trade events, the organization focuses on delivering quality experiences, strong industry outreach, and meaningful business opportunities for exhibitors and visitors alike.",
];

export default function AboutOrganizer() {
  const cms = usePageContent("about-organizer");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="Benefits"
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
              <p key={i} className="mt-4 text-md leading-7  text-black">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
