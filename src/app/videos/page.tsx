"use client";
import { useEffect, useState } from "react";

type Video = {
  id: number;
  title: string;
  url: string;
  is_published: boolean;
};

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const loadVideos = () => {
    fetch("/api/admin/videos", { cache: "no-store" })
      .then((r) => r.json())
      .then((res) => {
        setVideos((res.data ?? []).filter((v: Video) => v.is_published));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadVideos();
    const onVisible = () => { if (!document.hidden) loadVideos(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  const getYouTubeId = (url: string): string | null => {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return m ? m[1] : null;
  };

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
          style={{ background: "rgba(0,200,212,0.18)" }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(123,47,190,0.18)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p
            className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3"
            style={{ color: "#00C8D4" }}
          >
            Fusion The Era Media
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Videos</h1>
          <p className="mt-3 text-white/60 text-sm max-w-lg mx-auto">
            Watch our latest coverage and highlights from Fusion The Era exhibitions and events
          </p>
          <div className="mt-5 flex justify-center">
            <span
              className="h-1 w-20 rounded-full"
              style={{ background: "linear-gradient(90deg,#00C8D4,#7B2FBE)" }}
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        {loading && (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-red-100 border-t-[#E8274B] rounded-full animate-spin mx-auto" />
          </div>
        )}

        {!loading && videos.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-4xl mb-3">🎬</p>
            <p className="font-medium">No videos available yet.</p>
          </div>
        )}

        {!loading && videos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v: Video) => {
              const ytId = getYouTubeId(v.url);
              const isPlaying = playingId === v.id;
              return (
                <div
                  key={v.id}
                  className="rounded-2xl overflow-hidden shadow-sm"
                  style={{ border: "1px solid #dde6ff", background: "#ffffff" }}
                >
                  <div className="relative aspect-video bg-black">
                    {isPlaying && ytId ? (
                      <iframe
                        src={"https://www.youtube.com/embed/" + ytId + "?autoplay=1"}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button onClick={() => setPlayingId(v.id)} className="w-full h-full relative">
                        {ytId && (
                          <img
                            src={"https://img.youtube.com/vi/" + ytId + "/hqdefault.jpg"}
                            alt={v.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                            style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}
                          >
                            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>
                      {v.title}
                    </p>
                    {isPlaying && (
                      <button
                        onClick={() => setPlayingId(null)}
                        className="mt-1 text-xs"
                        style={{ color: "#6b7280" }}
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
