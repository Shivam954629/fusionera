"use client";
import { useCallback, useEffect, useState } from "react";

type Podcast = { id: number; title: string; description: string; url: string; platform: string; is_published: boolean };

export default function PodcastPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playingId, setPlayingId] = useState<number | null>(null);

  const loadPodcasts = useCallback(async (signal?: AbortSignal) => {
    setError("");
    try {
      const response = await fetch("/api/admin/podcasts", { cache: "no-store", signal });
      const res = await response.json();
      if (!response.ok) throw new Error(res?.error || "Unable to load podcasts.");
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
    const onVisible = () => { if (!document.hidden) loadPodcasts(); };
    document.addEventListener("visibilitychange", onVisible);
    const interval = setInterval(() => loadPodcasts(), 30000);
    return () => { controller.abort(); document.removeEventListener("visibilitychange", onVisible); clearInterval(interval); };
  }, [loadPodcasts]);

  const getYouTubeId = (url: string) =>
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1] ?? null;

  return (
    <section
      className="mx-auto w-full max-w-7xl my-8 md:my-12 px-6 py-10 sm:px-8 sm:py-12 md:py-14 md:px-10 rounded-2xl overflow-hidden reveal-on-scroll reveal-zoom"
      style={{ background: "#fef9c3" }}
      data-reveal-delay="50"
    >
      <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: "#0c1148" }}>
        Podcasts
      </h2>
      <p className="mt-2 text-sm" style={{ color: "#374151" }}>
        Listen to insightful conversations from Fusion The Era
      </p>

      {loading && (
        <div className="py-20 text-center">
          <div className="w-9 h-9 border-4 border-[#fef9c3] border-t-[#0c1148] rounded-full animate-spin mx-auto" />
        </div>
      )}

      {!loading && error && (
        <div className="py-20 text-center" style={{ color: "#374151" }}>
          <p>{error}</p>
          <button onClick={() => { setLoading(true); loadPodcasts(); }} className="mt-4 px-6 py-2.5 text-sm font-semibold text-white rounded" style={{ background: "#0c1148" }}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && podcasts.length === 0 && (
        <div className="py-20 text-center" style={{ color: "#374151" }}>
          <p className="text-4xl mb-3">🎙️</p>
          <p>No podcasts available yet.</p>
        </div>
      )}

      {!loading && !error && podcasts.length > 0 && (
        <div className="mt-6 space-y-5">
          {podcasts.map((p) => {
            const ytId = getYouTubeId(p.url);
            const isPlaying = playingId === p.id;
            return (
              <div key={p.id} className="overflow-hidden rounded-xl bg-white shadow-sm" style={{ border: "1px solid rgba(12,17,72,0.1)" }}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-56 flex-shrink-0" style={{ background: "#f0f4f8" }}>
                    {ytId ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={p.title} className="w-full h-48 md:h-full object-cover" />
                    ) : (
                      <div className="w-full h-48 md:h-full flex items-center justify-center" style={{ background: "#f0f4f8" }}>
                        <span className="text-5xl">🎙️</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded text-white font-bold uppercase tracking-wider" style={{ background: "#0c1148" }}>
                        {p.platform}
                      </span>
                      <h3 className="font-bold text-base mt-2" style={{ color: "#0c1148" }}>{p.title}</h3>
                      {p.description && <p className="text-sm mt-1 text-gray-500">{p.description}</p>}
                    </div>
                    <div className="mt-4">
                      {isPlaying && ytId ? (
                        <div>
                          <div className="aspect-video rounded overflow-hidden mb-2">
                            <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1`} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                          </div>
                          <button onClick={() => setPlayingId(null)} className="text-xs text-gray-400 hover:text-gray-600">Close</button>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <button onClick={() => setPlayingId(p.id)} className="px-5 py-2 rounded text-white text-sm font-semibold" style={{ background: "#0c1148" }}>▶ Play</button>
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded text-sm font-medium" style={{ color: "#0c1148", border: "1px solid rgba(12,17,72,0.2)" }}>Open ↗</a>
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
    </section>
  );
}
