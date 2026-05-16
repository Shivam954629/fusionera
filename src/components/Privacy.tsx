"use client";
import React from "react";

export default function Privacy() {
  return (
    <section
      id="privacy"
      className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
        <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Privacy Policy</h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Fusion The Era respects the trust placed by exhibitors, visitors,
              and business associates while interacting with the platform.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              Information collected through registrations, enquiries,
              subscriptions, or direct communication is used only for managing
              exhibition operations, improving user experience, and sharing
              relevant event information.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
              We maintain internal practices intended to safeguard user
              information and support secure communication across all official
              platforms connected with Fusion The Era.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
