"use client";
import { useEffect, useState } from "react";

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
  const [playingId, setPlayingId] = useState<number | null>(null);

  const loadPodcasts = () => {
    fetch("/api/admin/podcasts", { cache: "no-store" })
      .then((r) => r.json())
      .then((res) => {
        setPodcasts((res.data ?? []).filter((p: Podcast) => p.is_published));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadPodcasts();
    const onVisible = () => { if (!document.hidden) loadPodcasts(); };
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
          style={{ background: "rgba(123,47,190,0.2)" }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(233,30,140,0.18)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p
            className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3"
            style={{ color: "#C084FC" }}
          >
            Fusion The Era Media
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Podcasts</h1>
          <p className="mt-3 text-white/60 text-sm max-w-lg mx-auto">
            Listen to insightful conversations and industry discussions from Fusion The Era
          </p>
          <div className="mt-5 flex justify-center">
            <span
              className="h-1 w-20 rounded-full"
              style={{ background: "linear-gradient(90deg,#7B2FBE,#E91E8C)" }}
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

        {!loading && podcasts.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-4xl mb-3">🎙️</p>
            <p className="font-medium">No podcasts available yet.</p>
          </div>
        )}

        {!loading && podcasts.length > 0 && (
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
                          src={"https://img.youtube.com/vi/" + ytId + "/hqdefault.jpg"}
                          alt={p.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-48 md:h-full flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg,#7B2FBE,#E91E8C)" }}
                        >
                          <span className="text-5xl">🎙️</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full text-white capitalize font-semibold"
                          style={{ background: "linear-gradient(135deg,#7B2FBE,#E91E8C)" }}
                        >
                          {p.platform}
                        </span>
                        <h3 className="font-bold text-lg mt-2" style={{ color: "#1a1a2e" }}>
                          {p.title}
                        </h3>
                        {p.description && (
                          <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                            {p.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-4">
                        {isPlaying && ytId ? (
                          <div>
                            <div className="aspect-video rounded-xl overflow-hidden mb-2">
                              <iframe
                                src={"https://www.youtube.com/embed/" + ytId + "?autoplay=1"}
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
                              style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}
                            >
                              ▶ Play
                            </button>
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-xl text-sm font-medium"
                              style={{ border: "1px solid #dde6ff", color: "#6b7280" }}
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
