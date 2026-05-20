import React from "react";
import Link from "next/link";

const Divider = () => <div className="h-px w-20 bg-[#1a1464]/20 my-3" />;

export default function Section3() {
  return (
    <section className="w-full py-10 md:py-14 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:divide-x md:divide-[#1a1464]/10">

          {/* Left: About */}
          <div className="px-0 pb-8 md:pb-0 md:pr-12 flex flex-col">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a1464]">
              About Fusion The Era
            </h2>
            <Divider />
            <div className="flex-1">
              <p className="text-sm leading-7 text-gray-600 md:text-[15px]">
                FUSION THE ERA is India&apos;s dedicated B2B trade show for Houseware, HORECA Ware,
                Stainless Steel, and Home Appliances. Organized by V-Tech Innovation Services, it
                connects Indian and international brands, manufacturers, importers, and exporters with
                serious trade buyers across the country.
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-600 md:text-[15px]">
                Strong and consistent business outcomes since inception have made it a must-attend
                annual event for companies targeting India&apos;s fast-growing domestic home products market.
              </p>
            </div>
            <div className="mt-auto pt-6">
              <Link
                href="/about"
                className="inline-block rounded px-7 py-2.5 text-sm font-semibold text-white transition"
                style={{ background: "#e84030", boxShadow: "0 4px 14px rgba(232,64,48,0.35)" }}
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Right: Exhibitor Profile */}
          <div className="pt-8 md:pt-0 md:pl-12 border-t border-[#1a1464]/10 md:border-t-0 flex flex-col">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a1464]">
              Exhibitor Profile
            </h2>
            <Divider />
            <div className="flex-1">
              <p className="text-sm leading-7 text-gray-600 md:text-[15px]">
                Exhibitors include leading Indian and international brands, manufacturers, exporters,
                importers, and national distributors across Houseware, Home Decor, Home Furniture,
                Home Appliances, Gifts, and allied segments.
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-600 md:text-[15px]">
                The platform supports market expansion, product launches, and trade scheme rollouts to
                active dealer and distributor networks, attracting 50,000+ trade visitors from 460+ cities.
              </p>
            </div>
            <div className="mt-auto pt-6">
              <Link
                href="/exhibitorprofile"
                className="inline-block rounded px-7 py-2.5 text-sm font-semibold text-white transition"
                style={{ background: "#e84030", boxShadow: "0 4px 14px rgba(232,64,48,0.35)" }}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
