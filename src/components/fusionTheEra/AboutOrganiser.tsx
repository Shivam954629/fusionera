"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "About the Organizer";
const FALLBACK_CONTENT = "Fusion The Era is organized by V-Tech Innovation Services, a company committed to creating impactful business exhibitions and industry-focused networking platforms across India. With a strong vision to connect manufacturers, suppliers, distributors, and trade buyers through professionally managed B2B trade events, V-Tech Innovation Services brings together its deep industry knowledge, extensive network, and operational expertise to deliver high-quality exhibition experiences. The organization focuses on supporting India's growing home, hospitality, and lifestyle trade ecosystem by building meaningful platforms where businesses can discover products, forge partnerships, and expand their market reach. V-Tech Innovation Services is dedicated to ensuring that every edition of Fusion The Era meets the highest standards of organization, visitor experience, and business opportunity generation. The team works closely with exhibitors, trade associations, industry bodies, and business communities to create a well-curated and professionally managed event environment that delivers real value to all participants. Fusion The Era 2026, the first edition of this landmark trade show, is being held at Bharat Mandapam, Pragati Maidan, New Delhi from July 4 to 7, 2026 — bringing together India's finest houseware, HORECA ware, stainless steel, home appliances, and allied industries under one prestigious roof.";

export default function AboutOrganizer() {
  const cms = usePageContent("about-organizer");
  const title = cms?.title || FALLBACK_TITLE;
  const content = cms?.paragraphs.length
    ? cms.paragraphs.join(" ")
    : FALLBACK_CONTENT;

  return (
    <section
      id="AboutOrganizer"
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
            <p className="mt-4 text-md leading-7 text-black text-justify">
              {content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
