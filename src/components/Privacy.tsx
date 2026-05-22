"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Privacy Policy";
const FALLBACK_PARAS = [
  "Fusion The Era respects the trust placed by exhibitors, visitors, and business associates while interacting with the platform.",
  "Information collected through registrations, enquiries, subscriptions, or direct communication is used only for managing exhibition operations, improving user experience, and sharing relevant event information.",
  "We maintain internal practices intended to safeguard user information and support secure communication across all official platforms connected with Fusion The Era.",
];

export default function Privacy() {
  const cms = usePageContent("privacy");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="privacy"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl text-white">{title}</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>
            <p className="mt-4 text-md leading-7 text-black text-justify">{paragraphs.join(" ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
