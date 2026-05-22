"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSiteSettings } from "@/lib/useSiteSettings";

interface VisitorInfo {
  id: number;
  fullName: string;
  regNo: string;
  email: string;
  phone: string;
}

export default function VisitorDashboardPage() {
  const router = useRouter();
  const siteSettings = useSiteSettings();
  const [visitor, setVisitor] = useState<VisitorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadVisitor = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/visitor-me", {
          credentials: "include",
          signal: controller.signal,
        });

        if (res.status === 401) {
          router.replace("/visitor-registration");
          return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Unable to load visitor pass.");

        setVisitor(data?.visitor ?? null);
        if (!data?.visitor) setError("Visitor details were not found.");
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unable to load visitor pass.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadVisitor();

    return () => controller.abort();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/visitor-login", { method: "DELETE", credentials: "include" });
    router.replace("/visitor-registration");
  };

  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#5B9BD5]">
        <div className="w-10 h-10 border-4 rounded-full animate-spin border-[#cae9ff] border-t-[#00509d]" />
      </section>
    );

  if (error || !visitor)
    return (
      <section className="min-h-screen flex items-center justify-center px-4 bg-[#5B9BD5]">
        <div
          className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm"
          style={{ border: "1px solid rgba(0,80,157,0.15)" }}
        >
          <h1 className="text-xl font-bold text-[#00509d]">
            Unable to load your pass
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {error || "Please sign in again to continue."}
          </p>
          <button
            onClick={() => router.replace("/visitor-registration")}
            className="mt-5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "#00509d" }}
          >
            Go to registration
          </button>
        </div>
      </section>
    );

  return (
    <div className="min-h-screen bg-[#5B9BD5]">
      {/* HERO BANNER */}
      <section className="relative isolate w-full overflow-hidden py-14 md:py-20">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(120deg,#002f6c 0%,#00509d 100%)" }}
        />
        <div className="absolute inset-0 -z-10 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3 text-white/70">
            Fusion The Era 2026
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Your Entry Pass</h1>
          <p className="mt-3 text-white/70 text-sm">
            {siteSettings.event_venue} · {siteSettings.event_date}
          </p>
          <div className="mt-5 flex justify-center">
            <span className="h-1 w-20 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* PASS CARD */}
      <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6">
        <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: "1px solid rgba(0,80,157,0.2)" }}>
          {/* Top strip */}
          <div className="h-2" style={{ background: "#00509d" }} />

          <div className="bg-white px-6 pt-6 pb-8 space-y-4">
            {/* Reg No */}
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "linear-gradient(135deg,#002f6c,#00509d)" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-widest mb-1 text-white/70">
                Registration Number
              </p>
              <p className="text-3xl font-black text-white tracking-widest">
                {visitor?.regNo}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3" style={{ background: "#e8f4ff", border: "1px solid rgba(0,80,157,0.12)" }}>
                <p className="text-xs mb-0.5 text-gray-500">Name</p>
                <p className="text-sm font-semibold text-[#00509d]">{visitor?.fullName}</p>
              </div>
              <div className="rounded-xl p-3" style={{ background: "#e8f4ff", border: "1px solid rgba(0,80,157,0.12)" }}>
                <p className="text-xs mb-0.5 text-gray-500">Phone</p>
                <p className="text-sm font-semibold text-[#00509d]">{visitor?.phone}</p>
              </div>
              {visitor?.email && (
                <div className="rounded-xl p-3 col-span-2" style={{ background: "#e8f4ff", border: "1px solid rgba(0,80,157,0.12)" }}>
                  <p className="text-xs mb-0.5 text-gray-500">Email</p>
                  <p className="text-sm font-semibold text-[#00509d]">{visitor.email}</p>
                </div>
              )}
            </div>

            {/* Event Info */}
            <div className="rounded-xl p-4 text-center" style={{ background: "#00509d" }}>
              <p className="text-sm font-semibold text-white">
                📅 {siteSettings.event_date} &nbsp;·&nbsp; 📍 {siteSettings.event_venue} &nbsp;·&nbsp; 🎟️ Free Entry
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl text-sm font-medium transition hover:opacity-80"
              style={{ color: "#00509d", border: "1px solid rgba(0,80,157,0.2)", background: "transparent" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
