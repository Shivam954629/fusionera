"use client";
import React from "react";

export default function Terms() {
  return (
    <section
      id="terms"
      className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
        <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Terms of Service</h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Fusion The Era serves as a business networking and sourcing
              platform for professionals connected with the home and hospitality
              industry.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              The organizers reserve the right to revise exhibition schedules,
              policies, participation criteria, or operational arrangements
              whenever required for effective event management.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Users may not reproduce, distribute, or commercially use any
              branding, website content, graphics, or exhibition materials
              associated with Fusion The Era without authorization.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              All participants are expected to maintain professional standards
              and cooperate with exhibition guidelines during the event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
