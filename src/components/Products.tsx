"use client";

import React, { useEffect, useState } from "react";
import { productList } from "./util";

export default function Products() {
  const [portfolioModal, setPortfolioModal] = useState<{
    images: string[];
    title: string;
    activeIndex: number;
  } | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPortfolioModal(null);
      if (event.key === "ArrowRight" && portfolioModal) {
        setPortfolioModal((prev) =>
          prev
            ? {
                ...prev,
                activeIndex: (prev.activeIndex + 1) % prev.images.length,
              }
            : null,
        );
      }
      if (event.key === "ArrowLeft" && portfolioModal) {
        setPortfolioModal((prev) =>
          prev
            ? {
                ...prev,
                activeIndex:
                  (prev.activeIndex - 1 + prev.images.length) %
                  prev.images.length,
              }
            : null,
        );
      }
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

  const openModal = (product: (typeof productList)[0]) => {
    setPortfolioModal({
      images: product.gallery || [product.src],
      title: product.title,
      activeIndex: 0,
    });
  };

  return (
    <>
      <section
        id="houseware"
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:py-10 lg:px-10"
        data-reveal-delay="0"
      >
        <div className="relative overflow-hidden rounded-2xl p-4 shadow-sm sm:p-6 md:p-8" style={{ border: "1px solid rgba(26,20,100,0.1)", background: "#f0f4f8" }}>

          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                Product Portfolio
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-600 md:text-base">
                Indian and International brands, importers, manufacturers and
                distributors, private label suppliers, startup brands and
                specialized producers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productList.map((p1, i1) => (
              <article
                key={i1}
                className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => openModal(p1)}
                  className="block w-full overflow-hidden rounded-lg relative"
                  aria-label={`Open ${p1.title} image gallery`}
                >
                  <img
                    src={p1.src}
                    alt={p1.title}
                    className="h-44 w-full rounded-lg object-cover transition duration-300 group-hover:scale-105 cursor-pointer"
                  />
                  {/* Gallery count badge */}
                  {p1.gallery && p1.gallery.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {p1.gallery.length}
                    </div>
                  )}
                  {/* Click to view overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      View Gallery
                    </span>
                  </div>
                </button>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {p1.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{p1.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {portfolioModal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[#02071f]/90 p-4 backdrop-blur-sm"
          onClick={() => setPortfolioModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${portfolioModal.title} gallery`}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
              <h3 className="text-gray-900 font-bold text-lg">
                {portfolioModal.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">
                  {portfolioModal.activeIndex + 1} /{" "}
                  {portfolioModal.images.length}
                </span>
                <button
                  type="button"
                  onClick={() => setPortfolioModal(null)}
                  className="rounded-full bg-gray-100 hover:bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 transition"
                  aria-label="Close gallery"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative bg-gray-50" style={{ height: "60vh", width: "100%" }}>
              <img
                src={portfolioModal.images[portfolioModal.activeIndex]}
                alt={`${portfolioModal.title} - image ${portfolioModal.activeIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Prev/Next Arrows */}
              {portfolioModal.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setPortfolioModal((prev) =>
                        prev
                          ? {
                              ...prev,
                              activeIndex:
                                (prev.activeIndex - 1 + prev.images.length) %
                                prev.images.length,
                            }
                          : null,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition text-lg"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() =>
                      setPortfolioModal((prev) =>
                        prev
                          ? {
                              ...prev,
                              activeIndex:
                                (prev.activeIndex + 1) % prev.images.length,
                            }
                          : null,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition text-lg"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {portfolioModal.images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-gray-100">
                {portfolioModal.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      setPortfolioModal((prev) =>
                        prev ? { ...prev, activeIndex: idx } : null,
                      )
                    }
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${idx === portfolioModal.activeIndex ? "border-[#e84030]" : "border-white/10 hover:border-white/30"}`}
                  >
                    <img
                      src={img}
                      alt={`thumb ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
