"use client";
import React from "react";

export default function PayStallAdvancePage() {
  return (
    <main className="min-h-screen py-8 md:py-12">
      <section
        id="pay-stall-advance"
        className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
        data-reveal-delay="50"
      >
        <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
          <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
            <div>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                PAY STALL ADVANCE
              </h2>
              <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                Confirm your participation at Fusion The Era by completing the
                stall advance payment process. Early booking allows exhibitors
                to secure preferred exhibition space and plan their
                participation smoothly within a professionally managed B2B trade
                environment.
              </p>
              <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                Fusion The Era offers businesses a valuable opportunity to
                connect with trade buyers, distributors, retailers, and industry
                professionals from across India&apos;s growing home and
                hospitality market.
              </p>
              <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
                For stall booking details, payment assistance, and exhibition
                support, exhibitors may connect with the official Fusion The Era
                team.
              </p>

              <div className="mt-6 h-px bg-[#1b2440]/10" />

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
                    className="rounded-xl p-5 bg-white/60 border border-[rgba(27,36,64,0.12)]"
                  >
                    <p className="font-bold text-sm mb-1 text-[#1d4ed8]">
                      {c.city}:
                    </p>
                    <p className="font-bold text-sm text-[#1b2440]">{c.name}</p>
                    <p className="text-xs mt-1 text-[#1b2440]/70">
                      Mobile: {c.mobile}
                    </p>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-xs text-blue-500 hover:underline"
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
