import React from "react";
import Link from "next/link";

export default function Section3() {
  return (
    <section className="w-full" style={{ background: "linear-gradient(135deg, #0a0d35 0%, #0c1148 60%, #0d1555 100%)" }}>
      {/* Logo colour story top strip: Red → Navy → Cyan */}
      <div style={{ height: "5px", background: "linear-gradient(90deg, #e84030 0%, #1a1464 50%, #00c8de 100%)" }} />

      <div className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:divide-x md:divide-white/10">

            {/* Left: About */}
            <div className="px-0 pb-12 md:pb-0 md:pr-14 flex flex-col">
              <h2
                className="text-[15px] font-extrabold uppercase tracking-[0.18em]"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                About Fusion The Era
              </h2>
              {/* Red — logo top-left */}
              <div style={{ height: "3px", width: "52px", marginTop: "12px", marginBottom: "24px", background: "#e84030", borderRadius: "2px" }} />
              <div className="flex-1">
                <p className="text-sm leading-[1.9] md:text-[15px] font-medium" style={{ color: "rgba(255,255,255,0.92)" }}>
                  FUSION THE ERA is India&apos;s dedicated B2B trade show for Houseware, HORECA Ware,
                  Stainless Steel, and Home Appliances. Organized by V-Tech Innovation Services, it
                  connects Indian and international brands, manufacturers, importers, and exporters with
                  serious trade buyers across the country.
                </p>
                <p className="mt-4 text-sm leading-[1.9] md:text-[15px] font-medium" style={{ color: "rgba(255,255,255,0.92)" }}>
                  Strong and consistent business outcomes since inception have made it a must-attend
                  annual event for companies targeting India&apos;s fast-growing domestic home products market.
                </p>
              </div>
              <div className="mt-auto pt-8">
                <Link
                  href="/about"
                  className="inline-block rounded px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: "#e84030", boxShadow: "0 4px 20px rgba(232,64,48,0.5)" }}
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Right: Exhibitor Profile */}
            <div className="pt-12 md:pt-0 md:pl-14 flex flex-col border-t border-white/10 md:border-t-0">
              <h2
                className="text-[15px] font-extrabold uppercase tracking-[0.18em]"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                Exhibitor Profile
              </h2>
              {/* Red — same as About (user request) */}
              <div style={{ height: "3px", width: "52px", marginTop: "12px", marginBottom: "24px", background: "#e84030", borderRadius: "2px" }} />
              <div className="flex-1">
                <p className="text-sm leading-[1.9] md:text-[15px] font-medium" style={{ color: "rgba(255,255,255,0.92)" }}>
                  Exhibitors include leading Indian and international brands, manufacturers, exporters,
                  importers, and national distributors across Houseware, Home Decor, Home Furniture,
                  Home Appliances, Gifts, and allied segments.
                </p>
                <p className="mt-4 text-sm leading-[1.9] md:text-[15px] font-medium" style={{ color: "rgba(255,255,255,0.92)" }}>
                  The platform supports market expansion, product launches, and trade scheme rollouts to
                  active dealer and distributor networks, attracting 50,000+ trade visitors from 460+ cities.
                </p>
              </div>
              <div className="mt-auto pt-8">
                <Link
                  href="/exhibitorprofile"
                  className="inline-block rounded px-8 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: "#e84030", boxShadow: "0 4px 20px rgba(232,64,48,0.5)" }}
                >
                  Read More
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
