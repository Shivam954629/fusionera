"use client";
import React from "react";

export default function Terms() {
  return (
    <section
      id="terms"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(7,11,52,0.9)_0%,rgba(11,30,91,0.88)_48%,rgba(17,45,122,0.86)_100%)] shadow-[0_0_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070B34]/95 via-[#0B1E5B]/92 to-[#112D7A]/90"></div>
        <div className="relative grid gap-6 p-4 text-white sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Terms of Service</h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-300">
              Fusion The Era serves as a business networking and sourcing
              platform for professionals connected with the home and hospitality
              industry.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-300">
              The organizers reserve the right to revise exhibition schedules,
              policies, participation criteria, or operational arrangements
              whenever required for effective event management.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-300">
              Users may not reproduce, distribute, or commercially use any
              branding, website content, graphics, or exhibition materials
              associated with Fusion The Era without authorization.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-300">
              All participants are expected to maintain professional standards
              and cooperate with exhibition guidelines during the event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
