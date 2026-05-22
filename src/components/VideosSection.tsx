"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

const Divider = () => <div className="h-0.5 w-16 my-3 mx-auto" style={{ background: "rgba(255,255,255,0.4)" }} />;

export default function VideosSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Auto-replay after 2 seconds when video ends
    const handleEnded = () => {
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 2000);
    };

    // Pause when scrolled out of view, play when back in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    video.addEventListener("ended", handleEnded);
    observer.observe(video);

    return () => {
      video.removeEventListener("ended", handleEnded);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full py-14 md:py-18" style={{ background: "linear-gradient(135deg, #e03868 0%, #f57050 100%)" }}>
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10">

        {/* Title block */}
        <div className="text-center mb-10">
          <h2 className="text-[15px] font-black uppercase tracking-[0.22em]" style={{ color: "#ffffff" }}>
            Fusion The Era
          </h2>
          <p className="mt-2 text-sm font-black uppercase tracking-[0.18em]" style={{ color: "#ffffff" }}>
            Perfect Business Platform
          </p>
          <Divider />
        </div>

        {/* Video */}
        <div className="overflow-hidden rounded-xl shadow-2xl border border-white/20 bg-black">
          <video
            ref={videoRef}
            className="w-full"
            style={{ objectFit: "contain", maxHeight: "520px", display: "block" }}
            controls
            playsInline
          >
            <source src="/videos/show-promo.mp4" type="video/mp4" />
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        </div>

        {/* View All Videos */}
        <div className="text-center mt-7">
          <Link
            href="/videos"
            className="inline-block rounded px-8 py-2.5 text-sm font-bold transition hover:opacity-90"
            style={{ background: "#ffffff", color: "#e03868", boxShadow: "0 4px 18px rgba(0,0,0,0.15)" }}
          >
            View All Videos
          </Link>
        </div>

      </div>
    </section>
  );
}
