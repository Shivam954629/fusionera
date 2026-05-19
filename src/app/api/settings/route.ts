import { NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initDB();
    const res = await pool.query(`SELECT key, value FROM site_settings ORDER BY key`);
    const settings: Record<string, string> = {};
    for (const row of res.rows) settings[row.key] = row.value;
    return NextResponse.json({ success: true, settings }, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch {
    return NextResponse.json({ success: false, settings: {} });
  }
}
