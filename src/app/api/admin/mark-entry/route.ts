import { NextRequest, NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

function verifyToken(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await initDB();
    const { regNo } = await req.json();
    if (!regNo)
      return NextResponse.json({ error: "regNo required" }, { status: 400 });

    const visitorRes = await pool.query(
      `SELECT id FROM visitors WHERE registration_no=$1 AND registration_complete=TRUE AND is_blocked=FALSE`,
      [regNo],
    );
    if (visitorRes.rows.length === 0)
      return NextResponse.json({ error: "Visitor not found or not eligible" }, { status: 404 });

    const visitorId = visitorRes.rows[0].id;

    await pool.query(
      `INSERT INTO visitor_entries (visitor_id, reg_no) VALUES ($1, $2)`,
      [visitorId, regNo],
    );

    // Total entries for this visitor today
    const todayCount = await pool.query(
      `SELECT COUNT(*) as count FROM visitor_entries WHERE visitor_id=$1 AND DATE(entered_at)=CURRENT_DATE`,
      [visitorId],
    );

    return NextResponse.json({
      success: true,
      entryCount: parseInt(todayCount.rows[0].count),
    });
  } catch (err) {
    console.error("Mark entry error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
