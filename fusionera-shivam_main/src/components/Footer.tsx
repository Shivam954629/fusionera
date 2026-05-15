"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-[#7cc7ff]/20 bg-[linear-gradient(120deg,#090f2d_0%,#0f1a4f_48%,#1a2f7f_100%)] py-10 text-white">
      <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[#26d1ff]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-[#ffb25a]/20 blur-3xl"></div>

      <div className="mx-auto grid w-[92%] max-w-7xl gap-8 md:grid-cols-4">
        {/* LOGO + DESC */}
        <div>
          <img
            src="/images/logo.jpeg"
            alt="Fusionera logo"
            className="h-12 w-auto rounded-md"
          />
          <p className="mt-4 text-sm leading-6 text-[#d8e6ff]">
            India&apos;s business-first platform for Houseware, HORECA,
            Stainless Steel and Home Appliances. India&apos;s premier B2B trade
            show for Houseware, HoReCa, Home Décor & Kitchen. Organized by
            V-Tech Innovation Services.
          </p>

          {/* SOCIAL ICONS */}
          <div className="mt-5 flex items-center gap-3">
            {/* Facebook - ACTIVE */}
            <a
              href="https://www.facebook.com/share/1EiPZcSKdq/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#1877f2] hover:scale-110"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* Instagram - ACTIVE */}
            <a
              href="https://www.instagram.com/fusiontheera?igsh=MXFyYngydHI4ZTdvZg=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:scale-110"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            {/* Twitter/X - DISABLED */}
            <span
              className="flex h-9 w-9  items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Twitter (coming soon)"
              // title="Coming soon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-1.65.98-3.91 1.6A4.48 4.48 0 0 0 16 0c-2.5 0-4.5 2.24-4.5 5 0 .39.04.76.12 1.12A12.94 12.94 0 0 1 1.64 1.15 5 5 0 0 0 .96 3.6a4.93 4.93 0 0 0 2 3.07 4.54 4.54 0 0 1-2-.56v.06a5 5 0 0 0 4 4.92 4.52 4.52 0 0 1-2 .08 4.93 4.93 0 0 0 4.6 3.42A9 9 0 0 1 0 19.54 12.7 12.7 0 0 0 6.92 21c8.3 0 12.84-7.11 12.84-13.29 0-.2 0-.42-.02-.63A9.35 9.35 0 0 0 23 3z" />
              </svg>
            </span>

            {/* LinkedIn - DISABLED */}
            <span
              className="flex h-9 w-9  items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="LinkedIn (coming soon)"
              // title="Coming soon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.75v2.32h.05c.52-.98 1.78-2.01 3.67-2.01 3.92 0 4.64 2.58 4.64 5.93V24H16.7v-7.99c0-1.9-.03-4.34-2.65-4.34-2.66 0-3.07 2.07-3.07 4.21V24H7.99V8z" />
              </svg>
            </span>

            {/* YouTube - DISABLED */}
            <span
              className="flex h-9 w-9  items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="YouTube (coming soon)"
              // title="Coming soon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C18.6 3.5 12 3.5 12 3.5s-6.6 0-9.1.3c-1.2.3-2.1 1.2-2.4 2.4C.1 8.7 0 12 0 12s.1 3.3.5 5.8c.3 1.2 1.2 2.1 2.4 2.4 2.5.3 9.1.3 9.1.3s6.6 0 9.1-.3c1.2-.3 2.1-1.2 2.4-2.4.4-2.5.5-5.8.5-5.8s0-3.3-.5-5.8zM9.6 15.5V8.5L15.8 12l-6.2 3.5z" />
              </svg>
            </span>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8cecff]">
            Quick Links
          </h3>
          <div className="mt-4 grid gap-2 text-sm text-[#e7f0ff]">
            <a href="#about" className="transition hover:text-[#8cecff]">
              About The Show
            </a>
            <a href="#houseware" className="transition hover:text-[#8cecff]">
              Product Portfolio
            </a>
            <a href="#why" className="transition hover:text-[#8cecff]">
              Why Fusion The Era
            </a>
            <a
              href="/visitor-registration"
              className="transition hover:text-[#8cecff]"
            >
              Visitor Registration
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8cecff]">
            Contact
          </h3>
          <div className="mt-4 grid gap-2 text-sm text-[#e7f0ff]">
            <p>Email: info@fusionera.in</p>
            <p>Phone: +91 93157 00590</p>
            <p>Support: +91 93157 00590</p>
          </div>
        </div>

        {/* ADDRESS */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8cecff]">
            Address
          </h3>
          <p className="mt-4 text-sm leading-7 text-[#e7f0ff]">
            V-Tech Innovation Services
            <br />
            Ghaziabad U.P Pincode -201014
            <br />
            India
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mx-auto mt-8 w-[92%] max-w-7xl border-t border-white/20 pt-4 text-xs text-[#c8d9ff] md:flex md:items-center md:justify-between">
        <p>© 2026 Fusionera Home. All rights reserved.</p>
        <div className="mt-2 flex gap-5 md:mt-0">
          <a href="#" className="transition hover:text-[#8cecff]">
            Privacy
          </a>
          <a href="#" className="transition hover:text-[#8cecff]">
            Terms
          </a>
          <a href="#" className="transition hover:text-[#8cecff]">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}