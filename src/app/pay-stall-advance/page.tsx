"use client";

import React from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function PayStallAdvancePage() {
  const siteSettings = useSiteSettings();

  return (
    <section
      id="PayStallAdvance"
      className="w-full bg-[#5B9BD5] py-6 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative py-4 text-[#00509d] sm:py-6 md:py-8">
          <div className="w-fit">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Pay Stall Advance
            </h2>
            <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
          </div>

          <div className="mt-4 space-y-3 md:space-y-4">
            <p className="text-left text-sm leading-6 text-black sm:text-base sm:leading-7 md:text-justify">
              Confirm your participation at Fusion The Era by completing the
              stall advance payment process. Early booking allows exhibitors to
              secure preferred exhibition space and plan their participation
              smoothly within a professionally managed B2B trade environment.
            </p>

            <p className="text-left text-sm leading-6 text-black sm:text-base sm:leading-7 md:text-justify">
              Fusion The Era offers businesses a valuable opportunity to connect
              with trade buyers, distributors, retailers, and industry
              professionals from across India&apos;s growing home and hospitality
              market.
            </p>

            <p className="text-left text-sm leading-6 text-black sm:text-base sm:leading-7 md:text-justify">
              For stall booking details, payment assistance, and exhibition
              support, exhibitors may connect with the official Fusion The Era
              team.
            </p>
          </div>

          <div className="mt-8 w-fit">
            <h3 className="text-xl font-bold text-white">Banking Details</h3>
            <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
          </div>

          <div className="mt-4 overflow-hidden rounded-xl shadow-md">
            <div className="bg-[#1a1464] px-5 py-3">
              <p className="text-base font-black text-white">
                V - Tech Innovation Services
              </p>
              <p className="mt-0.5 text-xs text-white/70">
                Transfer your stall advance to the account below
              </p>
            </div>

            <div className="bg-white px-5 py-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  {
                    label: "Account Name",
                    value: "V - Tech Innovation Services",
                  },
                  { label: "Bank", value: "Axis Bank Ltd" },
                  { label: "Account No.", value: "920020063197452" },
                  { label: "MICR Code", value: "110211063" },
                  { label: "IFSC Code", value: "UTIB0000723" },
                  { label: "Branch", value: "Sector 62, Noida U.P" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col rounded-lg border border-[#dde6ff] bg-[#f4f6ff] px-3 py-2"
                  >
                    <span className="text-xs font-semibold text-gray-400">
                      {label}
                    </span>
                    <span className="mt-0.5 text-sm font-bold text-[#1a1464]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-xs text-gray-500">
                After payment, please share the receipt with our team for
                confirmation.
              </p>
            </div>
          </div>

          <div className="mt-8 w-fit">
            <h3 className="text-xl font-bold text-white">Contact Our Team</h3>
            <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[#00509d]/15 bg-white p-5">
              <p className="text-sm font-bold text-[#00509d]">Delhi</p>
              <p className="mt-3 text-base font-semibold text-black">
                {siteSettings.contact_delhi_name}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                📞 {siteSettings.contact_delhi_mobile}
              </p>
              <a
                href={`mailto:${siteSettings.contact_delhi_email}`}
                className="mt-2 block text-sm text-[#00509d] hover:underline"
              >
                ✉️ {siteSettings.contact_delhi_email}
              </a>
            </div>

            <div className="rounded-xl border border-[#00509d]/15 bg-white p-5">
              <p className="text-sm font-bold text-[#00509d]">Mumbai</p>
              <p className="mt-3 text-base font-semibold text-black">
                {siteSettings.contact_mumbai_name}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                📞 {siteSettings.contact_mumbai_mobile}
              </p>
              <a
                href={`mailto:${siteSettings.contact_mumbai_email}`}
                className="mt-2 block text-sm text-[#00509d] hover:underline"
              >
                ✉️ {siteSettings.contact_mumbai_email}
              </a>
            </div>

            <div className="rounded-xl border border-[#00509d]/15 bg-white p-5">
              <p className="text-sm font-bold text-[#00509d]">
                General Enquiries
              </p>
              <p className="mt-3 text-base font-semibold text-black">
                Fusion The Era
              </p>
              <a
                href="mailto:sales.info@fusiontheera.com"
                className="mt-2 block text-sm text-[#00509d] hover:underline"
              >
                ✉️ sales.info@fusiontheera.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}