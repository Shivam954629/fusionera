"use client";

import React from "react";
import Link from "next/link";
import { useSiteSettings } from "@/lib/useSiteSettings";

const Arrow = () => (
  <span className="mr-2 text-[#f0b429] text-xs">▸</span>
);

export default function Footer() {
  const siteSettings = useSiteSettings();

  return (
    <footer className="w-full" style={{ background: "#0B0F2B" }}>

      {/* Top brand bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={siteSettings.logo_url || "/images/logo.jpeg"}
              alt="Fusion The Era"
              className="h-10 w-auto rounded-md object-contain"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                Fusion The Era
              </p>
              <p className="text-[11px] text-white/40 mt-0.5">
                India's B2B Trade Show · July 4–7, 2026 · Bharat Mandapam, Delhi
              </p>
            </div>
          </div>
          {/* Social icons */}
          <div className="flex items-center gap-2">
            {/* Instagram — live */}
            <a href="https://www.instagram.com/fusiontheera?igsh=MXFyYngydHI4ZTdvZg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/60 hover:text-white transition">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            {/* Facebook — live */}
            <a href="https://www.facebook.com/share/1EiPZcSKdq/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white/60 hover:text-white transition">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            {/* YouTube — coming soon */}
            <span aria-label="YouTube" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/50 cursor-default">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C18.6 3.5 12 3.5 12 3.5s-6.6 0-9.1.3c-1.2.3-2.1 1.2-2.4 2.4C.1 8.7 0 12 0 12s.1 3.3.5 5.8c.3 1.2 1.2 2.1 2.4 2.4 2.5.3 9.1.3 9.1.3s6.6 0 9.1-.3c1.2-.3 2.1-1.2 2.4-2.4.4-2.5.5-5.8.5-5.8s0-3.3-.5-5.8zM9.6 15.5V8.5L15.8 12l-6.2 3.5z" /></svg>
            </span>
            {/* LinkedIn — coming soon */}
            <span aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/50 cursor-default">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </span>
            {/* WhatsApp — coming soon */}
            <span aria-label="WhatsApp" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/50 cursor-default">
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.932-1.423A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fillRule="evenodd" clipRule="evenodd"/></svg>
            </span>
          </div>
        </div>
      </div>

      {/* Main columns — HGH style */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">

          {/* Col 1 — Fusion The Era */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-4">
              Fusion The Era
            </h4>
            <ul className="space-y-2 text-[13px] text-white/55">
              <li><Link href="/show" className="hover:text-white transition flex items-start"><Arrow />About The Show</Link></li>
              <li><Link href="/show" className="hover:text-white transition flex items-start"><Arrow />Fusion The Era 2026</Link></li>
              <li><Link href="/organizer" className="hover:text-white transition flex items-start"><Arrow />About Organiser</Link></li>
              <li><Link href="/#why" className="hover:text-white transition flex items-start"><Arrow />Why Fusion The Era</Link></li>
              <li><Link href="/trade" className="hover:text-white transition flex items-start"><Arrow />Trade Show Facts: 1st Edition</Link></li>
              <li><Link href="/report" className="hover:text-white transition flex items-start"><Arrow />Post Show Report</Link></li>
            </ul>
          </div>

          {/* Col 2 — Visitors */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-4">
              Visitors
            </h4>
            <ul className="space-y-2 text-[13px] text-white/55">
              <li><Link href="/whoshouldvisit" className="hover:text-white transition flex items-start"><Arrow />Who Should Visit?</Link></li>
              <li><Link href="/benefits" className="hover:text-white transition flex items-start"><Arrow />Benefits</Link></li>
              <li><Link href="/whoshouldvisit" className="hover:text-white transition flex items-start"><Arrow />Visitor Profile</Link></li>
              <li><Link href="/comments" className="hover:text-white transition flex items-start"><Arrow />Visitor Comment</Link></li>
              <li><Link href="/visitor-registration" className="hover:text-white transition flex items-start"><Arrow />Visitor Registration</Link></li>
              <li><Link href="/visitor-registration" className="hover:text-white transition flex items-start"><Arrow />Registration Steps</Link></li>
              <li><Link href="/visiting-hours" className="hover:text-white transition flex items-start"><Arrow />Visiting Hours</Link></li>
              <li><Link href="/visitor-facilities" className="hover:text-white transition flex items-start"><Arrow />Visitor Facilities</Link></li>
              <li><Link href="/trade" className="hover:text-white transition flex items-start"><Arrow />Trade Show Facts</Link></li>
              <li><Link href="/reaching-the-venue" className="hover:text-white transition flex items-start"><Arrow />Reaching the Venue</Link></li>
              <li><Link href="/contact" className="hover:text-white transition flex items-start"><Arrow />Contact</Link></li>
            </ul>
          </div>

          {/* Col 3 — Exhibitors */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-4">
              Exhibitors
            </h4>
            <ul className="space-y-2 text-[13px] text-white/55">
              <li><Link href="/whoshouldexhibit" className="hover:text-white transition flex items-start"><Arrow />Who Should Exhibit?</Link></li>
              <li><Link href="/exhibitorbenefits" className="hover:text-white transition flex items-start"><Arrow />Benefits</Link></li>
              <li><Link href="/exhibitorprofile" className="hover:text-white transition flex items-start"><Arrow />Exhibitor Profile</Link></li>
              <li><Link href="/exhibitorcomments" className="hover:text-white transition flex items-start"><Arrow />Exhibitor Comment</Link></li>
              <li><Link href="/exhibitors-registration" className="hover:text-white transition flex items-start"><Arrow />Exhibitor Registration</Link></li>
              <li><Link href="/exhibitor-manual" className="hover:text-white transition flex items-start"><Arrow />Exhibitor Manual</Link></li>
              <li><Link href="/exhibitor-facilities" className="hover:text-white transition flex items-start"><Arrow />Exhibitor Facilities</Link></li>
              <li><Link href="/exhibitors-registration" className="hover:text-white transition flex items-start"><Arrow />Regular Exhibitors</Link></li>
              <li><Link href="/exhibitors-registration" className="hover:text-white transition flex items-start"><Arrow />First Time Exhibitors</Link></li>
              <li><Link href="/pay-stall-advance" className="hover:text-white transition flex items-start"><Arrow />Pay Stall Advance</Link></li>
              <li><Link href="/exhibitor-brochure" className="hover:text-white transition flex items-start"><Arrow />Exhibitor Brochure</Link></li>
              <li><Link href="/contact" className="hover:text-white transition flex items-start"><Arrow />Contact</Link></li>
            </ul>
          </div>

          {/* Col 4 — Media */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-4">
              Media
            </h4>
            <ul className="space-y-2 text-[13px] text-white/55">
              <li><Link href="/gallery" className="hover:text-white transition flex items-start"><Arrow />Photo Gallery</Link></li>
              <li><Link href="/videos" className="hover:text-white transition flex items-start"><Arrow />Video Gallery</Link></li>
              <li><Link href="/podcast" className="hover:text-white transition flex items-start"><Arrow />Podcasts</Link></li>
              <li><Link href="/newsletter" className="hover:text-white transition flex items-start"><Arrow />Newsletter</Link></li>
            </ul>

            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mt-7 mb-4">
              Login
            </h4>
            <ul className="space-y-2 text-[13px] text-white/55">
              <li><Link href="/visitor-dashboard" className="hover:text-white transition flex items-start"><Arrow />Visitor</Link></li>
              <li><Link href="/exhibitors-registration" className="hover:text-white transition flex items-start"><Arrow />Exhibitor</Link></li>
            </ul>
          </div>

          {/* Col 5 — Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-[13px] text-white/55 mb-4">
              <li><Link href="/contact" className="hover:text-white transition flex items-start"><Arrow />Contact Details</Link></li>
              <li><Link href="/enquiry" className="hover:text-white transition flex items-start"><Arrow />Enquiry Form</Link></li>
            </ul>
            <ul className="space-y-3 text-[13px] text-white/55">
              <li className="flex items-start gap-2">
                <Arrow />
                <a
                  href="mailto:info@fusiontheera.com"
                  className="hover:text-white transition break-all"
                >
                  info@fusiontheera.com
                </a>
              </li>
<li className="flex items-start gap-2">
                <Arrow />
                <span className="leading-5">
                  {siteSettings.contact_delhi_name && <span className="text-white/80 font-medium block">{siteSettings.contact_delhi_name}</span>}
                  Delhi: {siteSettings.contact_delhi_mobile || "+91 93157 00590"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Arrow />
                <span className="leading-5">
                  {siteSettings.contact_mumbai_name && <span className="text-white/80 font-medium block">{siteSettings.contact_mumbai_name}</span>}
                  Mumbai: {siteSettings.contact_mumbai_mobile || "+91 85888 92885"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Arrow />
                <span className="leading-6">
                  V-Tech Innovation Services,<br />Ghaziabad U.P. 201014
                </span>
              </li>
            </ul>

          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10" style={{ background: "#07091f" }}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-white/35">
          <p>© 2026 Fusion The Era. All rights reserved. Organised by V-Tech Innovation Services.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition">Terms of Service</Link>
            <Link href="/support" className="hover:text-white/60 transition">Support</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
