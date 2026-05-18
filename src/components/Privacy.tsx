"use client";
import React from "react";

export default function Privacy() {
  return (
    <section
      id="privacy"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Privacy Policy</h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era respects the trust placed by exhibitors, visitors,
              and business associates while interacting with the platform.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Information collected through registrations, enquiries,
              subscriptions, or direct communication is used only for managing
              exhibition operations, improving user experience, and sharing
              relevant event information.
            </p>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
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
