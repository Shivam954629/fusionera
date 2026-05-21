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
    CREATE TABLE IF NOT EXISTS site_comments (
      id SERIAL PRIMARY KEY,
      type VARCHAR(20) NOT NULL DEFAULT 'visitor',
      name VARCHAR(255) NOT NULL,
      designation VARCHAR(255),
      text TEXT NOT NULL,
      photo_url VARCHAR(500) DEFAULT '',
      is_published BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  await pool.query(`ALTER TABLE site_comments ADD COLUMN IF NOT EXISTS photo_url VARCHAR(500) DEFAULT ''`);
}

export async function GET(req: NextRequest) {
  try {
    await initTable();
    const type = req.nextUrl.searchParams.get("type");
    const query = type
      ? `SELECT * FROM site_comments WHERE type=$1 ORDER BY sort_order ASC, created_at DESC`
      : `SELECT * FROM site_comments ORDER BY sort_order ASC, created_at DESC`;
    const result = type
      ? await pool.query(query, [type])
      : await pool.query(query);
    return NextResponse.json(
      { success: true, data: result.rows },
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
    await initTable();
    const { type, name, designation, text, photo_url, is_published, sort_order } = await req.json();
    const result = await pool.query(
      `INSERT INTO site_comments (type, name, designation, text, photo_url, is_published, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [type || "visitor", name, designation || "", text, photo_url || "", is_published ?? true, sort_order ?? 0],
    );
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch {
    return NextResponse.json({ error: "Failed to add." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, type, name, designation, text, photo_url, is_published, sort_order } = await req.json();
    await pool.query(
      `UPDATE site_comments SET type=$1, name=$2, designation=$3, text=$4, photo_url=$5, is_published=$6, sort_order=$7 WHERE id=$8`,
      [type || "visitor", name, designation || "", text, photo_url || "", is_published ?? true, sort_order ?? 0, id],
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await pool.query(`DELETE FROM site_comments WHERE id=$1`, [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
