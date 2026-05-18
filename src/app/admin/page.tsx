"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #110c41 0%, #1a1560 60%, #0d0a3e 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #E8274B, transparent)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #F4822A, transparent)",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="/images/logo.jpeg"
              alt="Fusionera Logo"
              className="h-14 w-auto object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-6">
            Sign in to continue
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            autoComplete="off"
          >
            <div>
              <label className="block text-xs font-medium text-blue-200 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                type="text"
                autoComplete="off"
                value={creds.username}
                onChange={(e) =>
                  setCreds((p) => ({ ...p, username: e.target.value }))
                }
                placeholder="Enter username"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
                style={{ "--tw-ring-color": "#E8274B" } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-blue-200 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                autoComplete="off"
                value={creds.password}
                onChange={(e) =>
                  setCreds((p) => ({ ...p, password: e.target.value }))
                }
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
              />
            </div>

            {status === "error" && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg px-4 py-3 text-sm text-red-200">
                {errMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-50 mt-2"
              style={{
                background: "linear-gradient(135deg, #E8274B, #F4822A)",
              }}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
