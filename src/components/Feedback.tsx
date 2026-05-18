"use client";
import { useState } from "react";

type FeedbackForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
  rating: number;
};

export default function Feedback() {
  const [form, setForm] = useState<FeedbackForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
    rating: 5,
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "", rating: 5 });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:py-10 lg:px-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl">
        <div className="mb-6 text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ background: "#2ECC71" }}
          >
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Share Your Feedback</h2>
          <p className="mt-2 text-sm text-gray-300">
            We value your opinion — help us improve!
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-10">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#2ECC71" }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Thank You!</h3>
            <p className="text-gray-300 text-sm">
              Your feedback has been submitted successfully.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{ background: "#E8274B" }}
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, rating: star }))}
                    className="text-2xl transition"
                    style={{
                      color:
                        star <= form.rating
                          ? "#F9C11A"
                          : "rgba(255,255,255,0.3)",
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Message *
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none resize-none"
                placeholder="Share your experience..."
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition"
              style={{ background: "#E8274B" }}
            >
              {status === "loading" ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
