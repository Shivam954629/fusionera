import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { productList } from '../util';

export default function Section2() {
  const [portfolioModal, setPortfolioModal] = useState<{ src: string; alt: string; title: string } | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPortfolioModal(null);
    };

    if (portfolioModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [portfolioModal]);

  return (
    <>
      <section id="houseware" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:py-10 lg:px-10 reveal-on-scroll"
        data-reveal-delay="0">
        <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff] p-4 shadow-sm sm:p-6 md:p-8">

          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Product Portfolio</h2>
              <p className="mt-3 text-sm leading-7 text-gray-500 md:text-base">
                Indian and International brands, importers, manufacturers and distributors, private label suppliers, startup brands and specialized producers.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 focus:outline-none active:bg-white sm:w-auto"
            >
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
              productList.filter((p, i) => i < 8).map((p1, i1) =>
                <article
                  key={i1}
                  className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <button
                    type="button"
                    onClick={() => setPortfolioModal({ src: p1.src, alt: p1.title, title: p1.title })}
                    className="block w-full overflow-hidden rounded-lg"
                    aria-label={`Open ${p1.title} image in full view`}
                  >
                    <img src={p1.src}
                      alt={p1.title}
                      className="h-44 w-full rounded-lg object-cover transition duration-300 group-hover:scale-105 cursor-pointer" />
                  </button>
                  <h3 className="mt-3 text-lg font-semibold text-gray-900">{p1.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{p1.desc}</p>
                </article>
              )
            }
          </div>
        </div>
      </section>

      {portfolioModal && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setPortfolioModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${portfolioModal.title} full image preview`}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPortfolioModal(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-gray-900/70 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-gray-900"
              aria-label="Close full image preview"
            >
              ✕
            </button>
            <img
              src={portfolioModal.src}
              alt={portfolioModal.alt}
              className="h-[70vh] w-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  )
}
