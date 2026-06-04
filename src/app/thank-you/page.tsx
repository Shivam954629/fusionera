"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

interface VisitorBadge {
  regNo: string;
  qrCode: string;
  firstName: string;
  lastName: string;
  company: string;
  city: string;
  state: string;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "general";
  const [badge, setBadge] = useState<VisitorBadge | null>(null);

  useEffect(() => {
    if (type === "visitor") {
      try {
        const stored = sessionStorage.getItem("visitor_badge");
        if (stored) {
          setBadge(JSON.parse(stored));
          sessionStorage.removeItem("visitor_badge");
        }
      } catch {
        // ignore
      }
    }
  }, [type]);

  const headings: Record<string, string> = {
    visitor: "Registration Successful!",
    enquiry: "Enquiry Submitted!",
    exhibitor: "Request Submitted!",
    general: "Thank You!",
  };

  const subtexts: Record<string, string> = {
    visitor: "Your visitor badge is ready. Save it for quick entry.",
    enquiry: "Our team will get back to you within 24 hours.",
    exhibitor: "Thank you for your interest in exhibiting at Fusion The Era 2026. Our team will contact you shortly.",
    general: "We have received your submission.",
  };

  return (
    <div className="min-h-screen w-full bg-[#5B9BD5] px-4 py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">{headings[type] ?? headings.general}</h1>
          <div className="mt-2 h-1 w-24 rounded-full bg-[#f0b429] mx-auto" />
          <p className="mt-3 text-sm" style={{ color: "#dde6ff" }}>
            {subtexts[type] ?? subtexts.general}
          </p>
        </div>

        {/* Visitor Badge */}
        {type === "visitor" && badge && (
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-6">
            <div
              className="px-6 py-6 text-center"
              style={{ background: "linear-gradient(160deg, #0a0730 0%, #1a1464 60%, #1e3a8a 100%)" }}
            >
              <img
                src="/images/logo.jpeg"
                alt="Fusion The Era"
                className="h-20 mx-auto mb-3 object-contain rounded-xl"
              />
              <p className="text-white font-black text-xl tracking-widest">FUSION THE ERA</p>
              <p className="font-bold text-lg tracking-widest mt-0.5" style={{ color: "#f0b429" }}>2026</p>
              <div
                className="mt-3 mx-auto rounded-full py-1.5 px-4 inline-block"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <p className="text-white font-bold text-sm">4 · 5 · 6 · 7 July 2026</p>
              </div>
              <p className="text-xs mt-2" style={{ color: "#a5b4fc" }}>
                Bharat Mandapam, Pragati Maidan, New Delhi
              </p>
            </div>

            <div className="bg-white px-5 py-5 flex items-center gap-4">
              {badge.qrCode && (
                <div className="flex-shrink-0">
                  <img src={badge.qrCode} alt="Entry QR Code" className="w-28 h-28 md:w-32 md:h-32" />
                </div>
              )}
              <div className="min-w-0">
                <h2 className="font-black text-xl md:text-2xl uppercase leading-tight" style={{ color: "#1a1a2e" }}>
                  {[badge.firstName, badge.lastName].filter(Boolean).join(" ")}
                </h2>
                {badge.company && (
                  <p className="text-sm mt-1" style={{ color: "#374151" }}>{badge.company}</p>
                )}
                {(badge.city || badge.state) && (
                  <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
                    {[badge.city, badge.state].filter(Boolean).join(", ")}
                  </p>
                )}
                <p className="text-xs mt-2 font-mono" style={{ color: "#9ca3af" }}>{badge.regNo}</p>
              </div>
            </div>

            <div className="py-3 text-center" style={{ background: "#5B9BD5" }}>
              <span className="text-white font-black text-2xl tracking-widest">VISITOR</span>
            </div>
          </div>
        )}

        {/* Download button for visitor */}
        {type === "visitor" && badge?.qrCode && (
          <div className="text-center mb-5">
            <a
              href={badge.qrCode}
              download={`fusionera-pass-${badge.regNo}.png`}
              className="inline-block px-6 py-3 rounded-xl text-white text-sm font-bold transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
            >
              Download QR Pass
            </a>
          </div>
        )}

        {/* Generic success card for non-visitor */}
        {type !== "visitor" && (
          <div
            className="rounded-2xl overflow-hidden shadow-xl text-center mb-6"
            style={{ background: "#ffffff", border: "1px solid #dde6ff" }}
          >
            <div className="px-6 py-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg,#00c9a7,#00b4d8)" }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm" style={{ color: "#6b7280" }}>{subtexts[type] ?? subtexts.general}</p>
            </div>
          </div>
        )}

        {/* Instructions for visitor */}
        {type === "visitor" && (
          <div
            className="rounded-2xl p-5 mb-6"
            style={{ background: "#fffbeb", border: "1px solid #f59e0b" }}
          >
            <p className="font-bold text-sm mb-3" style={{ color: "#92400e" }}>Important Instructions</p>
            <ul className="space-y-2">
              {[
                "Save your badge (screenshot or download)",
                "Show QR code at entry for quick check-in",
                "Carry a valid ID proof",
              ].map((item) => (
                <li key={item} className="text-sm" style={{ color: "#78350f" }}>• {item}</li>
              ))}
            </ul>
            <p className="text-center text-sm font-bold mt-4" style={{ color: "#1a1464" }}>
              See you at the exhibition!
            </p>
          </div>
        )}

        {/* Back to home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
            style={{ background: "#1a1464" }}
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#5B9BD5] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-[#cae9ff] border-t-[#00509d] animate-spin" />
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
