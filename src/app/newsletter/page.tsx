"use client";
import { useEffect, useState } from "react";

interface NewsletterData {
  title: string;
  subtitle: string;
  content: string;
  is_published: boolean;
}

export default function NewsletterPage() {
  const [data, setData] = useState<NewsletterData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadNewsletter = () => {
    fetch("/api/newsletter", { cache: "no-store" })
      .then((r) => r.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadNewsletter();
    const onVisible = () => { if (!document.hidden) loadNewsletter(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-red-100 border-t-[#E8274B] animate-spin" />
      </section>
    );
  }

  if (!data || !data.is_published || (!data.title && !data.content)) {
    return <section className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen">
      {/* HERO BANNER */}
      <section className="relative isolate w-full overflow-hidden py-14 md:py-20">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(120deg,#090f2d 0%,#0f1a4f 48%,#1a2f7f 100%)" }}
        />
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div
          className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl"
          style={{ background: "rgba(255,170,0,0.18)" }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(232,39,75,0.15)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p
            className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3"
            style={{ color: "#FFAA00" }}
          >
            Fusion The Era Updates
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Newsletter</h1>
          <p className="mt-3 text-white/60 text-sm max-w-lg mx-auto">
            Stay updated with the latest news and announcements from Fusion The Era
          </p>
          <div className="mt-5 flex justify-center">
            <span
              className="h-1 w-20 rounded-full"
              style={{ background: "linear-gradient(90deg,#FFAA00,#F4822A)" }}
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="text-center mb-8">
          {data.title && (
            <h2 className="mb-2 text-2xl font-bold sm:text-3xl" style={{ color: "#1a1a2e" }}>
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-base" style={{ color: "#6b7280" }}>{data.subtitle}</p>
          )}
        </div>
        {data.content && (
          <div
            className="rounded-2xl overflow-hidden shadow-sm"
            style={{ border: "1px solid #dde6ff", background: "#ffffff" }}
          >
            <div
              className="px-1 py-1 rounded-t-2xl"
              style={{ background: "linear-gradient(90deg,#FFAA00,#F4822A)" }}
            />
            <div className="px-6 py-8 sm:px-10">
              <div
                className="text-sm leading-7 whitespace-pre-wrap"
                style={{ color: "#374151" }}
              >
                {data.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
