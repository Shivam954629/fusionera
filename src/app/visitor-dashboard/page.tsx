"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface VisitorInfo {
  id: number;
  fullName: string;
  regNo: string;
  email: string;
  phone: string;
}

export default function VisitorDashboardPage() {
  const router = useRouter();
  const [visitor, setVisitor] = useState<VisitorInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/visitor-me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          router.push("/visitor-registration");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setVisitor(data.visitor);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/visitor-login", { method: "DELETE", credentials: "include" });
    router.push("/visitor-registration");
  };

  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-100 border-t-[#E8274B] rounded-full animate-spin" />
      </section>
    );

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
          style={{ background: "rgba(232,39,75,0.2)" }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(0,200,212,0.15)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <p
            className="text-xs font-extrabold uppercase tracking-[0.3em] mb-3"
            style={{ color: "#8cecff" }}
          >
            Fusion The Era 2026
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Your Entry Pass</h1>
          <p className="mt-3 text-white/60 text-sm">
            Bharat Mandapam, Pragati Maidan, New Delhi · July 4–7, 2026
          </p>
          <div className="mt-5 flex justify-center">
            <span
              className="h-1 w-20 rounded-full"
              style={{ background: "linear-gradient(90deg,#E8274B,#F4822A)" }}
            />
          </div>
        </div>
      </section>

      {/* PASS CARD */}
      <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6">
        <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: "1px solid #dde6ff" }}>
          {/* Colorful top strip */}
          <div
            className="h-2"
            style={{ background: "linear-gradient(90deg,#E8274B,#F4822A,#FFAA00,#00C8D4,#7B2FBE,#E91E8C)" }}
          />

          <div className="bg-white px-6 pt-6 pb-8 space-y-4">
            {/* Reg No */}
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "linear-gradient(135deg,#110c41,#1a1560)" }}
            >
              <p
                className="text-xs font-extrabold uppercase tracking-widest mb-1"
                style={{ color: "#8cecff" }}
              >
                Registration Number
              </p>
              <p className="text-3xl font-black text-white tracking-widest">
                {visitor?.regNo}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-xl p-3"
                style={{ background: "#f4f6ff", border: "1px solid #dde6ff" }}
              >
                <p className="text-xs mb-0.5" style={{ color: "#6b7280" }}>Name</p>
                <p className="text-sm font-semibold" style={{ color: "#1a1a2e" }}>
                  {visitor?.fullName}
                </p>
              </div>
              <div
                className="rounded-xl p-3"
                style={{ background: "#f4f6ff", border: "1px solid #dde6ff" }}
              >
                <p className="text-xs mb-0.5" style={{ color: "#6b7280" }}>Phone</p>
                <p className="text-sm font-semibold" style={{ color: "#1a1a2e" }}>
                  {visitor?.phone}
                </p>
              </div>
              {visitor?.email && (
                <div
                  className="rounded-xl p-3 col-span-2"
                  style={{ background: "#f4f6ff", border: "1px solid #dde6ff" }}
                >
                  <p className="text-xs mb-0.5" style={{ color: "#6b7280" }}>Email</p>
                  <p className="text-sm font-semibold" style={{ color: "#1a1a2e" }}>
                    {visitor.email}
                  </p>
                </div>
              )}
            </div>

            {/* Event Info */}
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "linear-gradient(135deg,#E8274B,#F4822A)" }}
            >
              <p className="text-sm font-semibold text-white">
                📅 July 4–7, 2026 &nbsp;·&nbsp; 📍 New Delhi &nbsp;·&nbsp; 🎟️ Free Entry
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl text-sm font-medium transition hover:opacity-80"
              style={{ color: "#6b7280", border: "1px solid #dde6ff", background: "transparent" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
