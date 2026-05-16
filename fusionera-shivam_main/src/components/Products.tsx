"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { productList } from "./util";

export default function Products() {
  const [portfolioModal, setPortfolioModal] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPortfolioModal(null);
    };

    if (portfolioModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [portfolioModal]);

  return (
    <>
      <section
        id="houseware"
        className="mx-auto w-[92%] max-w-7xl py-6 md:py-10"
        data-reveal-delay="0"
      >
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(27,36,64,0.12)] bg-gradient-to-br from-[#f9fcff] via-[#eff6ff] to-[#fff6ed] p-6 shadow-[0_20px_45px_rgba(38,72,125,0.12)] md:p-8">
          <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#7dc8ff]/30 blur-2xl"></div>
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-[#ffd59f]/40 blur-2xl"></div>

          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-[#3e7bff]/20 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#2f5ab8]">
                Featured Vertical
              </p>
              <h2 className="text-3xl font-bold text-[#172445] md:text-4xl">
                Product Portfolio
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#2d3b5f]/85 md:text-base">
                Indian and International brands, importers, manufacturers and
                distributors, private label suppliers, startup brands and
                specialized producers.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productList.map((p1, i1) => (
              <article
                key={i1}
                className="group cursor-pointer rounded-xl border border-[rgba(27,36,64,0.12)] bg-white/90 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8fb8ff]/30"
              >
                <button
                  type="button"
                  onClick={() =>
                    setPortfolioModal({
                      src: p1.src,
                      alt: "Premium glass ware set on dining table",
                      title: "Home Appliances",
                    })
                  }
                  className="block w-full overflow-hidden rounded-lg"
                  aria-label="Open Home Appliances image in full view"
                >
                  <img
                    src={p1.src}
                    alt="Premium glass ware set on dining table"
                    className="h-44 w-full rounded-lg object-cover transition duration-300 group-hover:scale-105 cursor-pointer"
                  />
                </button>
                <h3 className="mt-3 text-lg font-semibold text-[#1a2748]">
                  {p1.title}
                </h3>
                <p className="mt-2 text-sm text-[#32456b]/80">{p1.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {portfolioModal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[#02071f]/85 p-4 backdrop-blur-sm"
          onClick={() => setPortfolioModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${portfolioModal.title} full image preview`}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-[0_28px_65px_rgba(0,0,0,0.6)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPortfolioModal(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/55 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-black/75"
              aria-label="Close full image preview"
            >
              ✕
            </button>
            <img
              src={portfolioModal.src}
              alt={portfolioModal.alt}
              className="max-h-[85vh] w-full object-contain bg-[#071239]"
            />
          </div>
        </div>
      )}
    </>
  );
}
