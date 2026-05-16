import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

function verifyToken(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  if (!verifyToken(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [totalRes, todayRes, cityRes, businessRes, recentRes] =
      await Promise.all([
        pool.query(`SELECT COUNT(*) as total FROM visitors`),
        pool.query(
          `SELECT COUNT(*) as today FROM visitors WHERE DATE(created_at) = CURRENT_DATE`,
        ),
        pool.query(
          `SELECT city, COUNT(*) as count FROM visitors WHERE city IS NOT NULL AND city != '' GROUP BY city ORDER BY count DESC LIMIT 5`,
        ),
        pool.query(
          `SELECT business_type, COUNT(*) as count FROM visitors WHERE business_type IS NOT NULL GROUP BY business_type ORDER BY count DESC`,
        ),
        pool.query(`SELECT * FROM visitors ORDER BY created_at DESC LIMIT 5`),
      ]);

    return NextResponse.json({
      total: parseInt(totalRes.rows[0].total),
      today: parseInt(todayRes.rows[0].today),
      topCities: cityRes.rows,
      businessTypes: businessRes.rows,
      recentVisitors: recentRes.rows,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
