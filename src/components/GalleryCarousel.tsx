"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface GalleryImage {
  id: number | string;
  title: string;
  url: string;
  category: string;
  is_published: boolean;
}


const Divider = () => <div className="h-0.5 w-16 my-3 mx-auto" style={{ background: "#e84030" }} />;

const fallbackImages: GalleryImage[] = [
  { id: "f1", title: "", url: "/images/catalogue/houseware-1.jpg",      category: "", is_published: true },
  { id: "f2", title: "", url: "/images/catalogue/horeca-1.jpg",          category: "", is_published: true },
  { id: "f3", title: "", url: "/images/catalogue/stainless-steel-1.jpg", category: "", is_published: true },
  { id: "f4", title: "", url: "/images/catalogue/home-appliances-1.jpg", category: "", is_published: true },
  { id: "f5", title: "", url: "/images/catalogue/glassware-1.jpg",       category: "", is_published: true },
  { id: "f6", title: "", url: "/images/catalogue/cookware.jpg",          category: "", is_published: true },
  { id: "f7", title: "", url: "/images/catalogue/home-decor-1.jpg",      category: "", is_published: true },
  { id: "f8", title: "", url: "/images/catalogue/brass-silver-1.jpg",   category: "", is_published: true },
  { id: "f9", title: "", url: "/images/catalogue/tableware.jpg",         category: "", is_published: true },
];

export default function GalleryCarousel() {
  const [images, setImages] = useState<GalleryImage[]>(fallbackImages);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetch("/api/admin/images", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const published = (data?.data ?? []).filter((img: GalleryImage) => img?.is_published);
        if (published.length > 0) setImages(published);
      })
      .catch(() => {});
  }, []);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [images.length, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const getImg = (offset: number) => images[(index + offset + images.length) % images.length];
  const visible = images.length >= 3 ? 3 : images.length;

  return (
    <>
      <section className="w-full py-14 md:py-18" style={{ background: "#cce8f5", borderTop: "4px solid #e84030" }}>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10">
            <h2 className="text-[15px] font-extrabold uppercase tracking-[0.2em]" style={{ color: "#1a1464" }}>Photo Gallery</h2>
            <Divider />
          </div>

          {/* 3 equal images */}
          <div className="relative">
            <div className={`grid gap-3 ${visible === 3 ? "grid-cols-3" : visible === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
              {Array.from({ length: visible }).map((_, i) => {
                const img = getImg(i);
                return (
                  <div
                    key={`${img.id}-${i}`}
                    className="cursor-pointer overflow-hidden rounded-sm"
                    onClick={() => setLightbox(img)}
                  >
                    <div className="aspect-[4/3]">
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#1a1464] hover:bg-[#1a1464] hover:text-white transition text-lg border border-[#1a1464]/20"
            >‹</button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#1a1464] hover:bg-[#1a1464] hover:text-white transition text-lg border border-[#1a1464]/20"
            >›</button>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all ${i === index ? "w-5 h-2" : "w-2 h-2"}`}
                style={{ background: i === index ? "#00c8de" : "rgba(0,200,222,0.25)" }}
              />
            ))}
          </div>

          <div className="text-center mt-7">
            <Link
              href="/gallery"
              className="inline-block rounded px-8 py-2.5 text-sm font-semibold text-white transition"
              style={{ background: "#e84030", boxShadow: "0 4px 14px rgba(232,64,48,0.3)" }}
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-10 right-0 text-white/70 hover:text-white text-2xl font-bold">✕</button>
            <img src={lightbox.url} alt={lightbox.title} className="max-h-[80vh] w-full object-contain rounded-xl shadow-2xl" />
            {lightbox.title && <p className="mt-3 text-white/80 text-sm text-center">{lightbox.title}</p>}
          </div>
        </div>
      )}
    </>
  );
}
