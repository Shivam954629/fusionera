"use client";
import React from "react";

export default function Comments() {
  return (
    <section
      id="comments"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(7,11,52,0.9)_0%,rgba(11,30,91,0.88)_48%,rgba(17,45,122,0.86)_100%)] shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070B34]/95 via-[#0B1E5B]/92 to-[#112D7A]/90"></div>
        <div className="relative grid gap-6 p-4 text-white sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Exhibitor Comments
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-300">
              “Fusion The Era provided an excellent platform to showcase our
              products and interact directly with serious business buyers. The
              overall visitor quality and professional environment made the
              experience highly productive.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
