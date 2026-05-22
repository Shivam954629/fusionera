"use client";
import React from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

const facilities = [
  { title: "Banking & ATM Support", desc: "ATM and basic banking services will be available within or near the exhibition venue for visitor convenience and financial assistance." },
  { title: "Business Assistance Centre", desc: "Business support facilities including internet access, printing, photocopying, and communication assistance will be available for exhibitors and visitors." },
  { title: "Local Transport & Car Rental Services", desc: "Car rental and local transportation support services will be available for convenient travel within the city." },
  { title: "Courier & Logistics Assistance", desc: "Courier and logistics assistance will be available for shipment of documents, samples, and exhibition materials." },
  { title: "Hotel & Stay Assistance", desc: "Visitors and exhibitors can access guidance and assistance related to hotel bookings and nearby accommodation options." },
  { title: "Luggage Assistance Facility", desc: "A designated luggage support facility may be available for visitors carrying baggage or travel belongings." },
  { title: "Emergency Medical Support", desc: "Medical support and first aid services will be available at the venue for emergency assistance and visitor safety." },
  { title: "Vehicle Parking Facility", desc: "Dedicated parking areas will be available for exhibitors, visitors, and business delegates attending the exhibition." },
  { title: "Prayer & Meditation Room", desc: "A prayer room facility will be available at the venue for visitor convenience." },
  { title: "Food Court & Refreshment Services", desc: "Food courts, cafeteria facilities, refreshments, beverages, and snack counters will be operational during exhibition hours." },
  { title: "Cab & Taxi Assistance", desc: "Taxi and local cab support services will be available for easy travel to and from the exhibition venue." },
  { title: "Travel Coordination Services", desc: "Assistance related to hotel bookings, local transportation, and travel coordination will be available for exhibitors and visitors during Fusion The Era 2026." },
];

export default function VisitorFacilitiesPage() {
  const siteSettings = useSiteSettings();

  return (
    <section
      id="VisitorFacilities"
      className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]"
      data-reveal-delay="50"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl text-white">Visitor Facilities</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>
            {siteSettings.event_venue && (
              <p className="mt-4 text-md leading-7 text-black">
                Venue: {siteSettings.event_venue}
              </p>
            )}
            <div className="mt-4 text-md leading-7 text-black text-justify">
              <p>Fusion The Era 2026 is committed to providing a professional, convenient, and well-managed exhibition experience for exhibitors, buyers, business delegates, and trade visitors. A wide range of visitor support services and operational facilities will be available at the venue to ensure smooth participation throughout the exhibition period. The exhibition venue will offer various hospitality, business, and convenience services that can be utilized by all registered visitors and exhibitors during the event.</p>
              {facilities.map((f) => (
                <p key={f.title} className="mt-0">
                  <span className="font-semibold text-[#00509d]">{f.title}: </span>
                  {f.desc}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
