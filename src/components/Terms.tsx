"use client";
import React from "react";

export default function Terms() {
  return (
    <section
      id="terms"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-white shadow-sm">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Terms of Service</h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era serves as a business networking and sourcing
              platform for professionals connected with the home and hospitality
              industry.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              The organizers reserve the right to revise exhibition schedules,
              policies, participation criteria, or operational arrangements
              whenever required for effective event management.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Users may not reproduce, distribute, or commercially use any
              branding, website content, graphics, or exhibition materials
              associated with Fusion The Era without authorization.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              All participants are expected to maintain professional standards
              and cooperate with exhibition guidelines during the event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
