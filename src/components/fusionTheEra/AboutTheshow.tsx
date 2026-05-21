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
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section id="profile" className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom" style={{ background: "#fef9c3" }} data-reveal-delay="50">
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
