"use client";

import React from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function PayStallAdvancePage() {
  const siteSettings = useSiteSettings();

  return (
    <section id="PayStallAdvance" className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]" data-reveal-delay="50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl text-white">Pay Stall Advance</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
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

            {/* Banking Details */}
            <div className="mt-8 w-fit">
              <h3 className="text-xl font-bold text-[#ffffff]">Banking Details</h3>
              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>
            <div className="mt-4 rounded-xl overflow-hidden shadow-md">
              <div className="px-5 py-3" style={{ background: "#1a1464" }}>
                <p className="text-white font-black text-base">V - Tech Innovation Services</p>
                <p className="text-white/70 text-xs mt-0.5">Transfer your stall advance to the account below</p>
              </div>
              <div className="bg-white px-5 py-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    { label: "Account Name", value: "V - Tech Innovation Services" },
                    { label: "Bank", value: "Axis Bank Ltd" },
                    { label: "Account No.", value: "920020063197452" },
                    { label: "MICR Code", value: "110211063" },
                    { label: "IFSC Code", value: "UTIB0000723" },
                    { label: "Branch", value: "Sector 62, Noida U.P" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col rounded-lg px-3 py-2" style={{ background: "#f4f6ff", border: "1px solid #dde6ff" }}>
                      <span className="text-xs font-semibold text-gray-400">{label}</span>
                      <span className="text-sm font-bold text-[#1a1464] mt-0.5">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-500">After payment, please share the receipt with our team for confirmation.</p>
              </div>
            </div>

            <div className="mt-8 w-fit">
              <h3 className="text-xl font-bold text-[#ffffff]">Contact Our Team</h3>
              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
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
