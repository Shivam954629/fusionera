import React from 'react'

export default function Section4() {
  return (
    <section id="houseware" className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll"
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
              Why Fusion The Era?
            </h2>
          </div>
          {/* <p className="max-w-xl text-sm leading-6 text-[#23355d]/80 md:text-base">
                Where global and Indian suppliers meet high-intent buyers from retail, distribution, institutional procurement, and design-led commerce.
              </p> */}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_10px_24px_rgba(34,55,99,0.08)] backdrop-blur-sm md:p-6">
            <h3 className="text-xl font-bold text-[#172445] md:text-2xl">Direct B2B Connections</h3>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/85 md:text-[15px]">
              FMeet hypermarkets, hotel chains, retailers and serious trade buyers face-to-face.
            </p>
          </article>
          <article className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_10px_24px_rgba(34,55,99,0.08)] backdrop-blur-sm md:p-6">
            <h3 className="text-xl font-bold text-[#172445] md:text-2xl">Indian & Global Brands</h3>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/85 md:text-[15px]">
              onnect with 600+ exhibitors — Indian manufacturers, importers, private labels and global brands.
            </p>
          </article>
          <article className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_10px_24px_rgba(34,55,99,0.08)] backdrop-blur-sm md:p-6">
            <h3 className="text-xl font-bold text-[#172445] md:text-2xl">Pragati Maidan, Delhi</h3>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/85 md:text-[15px]">
              Bharat Mandapam — International Exhibition & Convention Centre. World-class infrastructure.
            </p>
          </article>
          <article className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_10px_24px_rgba(34,55,99,0.08)] backdrop-blur-sm md:p-6">
            <h3 className="text-xl font-bold text-[#172445] md:text-2xl">Targeted Trade Audience</h3>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/85 md:text-[15px]">
              50,000+ qualified trade visitors from 460 cities. Only B2B — no retail consumers.
            </p>
          </article>
          <article className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_10px_24px_rgba(34,55,99,0.08)] backdrop-blur-sm md:p-6">
            <h3 className="text-xl font-bold text-[#172445] md:text-2xl">Full Stall Support</h3>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/85 md:text-[15px]">
              In-house stall fabrication, design to installation. Just show up and sell.
            </p>
          </article>
          <article className="rounded-2xl border border-white/75 bg-white/80 p-5 shadow-[0_10px_24px_rgba(34,55,99,0.08)] backdrop-blur-sm md:p-6">
            <h3 className="text-xl font-bold text-[#172445] md:text-2xl">360° Promotion</h3>
            <p className="mt-3 text-sm leading-7 text-[#1b2440]/85 md:text-[15px]">
              Massive digital + physical outreach — WhatsApp, SMS, Email, banners, hoardings, TV, radio.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
