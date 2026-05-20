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
    CREATE TABLE IF NOT EXISTS exhibitor_brands (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logo_url VARCHAR(500) DEFAULT '',
      is_published BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function GET() {
  try {
    await initTable();
    const result = await pool.query(
      `SELECT * FROM exhibitor_brands ORDER BY sort_order ASC, created_at ASC`,
    );
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
    const { name, logo_url, is_published, sort_order } = await req.json();
    if (!name?.trim())
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    const result = await pool.query(
      `INSERT INTO exhibitor_brands (name, logo_url, is_published, sort_order) VALUES ($1,$2,$3,$4) RETURNING *`,
      [name.trim(), logo_url || "", is_published ?? true, sort_order ?? 0],
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
    const { id, name, logo_url, is_published, sort_order } = await req.json();
    await pool.query(
      `UPDATE exhibitor_brands SET name=$1, logo_url=$2, is_published=$3, sort_order=$4 WHERE id=$5`,
      [name?.trim() || "", logo_url || "", is_published ?? true, sort_order ?? 0, id],
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
    await pool.query(`DELETE FROM exhibitor_brands WHERE id=$1`, [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
