"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const show = (el: HTMLElement) => {
      const delay = Number(el.dataset.revealDelay ?? 0);
      const timer = setTimeout(() => {
        el.classList.add("is-visible");
        timers.delete(timer);
      }, Number.isFinite(delay) ? delay : 0);
      timers.add(timer);
    };

    const revealNow = () => {
      const elements = document.querySelectorAll<HTMLElement>(
        ".reveal-on-scroll:not(.is-visible)",
      );

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          show(el);
        } else {
          intersectionObserver.observe(el);
        }
      });
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target as HTMLElement);
          intersectionObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 0px 0px" },
    );

    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(revealNow);
    });

    requestAnimationFrame(() => requestAnimationFrame(revealNow));
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [pathname]);

  return (
    <div id="app-shell">
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </div>
  );
}
