"use client";
import { useEffect, useState } from "react";

const DEFAULT_SETTINGS: Record<string, string> = {
  contact_delhi_name: "Mr. Pawan Singh",
  contact_delhi_mobile: "+91 93157 00590",
  contact_delhi_tel: "+91 (11) 2571 4111",
  contact_delhi_email: "pawan.singh@fusiontheera.com",
  contact_mumbai_name: "Mr. Jasvinder Singh Chaudhary",
  contact_mumbai_mobile: "+91 85888 92885",
  contact_mumbai_tel: "+91 (22) 6997 1122",
  contact_mumbai_email: "jasvinder.chaudhary@fusiontheera.com",
  logo_url: "/images/logo.jpeg",
  event_date: "July 4–7, 2026",
  event_venue: "Bharat Mandapam, Pragati Maidan, New Delhi",
};

type SiteSettings = Record<string, string> & {
  loading: boolean;
  error: string | null;
};

let cache: Record<string, string> | null = null;
let cacheTime = 0;
const CACHE_TTL = 30_000; // 30 seconds

export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<Record<string, string>>(cache ?? DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const now = Date.now();
    if (cache && now - cacheTime < CACHE_TTL) {
      setSettings(cache);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("/api/settings", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Unable to load site settings.");
        return r.json();
      })
      .then((data) => {
        if (data?.settings) {
          const nextSettings = { ...DEFAULT_SETTINGS, ...data.settings };
          cache = nextSettings;
          cacheTime = Date.now();
          setSettings(nextSettings);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unable to load site settings.");
        setSettings(cache || DEFAULT_SETTINGS);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { ...settings, loading, error } as unknown as SiteSettings;
}
