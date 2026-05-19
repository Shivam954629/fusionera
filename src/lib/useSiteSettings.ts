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

let cache: Record<string, string> | null = null;
let cacheTime = 0;
const CACHE_TTL = 30_000; // 30 seconds

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, string>>(cache ?? DEFAULT_SETTINGS);

  useEffect(() => {
    const now = Date.now();
    if (cache && now - cacheTime < CACHE_TTL) {
      setSettings(cache);
      return;
    }
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          cache = { ...DEFAULT_SETTINGS, ...data.settings };
          cacheTime = Date.now();
          setSettings(cache);
        }
      })
      .catch(() => {});
  }, []);

  return settings;
}
