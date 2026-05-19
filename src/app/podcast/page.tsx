"use client";
import { useCallback, useEffect, useState } from "react";

type Podcast = {
  id: number;
  title: string;
  description: string;
  url: string;
  platform: string;
  is_published: boolean;
};

export default function PodcastPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);

  const loadPodcasts = useCallback(async (signal?: AbortSignal) => {
    setError("");
    try {
      const response = await fetch("/api/admin/podcasts", {
        cache: "no-store",
        signal,
      });
      const res = await response.json();
      if (!response.ok)
        throw new Error(res?.error || "Unable to load podcasts.");
      setPodcasts((res?.data ?? []).filter((p: Podcast) => p?.is_published));
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Unable to load podcasts.");
      setPodcasts([]);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadPodcasts(controller.signal);
    const onVisible = () => {
      if (!document.hidden) loadPodcasts();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      controller.abort();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [loadPodcasts]);

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
          Podcasts
        </h1>

        <p className="text-sm" style={{ color: "#6b7280" }}>
          Listen to insightful conversations and industry discussions from
          Fusion The Era
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
                loadPodcasts();
              }}
              className="mt-4 rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#3B82F6,#60A5FA)" }}
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && podcasts.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-4xl mb-3">🎙️</p>
            <p className="font-medium">No podcasts available yet.</p>
          </div>
        )}

        {!loading && !error && podcasts.length > 0 && (
          <div className="space-y-6">
            {podcasts.map((p: Podcast) => {
              const ytId = getYouTubeId(p.url);
              const isPlaying = playingId === p.id;
              return (
                <div
                  key={p.id}
                  className="rounded-2xl overflow-hidden shadow-sm"
                  style={{ border: "1px solid #dde6ff", background: "#ffffff" }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 flex-shrink-0">
                      {ytId ? (
                        <img
                          src={
                            "https://img.youtube.com/vi/" +
                            ytId +
                            "/hqdefault.jpg"
                          }
                          alt={p.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-48 md:h-full flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg,#3B82F6,#60A5FA)",
                          }}
                        >
                          <span className="text-5xl">🎙️</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full text-white capitalize font-semibold"
                          style={{
                            background:
                              "linear-gradient(135deg,#3B82F6,#60A5FA)",
                          }}
                        >
                          {p.platform}
                        </span>
                        <h3
                          className="font-bold text-lg mt-2"
                          style={{ color: "#1a1a2e" }}
                        >
                          {p.title}
                        </h3>
                        {p.description && (
                          <p
                            className="text-sm mt-1"
                            style={{ color: "#6b7280" }}
                          >
                            {p.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-4">
                        {isPlaying && ytId ? (
                          <div>
                            <div className="aspect-video rounded-xl overflow-hidden mb-2">
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
                            </div>
                            <button
                              onClick={() => setPlayingId(null)}
                              className="text-xs"
                              style={{ color: "#6b7280" }}
                            >
                              Close
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <button
                              onClick={() => setPlayingId(p.id)}
                              className="px-5 py-2 rounded-xl text-white text-sm font-semibold"
                              style={{
                                background:
                                  "linear-gradient(135deg,#3B82F6,#60A5FA)",
                              }}
                            >
                              ▶ Play
                            </button>
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-xl text-sm font-medium"
                              style={{
                                border: "1px solid #dde6ff",
                                color: "#6b7280",
                              }}
                            >
                              Open ↗
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
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
