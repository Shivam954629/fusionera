"use client";
import { useCallback, useEffect, useState } from "react";

type Video = { id: number; title: string; url: string; is_published: boolean };

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);

  const loadVideos = useCallback(async (signal?: AbortSignal) => {
    setError("");
    try {
      const response = await fetch("/api/admin/videos", { cache: "no-store", signal });
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
    const onVisible = () => { if (!document.hidden) loadVideos(); };
    document.addEventListener("visibilitychange", onVisible);
    const interval = setInterval(() => loadVideos(), 30000);
    return () => { controller.abort(); document.removeEventListener("visibilitychange", onVisible); clearInterval(interval); };
  }, [loadVideos]);

  const getYouTubeId = (url: string) =>
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1] ?? null;

  const isLocalVideo = (url: string) =>
    url.startsWith("/videos/") || url.startsWith("/public/videos/");

  return (
    <section className="w-full py-8 md:py-12 reveal-on-scroll reveal-zoom bg-[#5B9BD5]" data-reveal-delay="50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-6 p-4 text-[#00509d] sm:p-6 md:p-8">
          <div>
            <div className="mt-4 w-fit">
              <h2 className="text-2xl font-bold md:text-3xl text-white">Video Gallery</h2>
              <div className="mt-2 h-1 w-full rounded-full bg-[#f0b429]" />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Watch our latest coverage and highlights from Fusion The Era
            </p>

            {loading && (
              <div className="py-20 text-center">
                <div className="w-9 h-9 border-4 border-[#cae9ff] border-t-[#00509d] rounded-full animate-spin mx-auto" />
              </div>
            )}

            {!loading && error && (
              <div className="py-20 text-center text-gray-600">
                <p>{error}</p>
                <button
                  onClick={() => { setLoading(true); loadVideos(); }}
                  className="mt-4 px-6 py-2.5 text-sm font-semibold text-white rounded"
                  style={{ background: "#00509d" }}
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && videos.length === 0 && (
              <div className="py-20 text-center text-gray-600">
                <p className="text-4xl mb-3">🎬</p>
                <p>No videos available yet.</p>
              </div>
            )}

            {!loading && !error && videos.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {videos.map((v) => {
                  const ytId = getYouTubeId(v.url);
                  const isPlaying = playingId === v.id;
                  return (
                    <div key={v.id} className="overflow-hidden rounded-xl bg-black shadow-sm" style={{ border: "1px solid rgba(0,80,157,0.15)" }}>
                      <div className="relative aspect-video bg-black">
                        {isPlaying && isLocalVideo(v.url) ? (
                          <video
                            className="w-full h-full"
                            style={{ objectFit: "contain" }}
                            controls
                            autoPlay
                            playsInline
                          >
                            <source src={v.url} type="video/mp4" />
                          </video>
                        ) : isPlaying && ytId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <button onClick={() => setPlayingId(v.id)} className="w-full h-full relative">
                            {ytId && (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={v.title} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                                <svg width="22" height="22" fill="#00509d" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                              </div>
                            </div>
                          </button>
                        )}
                      </div>
                      <div className="px-4 py-3">
                        <p className="font-semibold text-sm text-[#00509d]">{v.title}</p>
                        {isPlaying && (
                          <button onClick={() => setPlayingId(null)} className="mt-1 text-xs text-gray-400 hover:text-gray-600">Close</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
