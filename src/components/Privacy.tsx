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
    <section id="privacy" className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom" style={{ background: "#fef9c3" }} data-reveal-delay="50">
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>{title}</h2>
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>{para}</p>
      ))}
    </section>
  );
}
