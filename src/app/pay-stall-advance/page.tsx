"use client";

import React from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function PayStallAdvancePage() {
  const siteSettings = useSiteSettings();

  return (
    <section id="PayStallAdvance" className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#cae9ff]" data-reveal-delay="50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl">Pay Stall Advance</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <p className="mt-4 text-md leading-7 text-justify text-black">
              Confirm your participation at Fusion The Era by completing the stall advance payment process. Early booking allows exhibitors to secure preferred exhibition space and plan their participation smoothly within a professionally managed B2B trade environment.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-black">
              Fusion The Era offers businesses a valuable opportunity to connect with trade buyers, distributors, retailers, and industry professionals from across India&apos;s growing home and hospitality market.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-black">
              For stall booking details, payment assistance, and exhibition support, exhibitors may connect with the official Fusion The Era team.
            </p>

            <div className="mt-8 w-fit">
              <h3 className="text-xl font-bold text-[#00509d]">Contact Our Team</h3>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                <p className="text-sm font-bold text-[#00509d]">Delhi</p>
                <p className="mt-3 text-base font-semibold text-black">{siteSettings.contact_delhi_name}</p>
                <p className="mt-2 text-sm text-gray-600">📞 {siteSettings.contact_delhi_mobile}</p>
                <a href={`mailto:${siteSettings.contact_delhi_email}`} className="mt-2 block text-sm hover:underline text-[#00509d]">
                  ✉️ {siteSettings.contact_delhi_email}
                </a>
              </div>
              <div className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                <p className="text-sm font-bold text-[#00509d]">Mumbai</p>
                <p className="mt-3 text-base font-semibold text-black">{siteSettings.contact_mumbai_name}</p>
                <p className="mt-2 text-sm text-gray-600">📞 {siteSettings.contact_mumbai_mobile}</p>
                <a href={`mailto:${siteSettings.contact_mumbai_email}`} className="mt-2 block text-sm hover:underline text-[#00509d]">
                  ✉️ {siteSettings.contact_mumbai_email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
