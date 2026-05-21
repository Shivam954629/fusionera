"use client";
import { useEffect, useState } from "react";

interface CmsContent {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

// Fetches a single content entry from the admin Content tab by key.
// Returns null until the API responds; component uses its own fallback.
export function usePageContent(key: string): CmsContent | null {
  const [content, setContent] = useState<CmsContent | null>(null);

  useEffect(() => {
    fetch("/api/admin/content", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const entry = (data?.data ?? []).find(
          (c: { key: string; is_published: boolean }) =>
            c.key === key && c.is_published,
        );
        if (entry) {
          const paras: string[] = entry.content
            ? entry.content
                .split(/\n\n+/)
                .map((p: string) => p.trim())
                .filter(Boolean)
            : [];
          setContent({
            title: entry.title || "",
            subtitle: entry.subtitle || "",
            paragraphs: paras,
          });
        }
      })
      .catch(() => {});
  }, [key]);

  return content;
}
