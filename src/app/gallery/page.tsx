"use client";
import { useCallback, useEffect, useState } from "react";

interface GalleryImage {
  id: number | string;
  title: string;
  url: string;
  category: string;
  is_published: boolean;
}

const catalogueImages: GalleryImage[] = [
  { id: "c1",  title: "Houseware",          url: "/images/catalogue/houseware-1.jpg",      category: "Houseware",         is_published: true },
  { id: "c2",  title: "Houseware",          url: "/images/catalogue/houseware-2.jpg",      category: "Houseware",         is_published: true },
  { id: "c3",  title: "Houseware",          url: "/images/catalogue/houseware-3.jpg",      category: "Houseware",         is_published: true },
  { id: "c4",  title: "HORECA Ware",        url: "/images/catalogue/horeca-1.jpg",         category: "HORECA Ware",       is_published: true },
  { id: "c5",  title: "HORECA Ware",        url: "/images/catalogue/horeca-2.jpg",         category: "HORECA Ware",       is_published: true },
  { id: "c6",  title: "HORECA Ware",        url: "/images/catalogue/horeca-3.jpg",         category: "HORECA Ware",       is_published: true },
  { id: "c8",  title: "Stainless Steel",    url: "/images/catalogue/stainless-steel-1.jpg",category: "Stainless Steel",   is_published: true },
  { id: "c9",  title: "Stainless Steel",    url: "/images/catalogue/stainless-steel-2.jpg",category: "Stainless Steel",   is_published: true },
  { id: "c10", title: "Home Appliances",    url: "/images/catalogue/home-appliances-1.jpg",category: "Home Appliances",   is_published: true },
  { id: "c11", title: "Cookware",           url: "/images/catalogue/cookware.jpg",         category: "Cookware",          is_published: true },
  { id: "c12", title: "Tableware",          url: "/images/catalogue/tableware1.jpg",        category: "Tableware",         is_published: true },
  { id: "c13", title: "Tableware",          url: "/images/catalogue/tableware2.jpg",       category: "Tableware",         is_published: true },
  { id: "c14", title: "Tableware",          url: "/images/catalogue/tableware3.jpg",       category: "Tableware",         is_published: true },
  { id: "c15", title: "Tableware",          url: "/images/catalogue/tableware4.jpg",       category: "Tableware",         is_published: true },
  { id: "c16", title: "Ceramic Plates",     url: "/images/catalogue/ceramic-plates.jpg",  category: "Tableware",         is_published: true },
  { id: "c17", title: "Plastic Ware",       url: "/images/catalogue/plastic-ware.jpg",    category: "Plastic Ware",      is_published: true },
  { id: "c18", title: "Plastic Ware",       url: "/images/catalogue/plastic-ware-2.jpg",  category: "Plastic Ware",      is_published: true },
  { id: "c19", title: "Brass & Silver",     url: "/images/catalogue/brass-silver-1.jpg",  category: "Brass & Silver",    is_published: true },
  { id: "c20", title: "Brass & Silver",     url: "/images/catalogue/brass-silver-2.jpg",  category: "Brass & Silver",    is_published: true },
  { id: "c21", title: "Brass & Silver",     url: "/images/catalogue/brass-silver-3.jpg",  category: "Brass & Silver",    is_published: true },
  { id: "c22", title: "Brass & Silver",     url: "/images/catalogue/brass-silver-4.jpg",  category: "Brass & Silver",    is_published: true },
  { id: "c23", title: "Brass & Silver",     url: "/images/catalogue/brass-silver-5.jpg",  category: "Brass & Silver",    is_published: true },
   { id: "c24", title: "Brass & Silver",     url: "/images/catalogue/brass-silver-6.jpg",  category: "Brass & Silver",    is_published: true },
  { id: "c25", title: "Glassware",          url: "/images/catalogue/glassware-1.jpg",     category: "Glassware",         is_published: true },
  { id: "c26", title: "Glassware",          url: "/images/catalogue/glassware-2.jpg",     category: "Glassware",         is_published: true },
  { id: "c27", title: "Baking & Aluminium", url: "/images/catalogue/baking-1.jpg",        category: "Baking & Aluminium",is_published: true },
  { id: "c28", title: "Baking & Aluminium", url: "/images/catalogue/baking-2.jpg",        category: "Baking & Aluminium",is_published: true },
  { id: "c29", title: "Cooking Range",      url: "/images/catalogue/cooking-range-1.jpg", category: "Cooking Range",     is_published: true },
  { id: "c30", title: "RO Water",           url: "/images/catalogue/ro-water-1.jpg",      category: "RO Water",          is_published: true },
  { id: "c31", title: "Vases",              url: "/images/catalogue/vases.jpg",           category: "Home Décor",        is_published: true },
];

