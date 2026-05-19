"use client";

import React from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function PayStallAdvancePage() {
  const siteSettings = useSiteSettings();

  return (
    <section
      id="PayStallAdvance"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Pay Stall Advance
            </h2>

            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Confirm your participation at Fusion The Era by completing the
              stall advance payment process. Early booking allows exhibitors to
              secure preferred exhibition space and plan their participation
              smoothly within a professionally managed B2B trade environment.
            </p>

            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era offers businesses a valuable opportunity to connect
              with trade buyers, distributors, retailers, and industry
              professionals from across India&apos;s growing home and hospitality
              market.
            </p>

            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              For stall booking details, payment assistance, and exhibition
              support, exhibitors may connect with the official Fusion The Era
              team.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">
                Contact Our Team
              </h3>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#dde6ff] bg-white p-5">
                  <p className="text-sm font-bold text-[#0f172a]">
                    Delhi
                  </p>

                  <p className="mt-3 text-md font-semibold text-gray-900">
                    {siteSettings.contact_delhi_name}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    📞 {siteSettings.contact_delhi_mobile}
                  </p>

                  <a
                    href={`mailto:${siteSettings.contact_delhi_email}`}
                    className="mt-2 block text-sm text-blue-700 hover:underline"
                  >
                    ✉️ {siteSettings.contact_delhi_email}
                  </a>
                </div>

                <div className="rounded-xl border border-[#dde6ff] bg-white p-5">
                  <p className="text-sm font-bold text-[#0f172a]">
                    Mumbai
                  </p>

                  <p className="mt-3 text-md font-semibold text-gray-900">
                    {siteSettings.contact_mumbai_name}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    📞 {siteSettings.contact_mumbai_mobile}
                  </p>

                  <a
                    href={`mailto:${siteSettings.contact_mumbai_email}`}
                    className="mt-2 block text-sm text-blue-700 hover:underline"
                  >
                    ✉️ {siteSettings.contact_mumbai_email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}