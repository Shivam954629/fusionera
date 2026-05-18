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

  useEffect(() => {
    fetch("/api/newsletter")
      .then((r) => r.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-red-400 border-t-transparent animate-spin" />
      </section>
    );
  }

  if (!data || !data.is_published || (!data.title && !data.content)) {
    return <section className="min-h-screen" />;
  }

  return (
    <section className="min-h-screen px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "#E8274B" }}
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          {data.title && (
            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              {data.title}
            </h1>
          )}
          {data.subtitle && (
            <p className="text-base text-gray-500">{data.subtitle}</p>
          )}
        </div>
        {data.content && (
          <div className="rounded-2xl overflow-hidden shadow-sm border border-[#dde6ff] bg-white">
            <div className="px-4 py-6 sm:px-8 sm:py-8">
              <div className="text-sm leading-7 whitespace-pre-wrap text-gray-700">
                {data.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
