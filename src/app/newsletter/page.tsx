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
      <section className="w-full py-8 md:py-12 bg-[#cae9ff] flex items-center justify-center" style={{ minHeight: "200px" }}>
        <div className="w-8 h-8 rounded-full border-4 border-[#cae9ff] border-t-[#00509d] animate-spin" />
      </section>
    );
  }

  if (!data || !data.is_published || (!data.title && !data.content)) {
    return <section className="w-full my-8" style={{ minHeight: "100px" }} />;
  }

  return (
    <section className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#cae9ff]" data-reveal-delay="50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl">Newsletter</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#00509d]" />
            </div>
            {data.title && (
              <p className="mt-4 text-lg font-semibold text-[#00509d]">{data.title}</p>
            )}
            {data.subtitle && (
              <p className="mt-1 text-base text-gray-600">{data.subtitle}</p>
            )}
            {data.content && (
              <p className="mt-4 text-md leading-7 whitespace-pre-wrap text-justify text-black">
                {data.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
