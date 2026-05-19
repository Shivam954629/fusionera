"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Video = {
  id: number;
  title: string;
  url: string;
  is_published: boolean;
};

export default function VideosSection() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/admin/videos", { cache: "no-store", signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Unable to load videos.");
        return r.json();
      })
      .then((res) => {
        const published = (res?.data ?? []).filter((v: Video) => v?.is_published);
        setVideos(published.slice(0, 3));
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        setVideos([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const getYouTubeId = (url: string): string | null => {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return m ? m[1] : null;
  };

  if (loading || videos.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:py-10 lg:px-10">
      <div className="rounded-2xl border border-[#dde6ff] bg-[#eef2ff] p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Videos</h2>
          <Link href="/videos" className="text-sm font-medium" style={{ color: "#3B82F6" }}>
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((v: Video) => {
            const ytId = getYouTubeId(v.url);
            const isPlaying = playingId === v.id;
            return (
              <div key={v.id} className="rounded-xl overflow-hidden border border-gray-200 bg-white">
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
                      {ytId ? (
                        <img
                          src={"https://img.youtube.com/vi/" + ytId + "/hqdefault.jpg"}
                          alt={v.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/10 flex items-center justify-center">
                          <span className="text-4xl">🎬</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#3B82F6">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-gray-900 text-sm font-semibold">{v.title}</p>
                  {isPlaying && (
                    <button onClick={() => setPlayingId(null)} className="mt-1 text-xs text-gray-400">Close</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
