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
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section id="terms" className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom" style={{ background: "#fef9c3" }} data-reveal-delay="50">
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
