import React from 'react'

export default function Section3() {
  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll"
      data-reveal-delay="0">
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-8 lg:rounded-3xl">

        <div className="relative mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-[#1a1464] sm:text-4xl lg:text-5xl">
              India&apos;s Business-First Houseware Trade Platform
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-gray-500 md:text-base">
            Where global and Indian suppliers meet high-intent buyers from retail, distribution, institutional procurement, and design-led commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-xl font-bold text-gray-900 md:text-2xl">About Fusion The Era</h3>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              FUSION THE ERA is India&apos;s dedicated B2B trade show for Houseware, HORECA Ware, Stainless Steel, and Home Appliances. Organized by V-Tech Innovation Services, it connects Indian and international brands, manufacturers, importers, and exporters with serious trade buyers across the country.
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              Strong and consistent business outcomes since inception have made it a must-attend annual event for companies targeting India&apos;s fast-growing domestic home products market.
            </p>
          </article>

          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-xl font-bold text-gray-900 md:text-2xl">Exhibitor Profile</h3>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              Exhibitors include leading Indian and international brands, manufacturers, exporters, importers, and national distributors across Houseware, Home Decor, Home Furniture, Home Appliances, Gifts, and allied segments.
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              The platform supports market expansion, product launches, and trade scheme rollouts to active dealer and distributor networks, attracting 50,000+ trade visitors from 460+ cities.
            </p>
          </article>
        </div>

        <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
            <p className="text-2xl font-bold text-[#1a1464] md:text-3xl">50,000+</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-gray-400">Trade Visitors</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
            <p className="text-2xl font-bold text-[#1a1464] md:text-3xl">460+</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-gray-400">Cities Reached</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
            <p className="text-2xl font-bold text-[#1a1464] md:text-3xl">4+</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-gray-400">Core Categories</p>
          </div>
        </div>
      </div>
    </section>
  )
}
