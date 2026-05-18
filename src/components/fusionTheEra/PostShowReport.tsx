"use client";
import React from "react";

export default function PostShowReport() {
  return (
    <section
      id="postshowreport"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Post Show Report
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era successfully brought together businesses, buyers,
              and industry professionals in a focused trade environment designed
              to support business growth and collaboration.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              The exhibition reflected growing interest from the market, with
              active participation, strong visitor engagement, and positive
              feedback from exhibitors and attendees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
