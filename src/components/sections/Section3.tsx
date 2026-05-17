import React from 'react'

export default function Section3() {
  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll"
      data-reveal-delay="0">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(7,11,52,0.92)_0%,rgba(11,30,91,0.9)_48%,rgba(17,45,122,0.88)_100%)] p-4 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-5 md:p-8 lg:rounded-3xl">
        <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-[#7bc4ff]/25 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-[#ffc88a]/25 blur-3xl"></div>

        <div className="relative mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              India&apos;s Business-First Houseware Trade Platform
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-gray-300 md:text-base">
            Where global and Indian suppliers meet high-intent buyers from retail, distribution, institutional procurement, and design-led commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-6">
            <h3 className="text-xl font-bold text-white md:text-2xl">About Fusion The Era</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              FUSION THE ERA is India&apos;s dedicated B2B trade show for Houseware, HORECA Ware, Stainless Steel, and Home Appliances. Organized by V-Tech Innovation Services, it connects Indian and international brands, manufacturers, importers, and exporters with serious trade buyers across the country.
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              Strong and consistent business outcomes since inception have made it a must-attend annual event for companies targeting India&apos;s fast-growing domestic home products market.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-6">
            <h3 className="text-xl font-bold text-white md:text-2xl">Exhibitor Profile</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              Exhibitors include leading Indian and international brands, manufacturers, exporters, importers, and national distributors across Houseware, Home Decor, Home Furniture, Home Appliances, Gifts, and allied segments.
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              The platform supports market expansion, product launches, and trade scheme rollouts to active dealer and distributor networks, attracting 50,000+ trade visitors from 460+ cities.
            </p>
          </article>
        </div>

        <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-center">
            <p className="text-xl font-bold text-white md:text-2xl">50,000+</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Trade Visitors</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-center">
            <p className="text-xl font-bold text-white md:text-2xl">460+</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Cities Reached</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-center">
            <p className="text-xl font-bold text-white md:text-2xl">4+</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Core Categories</p>
          </div>
          {/* <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-center">
                <p className="text-xl font-bold text-white md:text-2xl">B2B</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400">Business Focus</p>
              </div> */}
        </div>
      </div>
    </section>
  )
}
