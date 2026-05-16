import React from 'react'

export default function Section3() {
  return (
    <section id="about" className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll"
      data-reveal-delay="0">
      <div className="relative overflow-hidden rounded-3xl border border-[#1b2440]/10 bg-gradient-to-br from-[#f7fbff] via-[#eef5ff] to-[#fff5ea] p-5 shadow-[0_22px_50px_rgba(38,72,125,0.14)] md:p-8">
        <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-[#7bc4ff]/25 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-[#ffc88a]/25 blur-3xl"></div>

        <div className="relative mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-[#3d66d6]/25 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3d66d6]">
              Fusion The Era
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-[#172445] md:text-4xl">
              India&apos;s Business-First Houseware Trade Platform
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#23355d]/80 md:text-base">
            Where global and Indian suppliers meet high-intent buyers from retail, distribution, institutional procurement, and design-led commerce.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_10px_24px_rgba(34,55,99,0.08)] backdrop-blur-sm md:p-6">
            <h3 className="text-xl font-bold text-[#172445] md:text-2xl">About Fusion The Era</h3>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/85 md:text-[15px]">
              FUSION THE ERA is India&apos;s dedicated B2B trade show for Houseware, HORECA Ware, Stainless Steel, and Home Appliances. Organized by V-Tech Innovation Services, it connects Indian and international brands, manufacturers, importers, and exporters with serious trade buyers across the country.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/80 md:text-[15px]">
              Strong and consistent business outcomes since inception have made it a must-attend annual event for companies targeting India&apos;s fast-growing domestic home products market.
            </p>
          </article>

          <article className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_10px_24px_rgba(34,55,99,0.08)] backdrop-blur-sm md:p-6">
            <h3 className="text-xl font-bold text-[#172445] md:text-2xl">Exhibitor Profile</h3>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/85 md:text-[15px]">
              Exhibitors include leading Indian and international brands, manufacturers, exporters, importers, and national distributors across Houseware, Home Decor, Home Furniture, Home Appliances, Gifts, and allied segments.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/80 md:text-[15px]">
              The platform supports market expansion, product launches, and trade scheme rollouts to active dealer and distributor networks, attracting 50,000+ trade visitors from 460+ cities.
            </p>
          </article>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3 md:mt-8 md:grid-cols-3">
          <div className="rounded-xl border border-[#3e66d7]/15 bg-white/85 px-4 py-3 text-center">
            <p className="text-xl font-bold text-[#1d2b52] md:text-2xl">50,000+</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#59719f]">Trade Visitors</p>
          </div>
          <div className="rounded-xl border border-[#3e66d7]/15 bg-white/85 px-4 py-3 text-center">
            <p className="text-xl font-bold text-[#1d2b52] md:text-2xl">460+</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#59719f]">Cities Reached</p>
          </div>
          <div className="rounded-xl border border-[#3e66d7]/15 bg-white/85 px-4 py-3 text-center">
            <p className="text-xl font-bold text-[#1d2b52] md:text-2xl">4+</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#59719f]">Core Categories</p>
          </div>
          {/* <div className="rounded-xl border border-[#3e66d7]/15 bg-white/85 px-4 py-3 text-center">
                <p className="text-xl font-bold text-[#1d2b52] md:text-2xl">B2B</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#59719f]">Business Focus</p>
              </div> */}
        </div>
      </div>
    </section>
  )
}
