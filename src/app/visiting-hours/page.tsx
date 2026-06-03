"use client";
import React from "react";
import { usePageContent } from "@/lib/usePageContent";
import { useSiteSettings } from "@/lib/useSiteSettings";

const SCHEDULE = [
  {
    day: "Day 1",
    date: "Friday, July 4, 2026",
    time: "10:00 am – 07:00 pm",
    note: "Fusion The Era Plus Members only",
  },
  {
    day: "Day 2",
    date: "Saturday, July 5, 2026",
    time: "10:00 am – 07:00 pm",
    note: "All trade visitors",
  },
  {
    day: "Day 3",
    date: "Sunday, July 6, 2026",
    time: "10:00 am – 07:00 pm",
    note: "All trade visitors",
  },
  {
    day: "Day 4",
    date: "Monday, July 7, 2026",
    time: "10:00 am – 05:00 pm",
    note: "All trade visitors",
  },
];

const FALLBACK_TITLE = "Visiting Hours";
const FALLBACK_INTRO =
  "Fusion The Era welcomes trade visitors, buyers, distributors, and industry professionals to experience four days of business, networking, and innovation.";

export default function VisitingHoursPage() {
  const siteSettings = useSiteSettings();
  const cms = usePageContent("visiting-hours");
  const title = cms?.title || FALLBACK_TITLE;
  const intro = cms?.paragraphs?.[0] || FALLBACK_INTRO;

  return (
    <section
      id="VisitingHours"
      className="w-full bg-[#5B9BD5] py-6 md:py-12 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative py-4 text-[#00509d] sm:py-6 md:py-8">
          <div className="w-fit">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              {title}
            </h2>
            <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
          </div>

          <p className="mt-4 text-left text-sm leading-6 text-black sm:text-base sm:leading-7">
            {intro}
          </p>

          {siteSettings.event_venue && (
            <p className="mt-3 text-left text-sm leading-6 text-black sm:text-base sm:leading-7">
              <span className="font-semibold">Venue:</span>{" "}
              {siteSettings.event_venue}
            </p>
          )}

          {siteSettings.event_date && (
            <p className="mt-2 text-left text-sm leading-6 text-black sm:text-base sm:leading-7">
              <span className="font-semibold">Event Date:</span>{" "}
              {siteSettings.event_date}
            </p>
          )}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SCHEDULE.map((s) => (
              <div
                key={s.day}
                className="rounded-xl border border-[#00509d]/15 bg-white/70 px-4 py-3"
              >
                <h3 className="text-base font-bold text-[#00509d] sm:text-lg">
                  {s.day}
                </h3>

                <p className="mt-1 text-sm leading-5 text-gray-700">
                  {s.date}
                </p>

                <p className="mt-2 text-sm font-semibold leading-5 text-[#00509d] sm:text-base">
                  {s.time}
                </p>

                <p className="mt-1 text-sm leading-5 text-gray-700">
                  {s.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 w-fit">
            <h3 className="text-xl font-bold text-white">Entry Guidelines</h3>
            <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-left text-sm leading-6 text-black sm:text-base sm:leading-7">
            <li>
              All visitors must carry a valid registration number or QR code for
              entry.
            </li>
            <li>
              Pre-registered visitors can print their badge at the Visitor
              Registration Desk.
            </li>
            <li>Entry is strictly for trade visitors only.</li>
            <li>
              Visitors are requested to carry a business card for identification.
            </li>
            <li>Spot registration is available at the venue.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}