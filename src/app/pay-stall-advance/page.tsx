"use client";
import React from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

export default function PayStallAdvancePage() {
  const siteSettings = useSiteSettings();

  const contacts = [
    {
      city: "Delhi",
      name: siteSettings.contact_delhi_name,
      mobile: siteSettings.contact_delhi_mobile,
      email: siteSettings.contact_delhi_email,
      color: "#E8274B",
      gradient: "linear-gradient(135deg,#E8274B,#F4822A)",
    },
    {
      city: "Mumbai",
      name: siteSettings.contact_mumbai_name,
      mobile: siteSettings.contact_mumbai_mobile,
      email: siteSettings.contact_mumbai_email,
      color: "#7B2FBE",
      gradient: "linear-gradient(135deg,#7B2FBE,#E91E8C)",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO BANNER */}
      <section className="relative isolate w-full overflow-hidden py-14 md:py-20">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }}
        />
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div
          className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl"
          style={{ background: "rgba(244,130,42,0.2)" }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(232,39,75,0.18)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p
            className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3"
            style={{ color: "#F4822A" }}
          >
            Exhibitor Services
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Pay Stall Advance</h1>
          <p className="mt-3 text-white/60 text-sm max-w-lg mx-auto">
            Secure your preferred exhibition space at Fusion The Era 2026
          </p>
          <div className="mt-5 flex justify-center">
            <span
              className="h-1 w-20 rounded-full"
              style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)" }}
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-10">
        {/* Info Card */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-8 shadow-sm"
          style={{ border: "1px solid #dde6ff", background: "#ffffff" }}
        >
          <div
            className="h-1 w-16 rounded-full mb-6"
            style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)" }}
          />
          <p className="text-base leading-7 text-justify mb-4" style={{ color: "#374151" }}>
            Confirm your participation at Fusion The Era by completing the stall advance payment
            process. Early booking allows exhibitors to secure preferred exhibition space and plan
            their participation smoothly within a professionally managed B2B trade environment.
          </p>
          <p className="text-base leading-7 text-justify mb-4" style={{ color: "#374151" }}>
            Fusion The Era offers businesses a valuable opportunity to connect with trade buyers,
            distributors, retailers, and industry professionals from across India&apos;s growing
            home and hospitality market.
          </p>
          <p className="text-base leading-7 text-justify" style={{ color: "#374151" }}>
            For stall booking details, payment assistance, and exhibition support, exhibitors may
            connect with the official Fusion The Era team.
          </p>
        </div>

        {/* Contact Cards */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "#1a1a2e" }}>
          Contact Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((c) => (
            <div
              key={c.city}
              className="rounded-2xl overflow-hidden shadow-sm"
              style={{ border: "1px solid #dde6ff" }}
            >
              <div className="h-2" style={{ background: c.gradient }} />
              <div className="p-5 bg-white">
                <span
                  className="text-xs font-extrabold uppercase tracking-widest px-2 py-1 rounded-full text-white"
                  style={{ background: c.gradient }}
                >
                  {c.city}
                </span>
                <p className="font-bold text-base mt-3" style={{ color: "#1a1a2e" }}>
                  {c.name}
                </p>
                <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                  📞 {c.mobile}
                </p>
                <a
                  href={`mailto:${c.email}`}
                  className="text-sm mt-1 block hover:underline"
                  style={{ color: c.color }}
                >
                  ✉️ {c.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
