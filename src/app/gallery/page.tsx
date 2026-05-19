"use client";
import { useCallback, useEffect, useState } from "react";
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
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const fetchImages = useCallback(async (signal?: AbortSignal) => {
    setError("");
    try {
      const res = await fetch("/api/admin/images", {
        cache: "no-store",
        signal,
      });
      const data = await res.json();
      if (!res.ok || !data?.success)
        throw new Error(data?.error || "Unable to load gallery.");
      setImages(
        (data?.data ?? []).filter((img: GalleryImage) => img?.is_published),
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Unable to load gallery.");
      setImages([]);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchImages(controller.signal);
    const onVisible = () => {
      if (document.visibilityState === "visible") fetchImages();
    };
    document.addEventListener("visibilitychange", onVisible);
    const interval = setInterval(() => fetchImages(), 30000);
    return () => {
      controller.abort();
      document.removeEventListener("visibilitychange", onVisible);
      clearInterval(interval);
    };
  }, [fetchImages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const categories = [
    "all",
    ...Array.from(new Set(images.map((i) => i.category).filter(Boolean))),
  ];
  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* HERO BANNER */}

      <div className="text-center mt-6 md:mt-10 mb-6 md:mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--app-text)" }}
        >
          Gallery
        </h1>

        <p className="text-sm" style={{ color: "#6b7280" }}>
          Highlights from Fusion The Era — {siteSettings.event_date}
        </p>
      </div>

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
                    ? {
                        background: "linear-gradient(90deg,#3B82F6,#60A5FA)",
                        color: "#fff",
                        border: "none",
                      }
                    : {
                        background: "transparent",
                        color: "#374151",
                        border: "1px solid #dde6ff",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-100 border-t-[#3B82F6] rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                fetchImages();
              }}
              className="mt-4 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#3B82F6,#60A5FA)" }}
            >
              Try again
            </button>
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
                      <p className="text-white text-xs font-semibold truncate">
                        {img.title}
                      </p>
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
              <p className="mt-3 text-white/80 text-sm text-center">
                {lightbox.title}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
