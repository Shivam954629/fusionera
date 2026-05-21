"use client";

import React from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function PayStallAdvancePage() {
  const siteSettings = useSiteSettings();

  return (
    <section
      id="PayStallAdvance"
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>
        Pay Stall Advance
      </h2>
      <p className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>
        Confirm your participation at Fusion The Era by completing the stall
        advance payment process. Early booking allows exhibitors to secure
        preferred exhibition space and plan their participation smoothly within
        a professionally managed B2B trade environment.
      </p>
      <p className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>
        Fusion The Era offers businesses a valuable opportunity to connect with
        trade buyers, distributors, retailers, and industry professionals from
        across India&apos;s growing home and hospitality market.
      </p>
      <p className="mt-4 text-lg leading-8 text-justify" style={{ color: "#0c1148" }}>
        For stall booking details, payment assistance, and exhibition support,
        exhibitors may connect with the official Fusion The Era team.
      </p>

      <h3 className="mt-8 text-xl font-bold" style={{ color: "#0c1148" }}>Contact Our Team</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(12,17,72,0.1)" }}>
          <p className="text-sm font-bold" style={{ color: "#0c1148" }}>Delhi</p>
          <p className="mt-3 text-base font-semibold" style={{ color: "#0c1148" }}>{siteSettings.contact_delhi_name}</p>
          <p className="mt-2 text-sm text-gray-600">📞 {siteSettings.contact_delhi_mobile}</p>
          <a href={`mailto:${siteSettings.contact_delhi_email}`} className="mt-2 block text-sm hover:underline" style={{ color: "#0c1148" }}>
            ✉️ {siteSettings.contact_delhi_email}
          </a>
        </div>
        <div className="rounded-xl p-5 bg-white" style={{ border: "1px solid rgba(12,17,72,0.1)" }}>
          <p className="text-sm font-bold" style={{ color: "#0c1148" }}>Mumbai</p>
          <p className="mt-3 text-base font-semibold" style={{ color: "#0c1148" }}>{siteSettings.contact_mumbai_name}</p>
          <p className="mt-2 text-sm text-gray-600">📞 {siteSettings.contact_mumbai_mobile}</p>
          <a href={`mailto:${siteSettings.contact_mumbai_email}`} className="mt-2 block text-sm hover:underline" style={{ color: "#0c1148" }}>
            ✉️ {siteSettings.contact_mumbai_email}
          </a>
        </div>
      </div>
    </section>
  );
}
