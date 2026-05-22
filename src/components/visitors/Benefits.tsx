"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";

const FALLBACK_TITLE = "Visitor Benefits";

export default function Benefits() {
  const cms = usePageContent("visitor-benefits");
  const title = cms?.title || FALLBACK_TITLE;

  return (
    <section
      id="benefits"
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
            <div className="mt-4 text-md leading-7 text-black text-justify">
              {cms?.paragraphs.length ? (
                <p>{cms.paragraphs.join(" ")}</p>
              ) : (
                <>
                  <p>Fusion The Era helps trade visitors reduce sourcing time, optimize business travel costs, and explore a wide variety of products, suppliers, and business opportunities from India and international markets under one integrated business platform within four exhibition days. Strategically scheduled during an important buying and sourcing period, the exhibition supports retailers, distributors, hospitality buyers, and sourcing professionals in preparing for upcoming business and retail seasons.</p>
                  <p className="mt-0">Fusion The Era offers trade visitors multiple business advantages under one roof:</p>
                  <ul className="list-disc pl-5">
                    <li>Explore the latest product innovations and premium collections from Indian and international brands, manufacturers, importers, and suppliers across houseware, kitchenware, home décor, furniture, horeca, gifting, appliances, and lifestyle categories.</li>
                    <li>Connect with new suppliers while strengthening relationships with existing business partners within a focused and competitive trade environment.</li>
                    <li>Understand emerging market movements, consumer buying patterns, design directions, merchandising concepts, and upcoming business trends.</li>
                    <li>Discover fresh business ideas, sourcing opportunities, and category expansion possibilities for retail and distribution growth.</li>
                    <li>Interact and network with industry professionals, trade associates, sourcing experts, retailers, distributors, and business communities connected with the home and lifestyle sector.</li>
                  </ul>
                  <p>At Fusion The Era 2026, trade visitors will have the opportunity to:</p>
                  <ul className="list-disc pl-5">
                    <li>Experience and source products from hundreds of leading brands, manufacturers, importers, distributors, wholesalers, and service providers from India and international markets.</li>
                    <li>Explore houseware, kitchenware, home décor, furniture, horeca solutions, lifestyle products, glassware, gifting products, appliances, and modern home innovations under one professionally managed exhibition platform.</li>
                    <li>Gain direct insights into product trends, pricing strategies, merchandising concepts, evolving consumer preferences, and current market developments.</li>
                    <li>Discover upcoming design inspirations, home styling concepts, retail trends, and lifestyle innovations influencing the market for 2026–27.</li>
                    <li>Identify new product launches, innovative business solutions, improved quality offerings, and competitively priced sourcing opportunities.</li>
                    <li>Build long-term sourcing partnerships and connect with reliable suppliers for consistent business growth and future expansion opportunities.</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
