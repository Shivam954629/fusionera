import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

async function initNewsletterTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_content (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) DEFAULT '',
      subtitle VARCHAR(500) DEFAULT '',
      content TEXT DEFAULT '',
      is_published BOOLEAN DEFAULT FALSE,
      updated_at TIMESTAMP DEFAULT NOW()
    );
    INSERT INTO newsletter_content (title, subtitle, content, is_published)
    SELECT '', '', '', false
    WHERE NOT EXISTS (SELECT 1 FROM newsletter_content);
  `);
}

export async function GET() {
  try {
    await initNewsletterTable();
    const result = await pool.query(
      `SELECT * FROM newsletter_content ORDER BY id LIMIT 1`,
    );
    return NextResponse.json(
      { success: true, data: result.rows[0] || null },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await initNewsletterTable();
    const { title, subtitle, content, is_published } = await req.json();
    await pool.query(
      `UPDATE newsletter_content SET title=$1, subtitle=$2, content=$3, is_published=$4, updated_at=NOW() WHERE id=(SELECT id FROM newsletter_content ORDER BY id LIMIT 1)`,
      [title || "", subtitle || "", content || "", is_published ?? false],
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save." }, { status: 500 });
  }
}
