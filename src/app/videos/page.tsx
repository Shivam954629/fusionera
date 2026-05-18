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

  useEffect(() => {
    fetch("/api/admin/videos")
      .then((r) => r.json())
      .then((res) => {
        setVideos((res.data ?? []).filter((v: Video) => v.is_published));
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
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white"></h1>
          <p className="mt-3 text-sm text-gray-300 max-w-2xl mx-auto">

          </p>
        </div>

        {loading && (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
          </div>
        )}

        {!loading && videos.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <p className="text-5xl mb-3"></p>
            <p className="font-medium"></p>
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
                  className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
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
                          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                            <svg
                              width="24"
                              height="24"
                              fill="#E8274B"
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
                    <p className="text-white font-semibold text-sm">
                      {v.title}
                    </p>
                    {isPlaying && (
                      <button
                        onClick={() => setPlayingId(null)}
                        className="mt-1 text-xs text-gray-400"
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
