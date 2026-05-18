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

  useEffect(() => {
    fetch("/api/admin/podcasts")
      .then((r) => r.json())
      .then((res) => {
        setPodcasts((res.data ?? []).filter((p: Podcast) => p.is_published));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getYouTubeId = (url: string): string | null => {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return m ? m[1] : null;
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--app-bg)" }}>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white"></h1>
          <p className="mt-3 text-sm text-gray-300 max-w-2xl mx-auto">

          </p>
        </div>

        {loading && (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
          </div>
        )}

        {!loading && podcasts.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <p className="text-5xl mb-3"></p>
            <p className="font-medium"></p>
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
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
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
                          style={{ background: "#E8274B" }}
                        >
                          <span className="text-5xl">🎙️</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-between">
                      <div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full text-white capitalize"
                          style={{ background: "#F4822A" }}
                        >
                          {p.platform}
                        </span>
                        <h3 className="text-white font-bold text-lg mt-2">
                          {p.title}
                        </h3>
                        {p.description ? (
                          <p className="text-gray-400 text-sm mt-1">
                            {p.description}
                          </p>
                        ) : null}
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
                              className="text-xs text-gray-400"
                            >
                              Close
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <button
                              onClick={() => setPlayingId(p.id)}
                              className="px-4 py-2 rounded-xl text-white text-sm font-semibold"
                              style={{ background: "#E8274B" }}
                            >
                              Play
                            </button>
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-xl text-gray-300 text-sm border border-white/10"
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
