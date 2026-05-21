"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSiteSettings } from "@/lib/useSiteSettings";
import BrandMarquee from "@/components/BrandMarquee";

export default function Header() {
  const siteSettings = useSiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);

    const anchor = sessionStorage.getItem("scrollTo");
    if (anchor) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
    // FIXED: removed window.scrollTo({ top: 0 }) — yeh har page change pe
    // unnecessary scroll/reload feel deta tha
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const anchor = href.slice(1);
      if (pathname !== "/") {
        sessionStorage.setItem("scrollTo", anchor);
        router.push("/");
      } else {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-30 border-b border-white/30 bg-gradient-to-r from-[#110c41] via-[#110c41] to-[#110c41]/80 backdrop-blur-md"
    >
      <BrandMarquee />
      <div
        ref={menuRef}
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-10 lg:py-4"
      >
        {/* LOGO */}
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="min-w-0">
            <img
              src={siteSettings.logo_url || "/images/logo.jpeg"}
              alt="Fusion The Era logo"
              className="h-10 w-auto max-w-[190px] object-contain sm:h-12 sm:max-w-[250px]"
            />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-4 text-sm font-medium text-white lg:flex xl:gap-8">
          <Link href="/" className="nav-link hover:text-brand-cyan">
            Home
          </Link>
          {/* FUSION THE ERA DROPDOWN */}
          <div className="group relative">
            <Link
              href="/"
              className="nav-link inline-flex items-center gap-1 hover:text-brand-cyan"
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
                  href="/show"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  About The Show
                </Link>
                <Link
                  href="/organizer"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  About Organiser
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
                  href="/gallery"
                  className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10"
                >
                  Product Range
                </Link>
              </div>
            </div>
          </div>

          {/* VISITORS DROPDOWN */}
          <div className="group relative">
            {/* FIXED: was <a href="#featured"> */}
            <Link
              href="/whoshouldvisit"
              className="nav-link inline-flex items-center gap-1 hover:text-brand-magenta"
            >
              Visitors <span>▾</span>
            </Link>
            <div className="nav-dropdown invisible absolute left-0 top-full z-40 w-52 pt-2 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-md border border-white/15 bg-[#191452] p-2 shadow-lg">
                <Link href="/whoshouldvisit" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Who Should Visit</Link>
                <Link href="/benefits" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Benefits</Link>
                <Link href="/comments" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Visitor Comments</Link>
                <Link href="/visiting-hours" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Visiting Hours</Link>
                <Link href="/visitor-facilities" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Visitor Facilities</Link>
                <Link href="/travel-stay" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Travel &amp; Stay</Link>
                <Link href="/reaching-the-venue" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Reaching The Venue</Link>
              </div>
            </div>
          </div>

          {/* EXHIBITORS DROPDOWN */}
          <div className="group relative">
            {/* FIXED: was <a href="#featured"> */}
            <Link
              href="/whoshouldexhibit"
              className="nav-link inline-flex items-center gap-1 hover:text-brand-magenta"
            >
              Exhibitors <span>▾</span>
            </Link>
            <div className="nav-dropdown invisible absolute left-0 top-full z-40 w-52 pt-2 opacity-0 transition duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-md border border-white/15 bg-[#191452] p-2 shadow-lg">
                <Link href="/whoshouldexhibit" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Who Should Exhibit?</Link>
                <Link href="/exhibitorbenefits" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Benefits</Link>
                <Link href="/exhibitorprofile" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Exhibitor Profile</Link>
                <Link href="/exhibitorcomments" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Exhibitor Comments</Link>
                <Link href="/exhibitorlist" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Exhibitors List</Link>
                <Link href="/exhibitor-facilities" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Exhibitor Facilities</Link>
                <Link href="/travel-stay" className="block rounded px-3 py-2 text-xs text-white hover:bg-white/10">Travel &amp; Stay</Link>
              </div>
            </div>
          </div>

          <Link href="/videos" className="nav-link hover:text-brand-amber">
            Videos
          </Link>
          <Link href="/podcast" className="nav-link hover:text-brand-amber">
            Podcast
          </Link>

          <Link href="/newsletter" className="nav-link hover:text-brand-amber">
            Newsletter
          </Link>
          <Link
            href="/exhibitors-registration"
            className="nav-link hover:text-brand-amber"
          >
            Exhibitors Registration
          </Link>
          <Link
            href="/visitor-registration"
            className="nav-link hover:text-brand-amber"
          >
            Visitor Registration
          </Link>
          <Link
            href="/pay-stall-advance"
            className="nav-link hover:text-brand-amber"
          >
            Pay Stall Advance
          </Link>
          <Link href="/gallery" className="nav-link hover:text-brand-amber">
            Gallery
          </Link>
        </nav>

        {/* HAMBURGER BUTTON */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`inline-flex items-center justify-center rounded-md border border-white/40 bg-[#1b2560] px-3 py-2 text-white transition duration-300 hover:scale-105 lg:hidden ${mobileMenuOpen ? "rotate-90" : "rotate-0"}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
              >
                <path d="M3 6h18"></path>
                <path d="M3 12h18"></path>
                <path d="M3 18h18"></path>
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <nav className="mobile-menu max-h-[calc(100vh-76px)] w-full overflow-y-auto rounded-md border border-white/10 bg-[#0B1E5B]/95 p-3 text-sm font-medium text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:hidden">
            <button
              onClick={() => handleMobileNav("/")}
              className="block w-full rounded px-2 py-2 text-left hover:bg-white/10"
            >
              Home
            </button>
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
                {/* FIXED: was /about */}
                <button
                  onClick={() => handleMobileNav("/show")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  About The Show 2026
                </button>
                {/* FIXED: was /about */}
                <button
                  onClick={() => handleMobileNav("/organizer")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  About Organiser
                </button>
                {/* FIXED: was /about */}
                <button
                  onClick={() => handleMobileNav("/trade")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Trade Show Facts
                </button>
                {/* FIXED: was /about */}
                <button
                  onClick={() => handleMobileNav("/report")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Post Show Report
                </button>
                <button
                  onClick={() => handleMobileNav("/gallery")}
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
                {/* FIXED: was #featured */}
                <button
                  onClick={() => handleMobileNav("/whoshouldvisit")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Who Should Visit
                </button>
                {/* FIXED: was #categories */}
                <button
                  onClick={() => handleMobileNav("/benefits")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Benefits
                </button>
                <button onClick={() => handleMobileNav("/comments")} className="rounded px-2 py-2 hover:bg-white/10 text-left w-full">Visitor Comments</button>
                <button onClick={() => handleMobileNav("/visiting-hours")} className="rounded px-2 py-2 hover:bg-white/10 text-left w-full">Visiting Hours</button>
                <button onClick={() => handleMobileNav("/visitor-facilities")} className="rounded px-2 py-2 hover:bg-white/10 text-left w-full">Visitor Facilities</button>
                <button onClick={() => handleMobileNav("/travel-stay")} className="rounded px-2 py-2 hover:bg-white/10 text-left w-full">Travel &amp; Stay</button>
                <button onClick={() => handleMobileNav("/reaching-the-venue")} className="rounded px-2 py-2 hover:bg-white/10 text-left w-full">Reaching The Venue</button>
              </div>
            </details>

            <details className="group mt-1 mobile-submenu">
              <summary className="mobile-summary cursor-pointer list-none rounded px-2 py-2 hover:bg-white/10">
                Exhibitors
              </summary>
              <div className="mobile-submenu-content mt-1 grid gap-1 pl-3 text-xs">
                {/* FIXED: was /about */}
                <button
                  onClick={() => handleMobileNav("/whoshouldexhibit")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Who Should Exhibit?
                </button>
                {/* FIXED: was /about */}
                <button
                  onClick={() => handleMobileNav("/exhibitorbenefits")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Benefits
                </button>
                {/* FIXED: was /about */}
                <button
                  onClick={() => handleMobileNav("/exhibitorprofile")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Exhibitor Profile
                </button>
                {/* FIXED: was /about */}
                <button
                  onClick={() => handleMobileNav("/exhibitorcomments")}
                  className="rounded px-2 py-2 hover:bg-white/10 text-left w-full"
                >
                  Exhibitor Comments
                </button>
                <button onClick={() => handleMobileNav("/exhibitorlist")} className="rounded px-2 py-2 hover:bg-white/10 text-left w-full">Exhibitors List</button>
                <button onClick={() => handleMobileNav("/exhibitor-facilities")} className="rounded px-2 py-2 hover:bg-white/10 text-left w-full">Exhibitor Facilities</button>
                <button onClick={() => handleMobileNav("/travel-stay")} className="rounded px-2 py-2 hover:bg-white/10 text-left w-full">Travel &amp; Stay</button>
              </div>
            </details>

            <button
              onClick={() => handleMobileNav("/videos")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Videos
            </button>
            <button
              onClick={() => handleMobileNav("/podcast")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Podcast
            </button>

            <button
              onClick={() => handleMobileNav("/newsletter")}
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
              onClick={() => handleMobileNav("/pay-stall-advance")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Pay Stall Advance
            </button>
            <button
              onClick={() => handleMobileNav("/reaching-the-venue")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Reaching The Venue
            </button>
            <button
              onClick={() => handleMobileNav("/gallery")}
              className="mt-1 block rounded px-2 py-2 hover:bg-white/10 text-left w-full"
            >
              Gallery
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
