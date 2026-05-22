"use client";
import React, { useEffect, useState } from "react";

const FALLBACK_TITLE = "Who Should Visit?";
const FALLBACK_CONTENT = "Retail businesses including home furnishing stores, department stores, lifestyle retailers, hypermarkets, specialty outlets, modern trade chains, traditional retail shops dealing in home textiles, décor, furniture, kitchenware, houseware, gifting products, and lifestyle accessories should visit Fusion The Era to discover the latest Indian and international product collections, sourcing opportunities, market developments, and emerging trends in design, materials, colours, finishes, and contemporary living concepts. Fusion The Era offers an ideal sourcing platform for innovative and premium-quality products across categories such as home textiles, furnishing fabrics, mattresses, rugs, carpets, décor accessories, wallpapers, blinds, decorative glassware, ceramic collections, figurines, candles, fragrance products, handicrafts, designer accessories, tableware, cookware, kitchenware, home utility products, appliances, and modern houseware solutions. Retailers, wholesalers, distributors, dealers, and trade professionals associated with home décor, furniture, kitchenware, cookware, crockery, plasticware, glassware, gifting products, and lifestyle retail businesses will find the exhibition highly beneficial for connecting with manufacturers, brands, importers, exporters, and sourcing partners while exploring new product launches and business opportunities. Corporate gifting companies, institutional procurement teams, and gifting solution providers can explore a wide range of innovative gifting products along with reliable domestic and international suppliers. Institutional buyers from sectors such as hospitality, hotels, healthcare, real estate, and commercial projects can identify sourcing solutions for furnishing, housekeeping, utility, décor, and lifestyle product requirements. Indian importers, distributors, wholesalers, sourcing consultants, trade representatives, and channel partners will also gain valuable opportunities to connect with Indian and international manufacturers, brands, exporters, and companies looking to expand their dealer networks, appoint distribution partners, and strengthen their market presence across regional and national business markets in India.";

export default function WhoShouldVisit() {
  const [title, setTitle] = useState(FALLBACK_TITLE);
  const [content, setContent] = useState(FALLBACK_CONTENT);

  useEffect(() => {
    fetch("/api/admin/content", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const entry = (data?.data ?? []).find(
          (c: { key: string; is_published: boolean }) =>
            c.key === "who-should-visit" && c.is_published,
        );
        if (entry) {
          if (entry.title) setTitle(entry.title);
          if (entry.content) setContent(entry.content.trim());
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="WhoShouldVisit"
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
            <p className="mt-4 text-md leading-7 text-black text-justify">
              {content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
