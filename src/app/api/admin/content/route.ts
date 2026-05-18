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

async function initTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_content (
      id SERIAL PRIMARY KEY,
      key VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255),
      subtitle VARCHAR(255),
      content TEXT,
      image_url VARCHAR(500),
      is_published BOOLEAN DEFAULT TRUE,
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function GET() {
  try {
    await initTable();
    const result = await pool.query(
      `SELECT * FROM site_content ORDER BY key ASC`,
    );
    return NextResponse.json({ success: true, data: result.rows });
  } catch {
    return NextResponse.json({ error: "Failed to fetch." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await initTable();
    const { key, title, subtitle, content, image_url, is_published } =
      await req.json();
    await pool.query(
      `INSERT INTO site_content (key, title, subtitle, content, image_url, is_published, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,NOW())
       ON CONFLICT (key) DO UPDATE SET
         title=$2, subtitle=$3, content=$4, image_url=$5, is_published=$6, updated_at=NOW()`,
      [
        key,
        title || "",
        subtitle || "",
        content || "",
        image_url || "",
        is_published ?? true,
      ],
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await pool.query(`DELETE FROM site_content WHERE id=$1`, [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
