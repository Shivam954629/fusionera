"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="main-header"
      className="sticky top-0 z-30 border-b border-white/30 bg-gradient-to-r from-[#110c41] via-[#110c41] to-[#110c41]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex w-[92%] max-w-7xl flex-wrap items-center justify-between gap-3 py-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <img
              src="/images/logo.jpeg"
              alt="Fusionera logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white md:flex">
          <div className="group relative">
            <Link
              href="/"
              className="nav-link inline-flex items-center gap-1 hover:text-brand-cyan focus:text-brand-cyan"
            >
              Fusion The Era <span>▾</span>
            </Link>
            <div className="nav-dropdown invisible absolute left-0 top-full z-40 w-56 pt-2 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-md border border-white/15 bg-[#191452] p-2 shadow-lg">
                <Link
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  About fusion the era
                </Link>
                <Link
                  href="/show"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  About the show
                </Link>
                <Link
                  href="/organizer"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  About organiser
                </Link>
                <Link
                  href="/trade"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Trade Show Facts
                </Link>
                <Link
                  href="/report"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Post Show Report
                </Link>
                <Link
                  href="/range"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Product Range
                </Link>
              </div>
            </div>
          </div>

          <div className="group relative">
            <a
              href="#featured"
              className="nav-link inline-flex items-center gap-1 hover:text-brand-magenta focus:text-brand-magenta"
            >
              Visitors <span>▾</span>
            </a>
            <div className="nav-dropdown invisible absolute left-0 top-full z-40 w-52 pt-2 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-md border border-white/15 bg-[#191452] p-2 shadow-lg">
  
                <Link
                  href="/whoshouldvisit"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Who should visit
                </Link>

                 <Link
                  href="/benefits"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  benifits
                </Link>

                <Link
                  href="/comments"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                 Visitor comment
                </Link>
             
              </div>
            </div>
          </div>

          <div className="group relative">
            <a
              href="#featured"
              className="nav-link inline-flex items-center gap-1 hover:text-brand-magenta focus:text-brand-magenta"
            >
              Exhibitors <span>▾</span>
            </a>
            <div className="nav-dropdown invisible absolute left-0 top-full z-40 w-52 pt-2 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-md border border-white/15 bg-[#191452] p-2 shadow-lg">
                <Link
                  href="/whoshouldexhibit"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Who should exhibit?
                </Link>
                <Link
                  href="/benefits"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Benefits
                </Link>
                <Link
                  href="/exhibitorprofile"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Exhibiter Profile
                </Link>
                <Link
                  href="/comments"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Exhibiter Comment
                </Link>
                <Link
                  href="/exhibitorlist"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Exhibiters List
                </Link>
              </div>
            </div>
          </div>

          <a href="#contact" className="nav-link hover:text-brand-amber">
            Newsletter
          </a>

          <a href="#contact" className="nav-link hover:text-brand-amber">
            Exhibiters Registration
          </a>


          <Link
            href="/visitor-registration"
            className="nav-link hover:text-brand-amber border-b-2 border-transparent hover:border-brand-amber transition-all"
          >
            Visitor Registration
          </Link>

          <a href="#contact" className="nav-link hover:text-brand-amber">
            Pay Stall Advance
          </a>
    
           <Link
            href="/venue"
            className="nav-link hover:text-brand-amber border-b-2 border-transparent hover:border-brand-amber transition-all"
          >
            Reaching The Venue
          </Link>
          {/* <a href="#contact" className="nav-link hover:text-brand-amber">About Fusion The Era</a>
               <a href="#contact" className="nav-link hover:text-brand-amber">Sponsorship</a> */}
        </nav>

        <div className="flex w-full items-center gap-2 md:w-auto">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`inline-flex items-center justify-center rounded-md border border-white/40 bg-[#1b2560] px-3 py-2 text-white transition duration-300 hover:scale-105 md:hidden ${mobileMenuOpen ? "rotate-90" : "rotate-0"}`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M3 6h18"></path>
                <path d="M3 12h18"></path>
                <path d="M3 18h18"></path>
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-menu surface w-full rounded-md border p-3 text-sm font-medium text-white md:hidden">
            <details className="group mobile-submenu">
              <summary className="mobile-summary cursor-pointer list-none rounded px-2 py-2 hover:bg-white/10">
                Fusion The Era
              </summary>
              <div className="mobile-submenu-content mt-1 grid gap-1 pl-3 text-xs">
                <Link
                  href="/about"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  About fusion the era
                </Link>
                <Link
                  href="/about"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  About the show 2026
                </Link>
                <Link
                  href="/about"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  About organiser
                </Link>
                <Link
                  href="/about"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Trade show facts
                </Link>
                <Link
                  href="/about"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Post Show Report
                </Link>
                <Link
                  href="/products"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Product Range
                </Link>
              </div>
            </details>

            <details className="group mt-1 mobile-submenu">
              <summary className="mobile-summary cursor-pointer list-none rounded px-2 py-2 hover:bg-white/10">
                Visitors
              </summary>
              <div className="mobile-submenu-content mt-1 grid gap-1 pl-3 text-xs">
                <a
                  href="#featured"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Who should visit
                </a>
                <a
                  href="#categories"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Benefits
                </a>
                <a
                  href="#about"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Visitor comment
                </a>
              </div>
            </details>

            <details className="group mt-1 mobile-submenu">
              <summary className="mobile-summary cursor-pointer list-none rounded px-2 py-2 hover:bg-white/10">
                Exhibitors
              </summary>
              <div className="mobile-submenu-content mt-1 grid gap-1 pl-3 text-xs">
                <a
                  href="#featured"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Who should exhibit?
                </a>
                <a
                  href="#categories"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Benefits
                </a>
                <a
                  href="#about"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Exhibitor Profile
                </a>
                <a
                  href="#about"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Exhibitor Comment
                </a>
                <a
                  href="#about"
                  className="rounded px-2 py-2 hover:bg-white/10"
                >
                  Exhibitors List
                </a>
              </div>
            </details>

            <a
              href="#new"
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10"
            >
              Exhibitors
            </a>
            <a
              href="#contact"
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10"
            >
              Exhibiters Registration
            </a>
            <Link
              href="/visitor-registration"
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10"
            >
              Visitor Registration
            </Link>
            <a
              href="#contact"
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10"
            >
              Pay Stall Advance
            </a>
            <a
              href="#contact"
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10"
            >
              Reaching The Venue
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
