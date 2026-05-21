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
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>
        {title}
      </h2>
      {paragraphs.map((para, i) => (
        <p key={i} className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>
          {para}
        </p>
      ))}
    </section>
  );
}
