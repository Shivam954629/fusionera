import React from 'react'

export default function Section4() {
  return (
    <section id="why" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll"
      data-reveal-delay="0">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(7,11,52,0.92)_0%,rgba(11,30,91,0.9)_48%,rgba(17,45,122,0.88)_100%)] p-4 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-5 md:p-8 lg:rounded-3xl">
        <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-[#7bc4ff]/25 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-[#ffc88a]/25 blur-3xl"></div>

        <div className="relative mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Why Fusion The Era?
            </h2>
          </div>
          {/* <p className="max-w-xl text-sm leading-6 text-gray-300 md:text-base">
                Where global and Indian suppliers meet high-intent buyers from retail, distribution, institutional procurement, and design-led commerce.
              </p> */}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-6">
            <h3 className="text-xl font-bold text-white md:text-2xl">Direct B2B Connections</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              Meet hypermarkets, hotel chains, retailers and serious trade buyers face-to-face.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-6">
            <h3 className="text-xl font-bold text-white md:text-2xl">Indian & Global Brands</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              Connect with 600+ exhibitors — Indian manufacturers, importers, private labels and global brands.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-6">
            <h3 className="text-xl font-bold text-white md:text-2xl">Pragati Maidan, Delhi</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              Bharat Mandapam — International Exhibition & Convention Centre. World-class infrastructure.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-6">
            <h3 className="text-xl font-bold text-white md:text-2xl">Targeted Trade Audience</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              50,000+ qualified trade visitors from 460 cities. Only B2B — no retail consumers.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-6">
            <h3 className="text-xl font-bold text-white md:text-2xl">Full Stall Support</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              In-house stall fabrication, design to installation. Just show up and sell.
            </p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-6">
            <h3 className="text-xl font-bold text-white md:text-2xl">360° Promotion</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300 md:text-[15px]">
              Massive digital + physical outreach — WhatsApp, SMS, Email, banners, hoardings, TV, radio.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
