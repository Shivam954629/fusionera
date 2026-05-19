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
    await fetch("/api/visitor-login", {
      method: "DELETE",
      credentials: "include",
    });
    router.push("/visitor-registration");
  };

  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </section>
    );

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg space-y-4">
        {/* Entry Pass Card */}
        <div
          className="rounded-2xl overflow-hidden shadow-xl"
          style={{
            background: "#ffffff",
            border: "1px solid #dde6ff",
          }}
        >
          <div className="px-8 pt-8 pb-4">
            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: "#1a1a2e" }}
            >
              🎟️ Your Entry Pass
            </h1>
            <p className="text-sm" style={{ color: "#6b7280" }}>
              Fusionera 2026 — New Delhi, India
            </p>
          </div>

          <div className="px-8 pb-8 space-y-4">
            {/* Reg No */}
            <div
              className="rounded-xl p-4 text-center"
              style={{ background: "linear-gradient(135deg,#110c41,#1a1560)" }}
            >
              <p className="text-xs text-blue-300 uppercase tracking-widest mb-1">
                Registration Number
              </p>
              <p className="text-3xl font-bold text-white tracking-widest">
                {visitor?.regNo}
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className="rounded-xl p-3"
                style={{
                  background: "#f4f6ff",
                  border: "1px solid #dde6ff",
                }}
              >
                <p
                  className="text-xs mb-0.5"
                  style={{ color: "#6b7280" }}
                >
                  Name
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#1a1a2e" }}
                >
                  {visitor?.fullName}
                </p>
              </div>
              <div
                className="rounded-xl p-3"
                style={{
                  background: "#f4f6ff",
                  border: "1px solid #dde6ff",
                }}
              >
                <p
                  className="text-xs mb-0.5"
                  style={{ color: "#6b7280" }}
                >
                  Phone
                </p>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#1a1a2e" }}
                >
                  {visitor?.phone}
                </p>
              </div>
              {visitor?.email && (
                <div
                  className="rounded-xl p-3 col-span-2"
                  style={{
                    background: "#f4f6ff",
                    border: "1px solid #dde6ff",
                  }}
                >
                  <p
                    className="text-xs mb-0.5"
                    style={{ color: "#6b7280" }}
                  >
                    Email
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#1a1a2e" }}
                  >
                    {visitor.email}
                  </p>
                </div>
              )}
            </div>

            {/* Event info */}
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: "#f4f6ff",
                border: "1px solid #dde6ff",
              }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: "#1a1a2e" }}
              >
                📅 July 4–7, 2026 &nbsp;·&nbsp; 📍 New Delhi, India
                &nbsp;·&nbsp; 🎟️ Free Entry
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-xl text-sm font-medium border transition hover:opacity-80"
              style={{
                color: "#6b7280",
                borderColor: "#dde6ff",
                background: "transparent",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
