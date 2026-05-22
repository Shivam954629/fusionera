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
    <section
      id="terms"
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
            <p className="mt-4 text-md leading-7 text-black text-justify">{paragraphs.join(" ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
