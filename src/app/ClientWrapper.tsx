"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read pathname client-side only to avoid useContext(null) during static pre-rendering
  const [isAdmin, setIsAdmin] = useState(true); // default to true to avoid SSR flash on admin

  useEffect(() => {
    const check = () => {
      setIsAdmin(window.location.pathname.startsWith("/admin"));
    };
    check();
    window.addEventListener("popstate", check);
    return () => window.removeEventListener("popstate", check);
  }, []);

  useEffect(() => {
    const show = (el: HTMLElement) => {
      const delay = Number(el.dataset.revealDelay ?? 0);
      setTimeout(() => el.classList.add("is-visible"), delay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 0px 0px" },
    );

    const elements = document.querySelectorAll<HTMLElement>(".reveal-on-scroll:not(.is-visible)");
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        show(el);
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  });

  return (
    <div id="app-shell">
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </div>
  );
}
