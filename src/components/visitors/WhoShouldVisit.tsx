"use client";
import React, { useEffect, useState } from "react";

const FALLBACK_TITLE = "Who Should Visit";
const FALLBACK_PARAGRAPHS = [
  "Fusion The Era is designed for decision-makers and trade professionals seeking quality products, trusted suppliers, and new business opportunities within the home and hospitality sector.",
  "The exhibition attracts Retailers & Modern Trade Buyers, Dealers & Distribution Networks, Hotel & Hospitality Procurement Teams, Importers & Exporters, Interior & Design Professionals, Corporate & Institutional Buyers, and E-commerce & Marketplace Sellers.",
  "The event offers a business-first environment where networking, sourcing, and collaboration happen naturally under one roof.",
];

export default function WhoShouldVisit() {
  const [title, setTitle] = useState(FALLBACK_TITLE);
  const [paragraphs, setParagraphs] = useState<string[]>(FALLBACK_PARAGRAPHS);

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
          if (entry.content) {
            const paras = entry.content
              .split(/\n\n+/)
              .map((p: string) => p.trim())
              .filter(Boolean);
            if (paras.length > 0) setParagraphs(paras);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="WhoShouldVisit"
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
