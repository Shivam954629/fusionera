"use client";

import { useState } from "react";

interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export default function VisitorRegistrationPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      // ✅ Dashboard instant refresh — same tab + alag tab dono ke liye
      window.dispatchEvent(new Event("visitor-registered"));
      localStorage.setItem("last-registration", Date.now().toString());

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #fef3f0 100%)",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #110c41 0%, #1a1560 100%)",
        }}
        className="py-12 px-4 text-center"
      >
        <p className="text-xs tracking-widest text-blue-300 uppercase mb-2">
          Free Entry — Pre-registration Required
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Visitor Registration
        </h1>
        <p className="text-blue-200 text-sm max-w-xl mx-auto">
          Entry for trade &amp; business professionals only. Register now to get
          your free entry pass.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          {[
            { icon: "📅", label: "July 4–6, 2026" },
            { icon: "📍", label: "New Delhi, India" },
            { icon: "🎟️", label: "Free Entry" },
          ].map(({ icon, label }) => (
            <div key={label} className="text-center">
              <div className="text-xl">{icon}</div>
              <div className="text-xs text-blue-200 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div
            className="px-8 py-5 border-b"
            style={{ background: "linear-gradient(90deg, #f8f9ff, #fff7f0)" }}
          >
            <h2 className="text-lg font-bold text-gray-800">
              Register as Visitor
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Fields marked * are required.
            </p>
          </div>

          {status === "success" ? (
            <div className="px-8 py-16 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #00c9a7, #00b4d8)",
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Registration Successful!
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Thank you, <strong>{form.fullName}</strong>! Your entry pass
                details will be shared on your phone/email.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setForm({ fullName: "", phoneNumber: "", email: "" });
                }}
                className="px-6 py-2.5 rounded-lg text-white text-sm font-medium"
                style={{
                  background: "linear-gradient(135deg, #110c41, #1a1560)",
                }}
              >
                Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl text-white font-semibold text-sm tracking-wider uppercase transition-all duration-200 hover:opacity-90 hover:shadow-lg disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, #00b4d8, #0096c7)",
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
                    Registering...
                  </span>
                ) : (
                  "Register Now →"
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                By registering you agree to be contacted by the FUSION THE ERA
                team. Your data is safe.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
