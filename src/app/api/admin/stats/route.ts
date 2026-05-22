import { NextRequest, NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

function verifyToken(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

export async function GET(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await initDB();

    const [totalRes, todayRes, cityRes, businessRes, recentRes, entriesByDayRes, todayEntriesRes] =
      await Promise.all([
        pool.query(`SELECT COUNT(*) as total FROM visitors WHERE registration_complete=TRUE`),
        pool.query(`SELECT COUNT(*) as today FROM visitors WHERE DATE(created_at)=CURRENT_DATE`),
        pool.query(`SELECT city, COUNT(*) as count FROM visitors WHERE city IS NOT NULL AND city != '' GROUP BY city ORDER BY count DESC LIMIT 5`),
        pool.query(`SELECT business_type, COUNT(*) as count FROM visitors WHERE business_type IS NOT NULL GROUP BY business_type ORDER BY count DESC`),
        pool.query(`SELECT * FROM visitors ORDER BY created_at DESC LIMIT 5`),
        // Day-wise gate entries for each event day
        pool.query(`
          SELECT DATE(entered_at AT TIME ZONE 'Asia/Kolkata') as day, COUNT(*) as count
          FROM visitor_entries
          WHERE entered_at >= '2026-07-04' AND entered_at < '2026-07-08'
          GROUP BY day ORDER BY day
        `),
        // Today's gate entries
        pool.query(`SELECT COUNT(*) as count FROM visitor_entries WHERE DATE(entered_at AT TIME ZONE 'Asia/Kolkata')=CURRENT_DATE`),
      ]);

    // Build day-wise map: { "2026-07-04": 120, "2026-07-05": 95, ... }
    const EVENT_DAYS = ["2026-07-04", "2026-07-05", "2026-07-06", "2026-07-07"];
    const dayMap: Record<string, number> = {};
    for (const day of EVENT_DAYS) dayMap[day] = 0;
    for (const row of entriesByDayRes.rows) {
      const d = new Date(row.day).toISOString().slice(0, 10);
      if (d in dayMap) dayMap[d] = parseInt(row.count);
    }

    return NextResponse.json({
      total: parseInt(totalRes.rows[0].total),
      today: parseInt(todayRes.rows[0].today),
      topCities: cityRes.rows,
      businessTypes: businessRes.rows,
      recentVisitors: recentRes.rows,
      entriesByDay: dayMap,
      todayEntries: parseInt(todayEntriesRes.rows[0].count),
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
