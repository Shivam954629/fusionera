"use client";
import React from "react";

export default function AboutOrganizer() {
  return (
    <section
      id="aboutorganizer"
      className="mx-auto w-[92%] max-w-7xl py-8 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-md border border-[rgba(27,36,64,0.12)]">
        <img
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80"
          alt="Furniture background in modern living room"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff]/95 via-[#eef6ff]/92 to-[#fff7ef]/94"></div>
        <div className="relative grid gap-6 p-6 text-[#1b2440] md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              About Organizer
            </h2>
            <p className="mt-4 text-md leading-7 text-justify text-[#1b2440]/85">
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
