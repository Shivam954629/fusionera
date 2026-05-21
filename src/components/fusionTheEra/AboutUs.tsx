"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "About Fusion The Era";
const FALLBACK_PARAS = [
  "Fusion The Era is a professionally curated B2B exhibition focused on the evolving home and lifestyle industry in India. The exhibition brings together manufacturers, brands, importers, exporters, distributors, retailers, institutional buyers, hospitality professionals, architects, and interior designers from across domestic and international markets under one integrated business destination.",
  "Focused on categories such as houseware, kitchenware, stainless steel products, horeca solutions, home décor, furniture, appliances, glassware, melamine ware, baking products, plasticware, lifestyle accessories, and modern home innovations, Fusion The Era is designed to support business networking, product sourcing, distribution expansion, and market visibility for participating companies.",
  "The exhibition creates a business-driven environment where exhibitors can introduce new collections, product concepts, seasonal launches, and innovative solutions directly to key decision-makers and serious trade buyers. With participation from established companies as well as emerging brands, Fusion The Era offers valuable opportunities for industry collaboration, business development, and long-term commercial partnerships.",
  "India continues to witness rapid growth in the home, hospitality, lifestyle, and retail sectors, driven by increasing urban development, changing consumer preferences, rising purchasing power, and demand for contemporary living products. Fusion The Era serves as an effective business gateway for companies aiming to strengthen their presence within this expanding market and connect with qualified buyers from multiple trade segments.",
  "The exhibition attracts a diverse visitor profile including retailers, wholesalers, distributors, dealers, importers, hospitality buyers, sourcing professionals, modern retail chains, procurement heads, interior consultants, and project buyers actively seeking innovative products and reliable supply partners.",
  "Fusion The Era is also positioned as a trend-focused industry gathering where businesses can explore emerging market directions, evolving consumer demands, innovative product designs, and new merchandising opportunities across the home and lifestyle segment.",
  "Scheduled strategically ahead of major buying and sourcing cycles, Fusion The Era provides exhibitors with the opportunity to engage with active buyers during an important business period.",
  "The upcoming edition of Fusion The Era 2026 will be held from 04–07 July 2026 at Bharat Mandapam, Pragati Maidan, New Delhi, India.",
];

export default function AboutUs() {
  const cms = usePageContent("about-fusion");
  const title = cms?.title || FALLBACK_TITLE;
  const paragraphs = cms?.paragraphs.length ? cms.paragraphs : FALLBACK_PARAS;

  return (
    <section
      id="about"
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
              <p
                key={i}
                className="mt-4 text-md leading-7 text-justify text-black"
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
