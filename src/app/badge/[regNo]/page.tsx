import { pool } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function BadgePage({
  params,
}: {
  params: Promise<{ regNo: string }>;
}) {
  const { regNo } = await params;

  const result = await pool.query(
    `SELECT first_name, last_name, company, city, state, qr_code, registration_no
     FROM visitors WHERE registration_no=$1 AND registration_complete=TRUE`,
    [regNo],
  );

  if (!result.rows[0]) notFound();

  const v = result.rows[0];
  const name = `${v.first_name || ""} ${v.last_name || ""}`.trim();
  const location = [v.city, v.state].filter(Boolean).join(", ");

  return (
    <div className="min-h-screen bg-[#5B9BD5] flex flex-col items-center px-4 py-8 pb-14">

      {/* Page header */}
      <div className="text-center mb-5">
        <p className="text-white text-xl font-bold">
          🎉 Thank You for Registering, {v.first_name || "Visitor"}!
        </p>
        <p className="text-white/80 text-sm mt-1">Your badge is attached below.</p>
      </div>

      {/* ── BADGE CARD ── */}
      <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl">

        {/* TOP — Event Banner */}
        <div
          className="flex flex-col items-center text-center px-5 py-6"
          style={{ background: "linear-gradient(160deg,#0a0730 0%,#1a1464 60%,#1e3a8a 100%)" }}
        >
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.jpeg"
            alt="Fusion The Era Logo"
            className="rounded-full object-contain mb-3"
            style={{
              width: 110,
              height: 110,
              border: "3px solid rgba(255,255,255,0.25)",
              background: "white",
            }}
          />

          <span
            className="text-white font-black tracking-widest uppercase"
            style={{ fontSize: 18, letterSpacing: "0.18em" }}
          >
            FUSION THE ERA
          </span>

          <span
            className="font-black"
            style={{ color: "#f0b429", fontSize: 36, lineHeight: 1.1 }}
          >
            2026
          </span>

          <div
            className="mt-3 px-4 py-1.5 rounded-full text-white text-xs font-bold"
            style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            4 · 5 · 6 · 7 July 2026
          </div>

          <p className="text-white/60 text-xs mt-2">
            Bharat Mandapam, Pragati Maidan, New Delhi
          </p>
        </div>

        {/* MIDDLE — QR + Visitor Info */}
        <div className="bg-white flex flex-row items-center gap-4 px-5 py-5">
          {v.qr_code ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={v.qr_code}
              alt="QR Code"
              className="rounded-lg flex-shrink-0"
              style={{ width: 120, height: 120, border: "2px solid #e5e7eb" }}
            />
          ) : (
            <div className="bg-gray-100 rounded-lg flex-shrink-0" style={{ width: 120, height: 120 }} />
          )}

          <div className="flex flex-col min-w-0">
            <span
              className="font-black uppercase text-[#1a1a2e] break-words"
              style={{ fontSize: 17, lineHeight: 1.2 }}
            >
              {name}
            </span>
            {v.company && (
              <span className="text-gray-600 text-xs mt-1">{v.company}</span>
            )}
            {location && (
              <span className="text-gray-400 text-xs mt-0.5">{location}</span>
            )}
            <span className="text-gray-400 text-[11px] mt-1 font-semibold">
              {v.registration_no}
            </span>
          </div>
        </div>

        {/* BOTTOM — VISITOR bar */}
        <div
          className="flex items-center justify-center py-4"
          style={{ background: "#4a90e2" }}
        >
          <span
            className="text-white font-black tracking-[0.4em] uppercase"
            style={{ fontSize: 26 }}
          >
            VISITOR
          </span>
        </div>
      </div>

      {/* Download Button */}
      <a
        href={`/api/badge/${v.registration_no}`}
        download={`fusionera-badge-${v.registration_no}.png`}
        className="mt-6 px-8 py-3.5 rounded-full text-white font-bold text-sm shadow-lg transition hover:opacity-90 active:scale-95"
        style={{ background: "#22c55e", fontSize: 15 }}
      >
        🎟️ Download QR Pass
      </a>

      {/* Important Instructions */}
      <div
        className="mt-5 w-full max-w-sm rounded-2xl px-5 py-4"
        style={{ background: "#fefce8", border: "1px solid #fde047" }}
      >
        <p className="font-bold text-sm mb-2" style={{ color: "#92400e" }}>
          💡 Important Instructions
        </p>
        <ul className="text-xs space-y-1 pl-4 list-disc" style={{ color: "#78350f" }}>
          <li>Save your badge (screenshot or download)</li>
          <li>Show QR code at entry for quick check-in</li>
          <li>Carry a valid ID proof</li>
        </ul>
        <p className="text-xs font-semibold text-center mt-3" style={{ color: "#92400e" }}>
          See you at the exhibition! 🙏
        </p>
      </div>
    </div>
  );
}
