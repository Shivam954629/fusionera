"use client";
import { useCallback, useEffect, useState } from "react";

type Video = {
  id: number;
  title: string;
  url: string;
  is_published: boolean;
};

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);

  const loadVideos = useCallback(async (signal?: AbortSignal) => {
    setError("");
    try {
      const response = await fetch("/api/admin/videos", {
        cache: "no-store",
        signal,
      });
      const res = await response.json();
      if (!response.ok) throw new Error(res?.error || "Unable to load videos.");
      setVideos((res?.data ?? []).filter((v: Video) => v?.is_published));
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Unable to load videos.");
      setVideos([]);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadVideos(controller.signal);
    const onVisible = () => {
      if (!document.hidden) loadVideos();
    };
    document.addEventListener("visibilitychange", onVisible);
    const interval = setInterval(() => loadVideos(), 30000);
    return () => {
      controller.abort();
      document.removeEventListener("visibilitychange", onVisible);
      clearInterval(interval);
    };
  }, [loadVideos]);

  const getYouTubeId = (url: string): string | null => {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return m ? m[1] : null;
  };

  return (
    <div className="min-h-screen">
      {/* HERO BANNER */}

      <div className="text-center mt-6 md:mt-10 mb-6 md:mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--app-text)" }}
        >
          Videos
        </h1>

        <p className="text-sm" style={{ color: "#6b7280" }}>
          Watch our latest coverage and highlights from Fusion The Era
          exhibitions and events
        </p>
      </div>

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        {loading && (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-blue-100 border-t-[#3B82F6] rounded-full animate-spin mx-auto" />
          </div>
        )}

        {!loading && error && (
          <div className="py-20 text-center text-gray-500">
            <p className="font-medium">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                loadVideos();
              }}
              className="mt-4 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#3B82F6,#60A5FA)" }}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-4xl mb-3">🎬</p>
            <p className="font-medium">No videos available yet.</p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
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
                        src={
                          "https://www.youtube.com/embed/" +
                          ytId +
                          "?autoplay=1"
                        }
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        onClick={() => setPlayingId(v.id)}
                        className="w-full h-full relative"
                      >
                        {ytId && (
                          <img
                            src={
                              "https://img.youtube.com/vi/" +
                              ytId +
                              "/hqdefault.jpg"
                            }
                            alt={v.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                            style={{
                              background:
                                "linear-gradient(135deg,#3B82F6,#60A5FA)",
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              fill="white"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#1a1a2e" }}
                    >
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
