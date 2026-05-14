"use client";
import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { usePathname } from "next/navigation";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

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
  }, [pathname]);

  return (
    <div id="app-shell">
      {!pathname.startsWith("/admin") &&
        !pathname.startsWith("/visitor-dashboard") && <Header />}
      {children}
      {!pathname.startsWith("/admin") &&
        !pathname.startsWith("/visitor-dashboard") && <Footer />}
      {!pathname.startsWith("/admin") &&
        !pathname.startsWith("/visitor-dashboard") && <WhatsAppFloat />}
    </div>
  );
}
