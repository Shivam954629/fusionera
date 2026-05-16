"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const closeMenu = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-30 border-b border-white/30 bg-gradient-to-r from-[#110c41] via-[#110c41] to-[#110c41]/80 backdrop-blur-md"
    >
      <div className="mx-auto flex w-[92%] max-w-7xl flex-wrap items-center justify-between gap-3 py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="/images/logo.jpeg"
              alt="Fusionera logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white md:flex">
          {/* Fusion The Era */}
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
                  About Fusion The Era
                </Link>
                <Link
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  About The Show
                </Link>
                <Link
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  About Organiser
                </Link>
                <Link
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Trade Show Facts
                </Link>
                <Link
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Post Show Report
                </Link>
                <Link
                  href="/products"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Product Range
                </Link>
              </div>
            </div>
          </div>

          {/* Visitors */}
          <div className="group relative">
            <a
              href="#featured"
              className="nav-link inline-flex items-center gap-1 hover:text-brand-magenta focus:text-brand-magenta"
            >
              Visitors <span>▾</span>
            </a>
            <div className="nav-dropdown invisible absolute left-0 top-full z-40 w-52 pt-2 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-md border border-white/15 bg-[#191452] p-2 shadow-lg">
                <a
                  href="#featured"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Who Should Visit
                </a>
                <a
                  href="#categories"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Benefits
                </a>
                <a
                  href="#about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Visitor Comments
                </a>
              </div>
            </div>
          </div>

          {/* Exhibitors */}
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
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Who Should Exhibit?
                </Link>
                <Link
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Benefits
                </Link>
                <Link
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Exhibitor Profile
                </Link>
                <Link
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Exhibitor Comments
                </Link>
                <Link
                  href="/about"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Exhibitors List
                </Link>
              </div>
            </div>
          </div>

          <a href="#contact" className="nav-link hover:text-brand-amber">
            Newsletter
          </a>
          <Link
            href="/exhibitors-registration"
            className="nav-link hover:text-brand-amber border-b-2 border-transparent hover:border-brand-amber transition-all"
          >
            Exhibitors Registration
          </Link>
          <Link
            href="/visitor-registration"
            className="nav-link hover:text-brand-amber border-b-2 border-transparent hover:border-brand-amber transition-all"
          >
            Visitor Registration
          </Link>
          <a href="#contact" className="nav-link hover:text-brand-amber">
            Pay Stall Advance
          </a>
          <a href="#contact" className="nav-link hover:text-brand-amber">
            Reaching The Venue
          </a>
        </nav>

        {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mobile-menu surface w-full rounded-md border p-3 text-sm font-medium text-white md:hidden">
            <details className="group mobile-submenu">
              <summary className="mobile-summary cursor-pointer list-none rounded px-2 py-2 hover:bg-white/10">
                Fusion The Era
              </summary>
              <div className="mobile-submenu-content mt-1 grid gap-1 pl-3 text-xs">
                <button
                  onClick={() => handleMobileNav("/about")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  About Fusion The Era
                </button>
                <button
                  onClick={() => handleMobileNav("/about")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  About The Show 2026
                </button>
                <button
                  onClick={() => handleMobileNav("/about")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  About Organiser
                </button>
                <button
                  onClick={() => handleMobileNav("/about")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Trade Show Facts
                </button>
                <button
                  onClick={() => handleMobileNav("/about")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Post Show Report
                </button>
                <button
                  onClick={() => handleMobileNav("/products")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Product Range
                </button>
              </div>
            </details>

            <details className="group mt-1 mobile-submenu">
              <summary className="mobile-summary cursor-pointer list-none rounded px-2 py-2 hover:bg-white/10">
                Visitors
              </summary>
              <div className="mobile-submenu-content mt-1 grid gap-1 pl-3 text-xs">
                <button
                  onClick={() => handleMobileNav("#featured")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Who Should Visit
                </button>
                <button
                  onClick={() => handleMobileNav("#categories")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Benefits
                </button>
                <button
                  onClick={() => handleMobileNav("#about")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Visitor Comments
                </button>
              </div>
            </details>

            <details className="group mt-1 mobile-submenu">
              <summary className="mobile-summary cursor-pointer list-none rounded px-2 py-2 hover:bg-white/10">
                Exhibitors
              </summary>
              <div className="mobile-submenu-content mt-1 grid gap-1 pl-3 text-xs">
                <button
                  onClick={() => handleMobileNav("#featured")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Who Should Exhibit?
                </button>
                <button
                  onClick={() => handleMobileNav("#categories")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Benefits
                </button>
                <button
                  onClick={() => handleMobileNav("#about")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Exhibitor Profile
                </button>
                <button
                  onClick={() => handleMobileNav("#about")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Exhibitor Comments
                </button>
                <button
                  onClick={() => handleMobileNav("#about")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Exhibitors List
                </button>
              </div>
            </details>

            <button
              onClick={() => handleMobileNav("#contact")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Newsletter
            </button>
            <button
              onClick={() => handleMobileNav("/exhibitors-registration")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Exhibitors Registration
            </button>
            <button
              onClick={() => handleMobileNav("/visitor-registration")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Visitor Registration
            </button>
            <button
              onClick={() => handleMobileNav("#contact")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Pay Stall Advance
            </button>
            <button
              onClick={() => handleMobileNav("#contact")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Reaching The Venue
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