export default function GalleryPage() {
  const [dbImages, setDbImages] = useState<GalleryImage[]>([]);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const fetchImages = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/admin/images", { cache: "no-store", signal });
      const data = await res.json();
      if (data?.success) {
        setDbImages((data?.data ?? []).filter((img: GalleryImage) => img?.is_published));
      }
    } catch {
      // silently fail — catalogue images still show
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchImages(controller.signal);
    const onVisible = () => { if (document.visibilityState === "visible") fetchImages(); };
    document.addEventListener("visibilitychange", onVisible);
    const interval = setInterval(() => fetchImages(), 30000);
    return () => { controller.abort(); document.removeEventListener("visibilitychange", onVisible); clearInterval(interval); };
  }, [fetchImages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImages([]);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % lightboxImages.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxImages.length]);

  const groupByCategory = (imgs: GalleryImage[]) => {
    const map = new Map<string, GalleryImage[]>();
    imgs.forEach((img) => {
      const cat = img.category || "General";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(img);
    });
    return map;
  };

  const dbGroups = groupByCategory(dbImages);
  const dbUrls = new Set(dbImages.map((img) => img.url));
  const uniqueCatalogueImages = catalogueImages.filter((img) => !dbUrls.has(img.url));
  const catalogueGroups = groupByCategory(uniqueCatalogueImages);

  const openLightbox = (imgs: GalleryImage[], idx: number) => {
    setLightboxImages(imgs);
    setLightboxIndex(idx);
  };

  return (
    <section className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]" data-reveal-delay="50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl text-white">Photo Gallery</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>

            {dbImages.length > 0 && (
              <div className="mt-8 mb-10">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] mb-4 pb-2 text-[#00509d]" style={{ borderBottom: "2px solid rgba(0,80,157,0.3)" }}>
                  Exhibition Gallery
                </h3>
                {Array.from(dbGroups.entries()).map(([cat, imgs]) => (
                  <div key={cat} className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-[0.15em] mb-3 text-[#00509d]">{cat}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {imgs.map((img, idx) => (
                        <div
                          key={img.id}
                          className="group cursor-pointer overflow-hidden rounded-xl bg-white"
                          style={{ border: "1px solid rgba(0,80,157,0.12)" }}
                          onClick={() => openLightbox(imgs, idx)}
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.url} alt={img.title || cat} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                          </div>
                          {img.title && <p className="px-2 py-1.5 text-[10px] font-semibold truncate text-[#00509d]">{img.title}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              {Array.from(catalogueGroups.entries()).map(([cat, imgs]) => (
                <div key={cat} className="mb-8">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3 text-[#00509d]">{cat}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {imgs.map((img, idx) => (
                      <div
                        key={img.id}
                        className="group cursor-pointer overflow-hidden rounded-xl bg-white"
                        style={{ border: "1px solid rgba(0,80,157,0.12)" }}
                        onClick={() => openLightbox(imgs, idx)}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.url} alt={img.title || cat} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImages([])}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightboxImages([])} className="absolute -top-10 right-0 text-white/60 hover:text-white text-2xl font-bold">✕</button>
            {lightboxImages.length > 1 && (
              <>
                <button onClick={() => setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white text-xl transition">‹</button>
                <button onClick={() => setLightboxIndex((i) => (i + 1) % lightboxImages.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white text-xl transition">›</button>
              </>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightboxImages[lightboxIndex]?.url} alt={lightboxImages[lightboxIndex]?.title} className="max-h-[80vh] w-full object-contain rounded-lg shadow-2xl" />
            {lightboxImages[lightboxIndex]?.title && (
              <p className="mt-3 text-white/70 text-sm text-center">{lightboxImages[lightboxIndex].title}</p>
            )}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 justify-center">
              {lightboxImages.map((img, i) => (
                <button key={i} onClick={() => setLightboxIndex(i)} className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition ${i === lightboxIndex ? "border-white" : "border-transparent opacity-50 hover:opacity-80"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
