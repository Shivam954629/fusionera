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
  const intro = cms?.paragraphs[0] || FALLBACK_INTRO;

  return (
    <section
      id="VisitingHours"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#cae9ff]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <p className="mt-4 text-md leading-7  text-black">{intro}</p>
            {siteSettings.event_venue && (
              <p className="mt-4 text-md leading-7 text-black">
                Venue: {siteSettings.event_venue}
              </p>
            )}
            {siteSettings.event_date && (
              <p className="mt-2 text-md leading-7 text-black">
                Event Date: {siteSettings.event_date}
              </p>
            )}
            <div className="mt-6 space-y-4">
              {SCHEDULE.map((s) => (
                <div
                  key={s.day}
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(0,80,157,0.15)",
                  }}
                >
                  <h3 className="text-lg font-bold text-[#00509d]">{s.day}</h3>
                  <p className="mt-1 text-sm text-gray-600">{s.date}</p>
                  <p className="mt-2 text-base font-semibold text-[#00509d]">
                    {s.time}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{s.note}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 w-fit">
              <h3 className="text-xl font-bold text-[#00509d]">
                Entry Guidelines
              </h3>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            <ul className="mt-4 list-disc pl-5 text-md leading-7 text-black">
              <li>
                All visitors must carry a valid registration number or QR code
                for entry.
              </li>
              <li>
                Pre-registered visitors can print their badge at the Visitor
                Registration Desk.
              </li>
              <li>Entry is strictly for trade visitors only.</li>
              <li>
                Visitors are requested to carry a business card for
                identification.
              </li>
              <li>Spot registration is available at the venue.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
