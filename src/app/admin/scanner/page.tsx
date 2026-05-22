"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface VisitorResult {
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  regNo: string;
  is_blocked: boolean;
  registration_complete: boolean;
}

type ScanStatus = "idle" | "scanning" | "found" | "blocked" | "invalid" | "not_found" | "entry_marked";

export default function ScannerPage() {
  const router = useRouter();
  const scannerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [authChecked, setAuthChecked] = useState(false);
  const [visitor, setVisitor] = useState<VisitorResult | null>(null);
  const [manualReg, setManualReg] = useState("");
  const [manualLoading, setManualLoading] = useState(false);
  const [scannerStarted, setScannerStarted] = useState(false);
  const [markingEntry, setMarkingEntry] = useState(false);
  const [todayCount, setTodayCount] = useState<number | null>(null);
  const scannerInstanceRef = useRef<unknown>(null);
  const cooldownRef = useRef(false);

  const lookupVisitor = async (regNo?: string, phone?: string) => {
    try {
      const res = await fetch("/api/admin/verify-visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regNo, phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.visitor) { setStatus("not_found"); setVisitor(null); return; }
      const v: VisitorResult = data.visitor;
      setVisitor(v);
      if (!v.registration_complete) setStatus("invalid");
      else if (v.is_blocked) setStatus("blocked");
      else setStatus("found");
    } catch {
      setStatus("not_found");
    }
  };

  const markEntry = async () => {
    if (!visitor?.regNo) return;
    setMarkingEntry(true);
    try {
      const res = await fetch("/api/admin/mark-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regNo: visitor.regNo }),
      });
      const data = await res.json();
      if (res.ok) {
        setTodayCount(data.entryCount);
        setStatus("entry_marked");
      }
    } catch {}
    finally { setMarkingEntry(false); }
  };

  const handleQRResult = async (decodedText: string) => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 4000);
    try {
      const parsed = JSON.parse(decodedText);
      if (parsed.regNo) await lookupVisitor(parsed.regNo, undefined);
      else if (parsed.phone) await lookupVisitor(undefined, parsed.phone);
      else setStatus("invalid");
    } catch {
      if (decodedText.startsWith("FE")) await lookupVisitor(decodedText, undefined);
      else setStatus("invalid");
    }
  };

  const startScanner = async () => {
    if (scannerStarted) return;
    setScannerStarted(true);
    setStatus("scanning");
    const { Html5Qrcode } = await import("html5-qrcode");
    const scanner = new Html5Qrcode("qr-reader");
    scannerInstanceRef.current = scanner;
    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        handleQRResult,
        () => {}
      );
    } catch {
      setStatus("idle");
      setScannerStarted(false);
      alert("Camera access denied. Please allow camera permission.");
    }
  };

  const stopScanner = async () => {
    if (scannerInstanceRef.current) {
      try { const s = scannerInstanceRef.current as { stop: () => Promise<void> }; await s.stop(); } catch {}
      scannerInstanceRef.current = null;
    }
    setScannerStarted(false);
    setStatus("idle");
    setVisitor(null);
  };

  const resetScan = () => {
    setVisitor(null);
    setTodayCount(null);
    setStatus(scannerStarted ? "scanning" : "idle");
    cooldownRef.current = false;
  };

  const handleManualSearch = async () => {
    if (!manualReg.trim()) return;
    setManualLoading(true);
    setVisitor(null);
    await lookupVisitor(manualReg.trim(), undefined);
    setManualLoading(false);
  };

  useEffect(() => {
    fetch("/api/admin/stats", { credentials: "include" })
      .then((res) => { if (res.status === 401) router.replace("/admin"); else setAuthChecked(true); })
      .catch(() => router.replace("/admin"));
  }, [router]);

  useEffect(() => {
    return () => {
      if (scannerInstanceRef.current) {
        try { const s = scannerInstanceRef.current as { stop: () => Promise<void> }; s.stop(); } catch {}
      }
    };
  }, []);

  const statusConfig: Record<ScanStatus, { bg: string; icon: string; text: string; color: string }> = {
    idle:          { bg: "#f0f4f8", icon: "📷", text: "Camera is off",             color: "#6b7280" },
    scanning:      { bg: "#f0f4f8", icon: "🔍", text: "Scanning QR code...",       color: "#1a1464" },
    found:         { bg: "#f0fdf4", icon: "✅", text: "ENTRY ALLOWED",             color: "#16a34a" },
    entry_marked:  { bg: "#f0fdf4", icon: "🎟️", text: "ENTRY MARKED ✓",           color: "#059669" },
    blocked:       { bg: "#fef2f2", icon: "🚫", text: "ENTRY BLOCKED",             color: "#dc2626" },
    invalid:       { bg: "#fffbeb", icon: "⚠️", text: "REGISTRATION INCOMPLETE",  color: "#d97706" },
    not_found:     { bg: "#fef2f2", icon: "❓", text: "VISITOR NOT FOUND",        color: "#dc2626" },
  };

  const cfg = statusConfig[status];

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0c1148] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1148] flex flex-col items-center px-4 py-6">
      {/* Header */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-bold">Entry Scanner</h1>
          <p className="text-white/50 text-xs mt-0.5">Fusion The Era 2026</p>
        </div>
        <a href="/admin/dashboard" className="text-xs text-white/60 border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/10 transition">
          ← Dashboard
        </a>
      </div>

      {/* Scanner Box */}
      <div className="w-full max-w-md">
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: cfg.bg, transition: "background 0.3s" }}>
          {/* Status Banner */}
          <div className="px-5 py-4 text-center" style={{ background: cfg.color, color: "#fff" }}>
            <p className="text-3xl mb-1">{cfg.icon}</p>
            <p className="font-black text-lg tracking-wide">{cfg.text}</p>
          </div>

          {/* Camera View */}
          <div className="p-4">
            <div id="qr-reader" ref={scannerRef} className="rounded-xl overflow-hidden"
              style={{ display: scannerStarted && !visitor ? "block" : "none" }} />

            {/* Visitor Card — found or blocked or invalid */}
            {visitor && (status === "found" || status === "blocked" || status === "invalid" || status === "entry_marked") && (
              <div className="space-y-3">
                <div className="rounded-xl p-4 border-2" style={{
                  borderColor: status === "found" || status === "entry_marked" ? "#16a34a" : status === "blocked" ? "#dc2626" : "#d97706",
                  background: "#fff",
                }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-black flex-shrink-0" style={{ background: "#1a1464" }}>
                      {visitor.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-base leading-tight">{visitor.name || "—"}</p>
                      <p className="text-gray-500 text-sm">{visitor.company || "—"}</p>
                      <p className="text-gray-400 text-xs">{visitor.city || ""}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                      <p className="text-gray-400 text-xs">Reg No</p>
                      <p className="font-bold text-gray-900">{visitor.regNo}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                      <p className="text-gray-400 text-xs">Phone</p>
                      <p className="font-bold text-gray-900">{visitor.phone}</p>
                    </div>
                    {visitor.email && (
                      <div className="col-span-2 bg-gray-50 rounded-lg px-3 py-2">
                        <p className="text-gray-400 text-xs">Email</p>
                        <p className="font-medium text-gray-700 text-xs">{visitor.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mark Entry button — only for valid, unblocked visitors */}
                {status === "found" && (
                  <button
                    onClick={markEntry}
                    disabled={markingEntry}
                    className="w-full py-3.5 rounded-xl text-white font-black text-base transition hover:opacity-90 disabled:opacity-60"
                    style={{ background: "#059669" }}
                  >
                    {markingEntry ? "Marking..." : "🎟️ Mark Entry"}
                  </button>
                )}

                {/* Entry marked confirmation */}
                {status === "entry_marked" && (
                  <div className="rounded-xl p-3 text-center" style={{ background: "#dcfce7", border: "1px solid #16a34a" }}>
                    <p className="text-green-800 font-bold text-sm">Entry recorded successfully</p>
                    {todayCount !== null && (
                      <p className="text-green-600 text-xs mt-0.5">
                        This visitor has entered {todayCount} time{todayCount !== 1 ? "s" : ""} today
                      </p>
                    )}
                  </div>
                )}

                <button onClick={resetScan} className="w-full py-3 rounded-xl text-white font-bold text-sm transition" style={{ background: "#1a1464" }}>
                  Next Scan →
                </button>
              </div>
            )}

            {/* Not Found */}
            {status === "not_found" && (
              <div className="py-6 text-center">
                <p className="text-gray-500 text-sm mb-4">This visitor was not found in the database.</p>
                <button onClick={resetScan} className="py-2.5 px-6 rounded-xl text-white font-bold text-sm" style={{ background: "#1a1464" }}>
                  Try Again
                </button>
              </div>
            )}

            {/* Start Scanner */}
            {!scannerStarted && status === "idle" && (
              <div className="py-8 text-center">
                <p className="text-gray-500 text-sm mb-5">Scan visitor QR code using camera</p>
                <button onClick={startScanner} className="w-full py-3.5 rounded-xl text-white font-bold text-base transition hover:opacity-90" style={{ background: "#e84030" }}>
                  📷 Start Camera
                </button>
              </div>
            )}
          </div>

          {/* Stop Scanner */}
          {scannerStarted && (
            <div className="px-4 pb-4">
              <button onClick={stopScanner} className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition">
                Stop Camera
              </button>
            </div>
          )}
        </div>

        {/* Manual Search */}
        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wider">Manual Search by Registration No.</p>
          <div className="flex gap-2">
            <input
              value={manualReg}
              onChange={(e) => setManualReg(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
              placeholder="FE2026XXXXX"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={handleManualSearch}
              disabled={manualLoading || !manualReg.trim()}
              className="px-4 py-2.5 rounded-xl text-white font-bold text-sm disabled:opacity-50 transition"
              style={{ background: "#e84030" }}
            >
              {manualLoading ? "..." : "Search"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
