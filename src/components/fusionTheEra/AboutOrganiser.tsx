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
    <section id="Benefits" className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom" style={{ background: "#fef9c3" }} data-reveal-delay="50">
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
