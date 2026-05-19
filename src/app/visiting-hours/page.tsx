"use client";

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

export default function VisitingHoursPage() {
  const siteSettings = useSiteSettings();

  return (
    <section
      id="VisitingHours"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-10 reveal-on-scroll reveal-zoom"
      data-reveal-delay="50"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#dde6ff] bg-[#eef2ff]">
        <div className="relative grid gap-6 p-4 text-gray-900 sm:p-6 md:p-8">
          <div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Visiting Hours
            </h2>

            <p className="mt-4 text-md leading-7 text-justify text-gray-600">
              Fusion The Era welcomes trade visitors, buyers, distributors,
              and industry professionals to experience four days of business,
              networking, and innovation.
            </p>

            <p className="mt-4 text-md leading-7 text-gray-600">
              Venue: {siteSettings.event_venue}
            </p>

            <p className="mt-2 text-md leading-7 text-gray-600">
              Event Date: {siteSettings.event_date}
            </p>

            <div className="mt-6 space-y-4">
              {SCHEDULE.map((s) => (
                <div
                  key={s.day}
                  className="rounded-xl border border-[#dde6ff] bg-white p-4"
                >
                  <h3 className="text-lg font-bold text-gray-900">
                    {s.day}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {s.date}
                  </p>

                  <p className="mt-2 text-md font-semibold text-gray-900">
                    {s.time}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {s.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900">
                Entry Guidelines
              </h3>

              <ul className="mt-4 list-disc pl-5 text-md leading-7 text-gray-600">
                <li>
                  All visitors must carry a valid registration number or QR
                  code for entry.
                </li>

                <li>
                  Pre-registered visitors can print their badge at the Visitor
                  Registration Desk.
                </li>

                <li>
                  Entry is strictly for trade visitors only.
                </li>

                <li>
                  Visitors are requested to carry a business card for
                  identification.
                </li>

                <li>
                  Spot registration is available at the venue.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}