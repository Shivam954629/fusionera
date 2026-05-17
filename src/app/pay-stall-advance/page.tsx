"use client";
import React from "react";

export default function PayStallAdvancePage() {
  return (
    <main className="min-h-screen py-8 md:py-12">
      <section
        id="pay-stall-advance"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
        data-reveal-delay="50"
      >
        <div className="relative overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(7,11,52,0.9)_0%,rgba(11,30,91,0.88)_48%,rgba(17,45,122,0.86)_100%)] shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#070B34]/95 via-[#0B1E5B]/92 to-[#112D7A]/90"></div>
          <div className="relative grid gap-6 p-4 text-white sm:p-6 md:p-8">
            <div>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                PAY STALL ADVANCE
              </h2>
              <p className="mt-4 text-md leading-7 text-justify text-gray-300">
                Confirm your participation at Fusion The Era by completing the
                stall advance payment process. Early booking allows exhibitors
                to secure preferred exhibition space and plan their
                participation smoothly within a professionally managed B2B trade
                environment.
              </p>
              <p className="mt-4 text-md leading-7 text-justify text-gray-300">
                Fusion The Era offers businesses a valuable opportunity to
                connect with trade buyers, distributors, retailers, and industry
                professionals from across India&apos;s growing home and
                hospitality market.
              </p>
              <p className="mt-4 text-md leading-7 text-justify text-gray-300">
                For stall booking details, payment assistance, and exhibition
                support, exhibitors may connect with the official Fusion The Era
                team.
              </p>

              <div className="mt-6 h-px bg-white/10" />

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    city: "Delhi",
                    name: "Mr. Pawan Singh",
                    mobile: "+91 93157 00590",
                    email: "pawan.singh@fusiontheera.com",
                  },
                  {
                    city: "Mumbai",
                    name: "Mr. Jasvinder Singh Chaudhary",
                    mobile: "+91 85888 92885",
                    email: "jasvinder.chaudhary@fusiontheera.com",
                  },
                ].map((c) => (
                  <div
                    key={c.city}
                    className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                  >
                    <p className="mb-1 text-sm font-bold text-[#8cecff]">
                      {c.city}:
                    </p>
                    <p className="font-bold text-sm text-white">{c.name}</p>
                    <p className="text-xs mt-1 text-gray-400">
                      Mobile: {c.mobile}
                    </p>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-xs text-[#8cecff] hover:underline"
                    >
                      {c.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
