"use client";
import React from "react";

export default function AboutOrganizer() {
  return (
    <section
      id="aboutorganizer"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              About Organizer
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era is organized by V-Tech Innovation Services, a
              company committed to creating impactful business exhibitions and
              industry-focused networking platforms. With a vision to connect
              businesses through professionally managed trade events, the
              organization focuses on delivering quality experiences, strong
              industry outreach, and meaningful business opportunities for
              exhibitors and visitors alike.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
