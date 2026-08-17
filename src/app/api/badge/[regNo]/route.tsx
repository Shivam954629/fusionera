import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { pool } from "@/lib/db";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ regNo: string }> },
) {
  try {
    const { regNo } = await params;

    const result = await pool.query(
      `SELECT first_name, last_name, company, city, state, qr_code, registration_no
       FROM visitors WHERE registration_no=$1 AND registration_complete=TRUE`,
      [regNo],
    );

    if (!result.rows[0]) {
      return new Response("Badge not found", { status: 404 });
    }

    const v = result.rows[0];
    const name = `${v.first_name || ""} ${v.last_name || ""}`.trim();
    const location = [v.city, v.state].filter(Boolean).join(", ");

    const logoBuffer = await readFile(
      path.join(process.cwd(), "public/images/logo.jpeg"),
    );
    const logoDataUrl = `data:image/jpeg;base64,${logoBuffer.toString("base64")}`;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "600px",
            height: "760px",
            fontFamily: "sans-serif",
            backgroundColor: "white",
          }}
        >
          {/* TOP — Event Banner */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(160deg, #0a0730 0%, #1a1464 60%, #1e3a8a 100%)",
              height: "340px",
              padding: "20px",
            }}
          >
            <img
              src={logoDataUrl}
              style={{
                width: "130px",
                height: "130px",
                objectFit: "contain",
                borderRadius: "50%",
                marginBottom: "12px",
                border: "3px solid rgba(255,255,255,0.3)",
                backgroundColor: "white",
              }}
            />
            <span
              style={{
                color: "white",
                fontSize: "28px",
                fontWeight: 900,
                letterSpacing: "3px",
                marginBottom: "4px",
              }}
            >
              FUSION THE ERA
            </span>
            <span
              style={{
                color: "#f0b429",
                fontSize: "22px",
                fontWeight: 700,
                marginBottom: "14px",
              }}
            >
              2027
            </span>
            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "20px",
                padding: "8px 20px",
                marginBottom: "10px",
              }}
            >
              <span
                style={{ color: "white", fontSize: "14px", fontWeight: 700 }}
              >
                19 · 20 · 21 June 2027
              </span>
            </div>
            <span
              style={{
                color: "#a5b4fc",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              Bharat Mandapam, Pragati Maidan, New Delhi
            </span>
          </div>

          {/* MIDDLE — QR + Visitor Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: "28px 24px",
              flex: 1,
            }}
          >
            {v.qr_code ? (
              <img
                src={v.qr_code}
                style={{
                  width: "140px",
                  height: "140px",
                  flexShrink: 0,
                  marginRight: "24px",
                }}
              />
            ) : null}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 900,
                  color: "#1a1a2e",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {name}
              </span>
              {v.company ? (
                <span
                  style={{
                    fontSize: "13px",
                    color: "#374151",
                    marginBottom: "4px",
                  }}
                >
                  {v.company}
                </span>
              ) : null}
              {location ? (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginBottom: "8px",
                  }}
                >
                  {location}
                </span>
              ) : null}
              <span style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "10px" }}>
                {v.registration_no}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#1e3a8a",
                  borderTop: "1px solid #eef0f5",
                  paddingTop: "10px",
                }}
              >
                SCAN AT ENTRY GATE
              </span>
            </div>
          </div>

          {/* BOTTOM — VISITOR bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1e3a8a",
              height: "80px",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "6px",
              }}
            >
              VISITOR
            </span>
          </div>
        </div>
      ),
      { width: 600, height: 760 },
    );
  } catch (err) {
    console.error("Badge generation error:", err);
    return new Response("Badge generation failed", { status: 500 });
  }
}
