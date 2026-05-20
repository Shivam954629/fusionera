"use client";
import Link from "next/link";

const Divider = () => <div className="h-px w-20 bg-[#1a1464]/20 my-3 mx-auto" />;

export default function VideosSection() {
  return (
    <section className="w-full py-10 md:py-14 bg-white">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10">

        {/* Title block — exactly like HGH "VIDEO GALLERY" style */}
        <div className="text-center mb-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[#1a1464]">
            Fusion The Era
          </h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1464]/50">
            Perfect Business Platform
          </p>
          <Divider />
        </div>

        {/* Video — 16:9 container, cover fill */}
        <div className="overflow-hidden rounded-xl shadow-lg border border-[#1a1464]/10">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <video
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "cover" }}
              controls
              playsInline
            >
              <source src="/videos/intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* View All Videos */}
        <div className="text-center mt-7">
          <Link
            href="/videos"
            className="inline-block rounded px-8 py-2.5 text-sm font-semibold text-white transition"
            style={{ background: "#e84030", boxShadow: "0 4px 14px rgba(232,64,48,0.3)" }}
          >
            View All Videos
          </Link>
        </div>

      </div>
    </section>
  );
}
