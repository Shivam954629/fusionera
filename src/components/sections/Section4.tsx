import React from 'react'

export default function Section4() {
  return (
    <section id="why" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll"
      data-reveal-delay="0">
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff] p-4 shadow-sm sm:p-5 md:p-8 lg:rounded-3xl">

        <div className="relative mb-6 flex flex-col gap-3 md:mb-8">
          <h2 className="text-3xl font-bold leading-tight text-[#1a1464] sm:text-4xl lg:text-5xl">
            Why Fusion The Era?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-xl font-bold text-gray-900 md:text-2xl">Direct B2B Connections</h3>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              Meet hypermarkets, hotel chains, retailers and serious trade buyers face-to-face.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-xl font-bold text-gray-900 md:text-2xl">Indian &amp; Global Brands</h3>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              Connect with 600+ exhibitors — Indian manufacturers, importers, private labels and global brands.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-xl font-bold text-gray-900 md:text-2xl">Pragati Maidan, Delhi</h3>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              Bharat Mandapam — International Exhibition &amp; Convention Centre. World-class infrastructure.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-xl font-bold text-gray-900 md:text-2xl">Targeted Trade Audience</h3>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              50,000+ qualified trade visitors from 460 cities. Only B2B — no retail consumers.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-xl font-bold text-gray-900 md:text-2xl">Full Stall Support</h3>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              In-house stall fabrication, design to installation. Just show up and sell.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h3 className="text-xl font-bold text-gray-900 md:text-2xl">360° Promotion</h3>
            <p className="mt-3 text-sm leading-7 text-gray-500 md:text-[15px]">
              Massive digital + physical outreach — WhatsApp, SMS, Email, banners, hoardings, TV, radio.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
