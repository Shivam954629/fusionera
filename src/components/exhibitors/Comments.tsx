"use client";
import React from "react";

export default function Comments() {
  return (
    <section
      id="comments"
      className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
        <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Exhibitor Comments
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
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
