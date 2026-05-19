"use client";
import { useEffect, useState } from "react";
import { useSiteSettings } from "@/lib/useSiteSettings";

interface GalleryImage {
  id: number;
  title: string;
  url: string;
  category: string;
  type: string;
  is_published: boolean;
}

export default function GalleryPage() {
  const siteSettings = useSiteSettings();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const fetchImages = () => {
    fetch("/api/admin/images", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setImages(data.data.filter((img: GalleryImage) => img.is_published));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchImages();
    const onVisible = () => { if (document.visibilityState === "visible") fetchImages(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const categories = ["all", ...Array.from(new Set(images.map((i) => i.category).filter(Boolean)))];
  const filtered = activeCategory === "all" ? images : images.filter((i) => i.category === activeCategory);

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
          style={{ background: "rgba(232,39,75,0.2)" }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(0,200,212,0.15)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p
            className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3"
            style={{ color: "#8cecff" }}
          >
            {siteSettings.event_venue}
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Gallery</h1>
          <p className="mt-3 text-white/60 text-sm">
            Highlights from Fusion The Era — {siteSettings.event_date}
          </p>
          <div className="mt-5 flex justify-center">
            <span
              className="h-1 w-20 rounded-full"
              style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)" }}
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition"
                style={
                  activeCategory === cat
                    ? { background: "linear-gradient(90deg,#E8274B,#F4822A)", color: "#fff", border: "none" }
                    : { background: "transparent", color: "#374151", border: "1px solid #dde6ff" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-red-100 border-t-[#E8274B] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No images yet.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((img) => (
              <div
                key={img.id}
                className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow"
                style={{ border: "1px solid #dde6ff" }}
                onClick={() => setLightbox(img)}
              >
                <div className="relative overflow-hidden bg-gray-50">
                  <img
                    src={img.url}
                    alt={img.title || "Gallery image"}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {img.title && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-xs font-semibold truncate">{img.title}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-2xl font-bold"
            >
              ✕
            </button>
            <img
              src={lightbox.url}
              alt={lightbox.title || "Gallery image"}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            {lightbox.title && (
              <p className="mt-3 text-white/80 text-sm text-center">{lightbox.title}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
