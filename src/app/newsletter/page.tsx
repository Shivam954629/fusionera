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
      <section className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl flex items-center justify-center" style={{ background: "#fef9c3", minHeight: "200px" }}>
        <div className="w-8 h-8 rounded-full border-4 border-[#fef9c3] border-t-[#0c1148] animate-spin" />
      </section>
    );
  }

  if (!data || !data.is_published || (!data.title && !data.content)) {
    return <section className="mx-auto w-full max-w-7xl my-8" style={{ minHeight: "100px" }} />;
  }

  return (
    <section
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>
        Newsletter
      </h2>
      {data.title && (
        <p className="mt-4 text-lg font-semibold" style={{ color: "#0c1148" }}>{data.title}</p>
      )}
      {data.subtitle && (
        <p className="mt-1 text-base" style={{ color: "#374151" }}>{data.subtitle}</p>
      )}
      {data.content && (
        <p className="mt-4 text-lg leading-8 whitespace-pre-wrap text-justify" style={{ color: "#0c1148" }}>
          {data.content}
        </p>
      )}
    </section>
  );
}
