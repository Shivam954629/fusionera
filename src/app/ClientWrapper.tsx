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
    const frame = window.requestAnimationFrame(() => {
      const elements =
        document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target as HTMLElement;
            const delay = Number(target.dataset.revealDelay ?? 0);
            window.setTimeout(() => {
              target.classList.add("is-visible");
            }, delay);
            observer.unobserve(target);
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
      );

      elements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    });

    return () => window.cancelAnimationFrame(frame);
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
