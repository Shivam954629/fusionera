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
    CREATE TABLE IF NOT EXISTS podcasts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT DEFAULT '',
      url VARCHAR(500) NOT NULL,
      platform VARCHAR(100) DEFAULT 'youtube',
      is_published BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function GET() {
  try {
    await initTable();
    const result = await pool.query(
      `SELECT * FROM podcasts ORDER BY created_at DESC`,
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
    const { title, description, url, platform, is_published } = await req.json();
    const result = await pool.query(
      `INSERT INTO podcasts (title, description, url, platform, is_published) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, description || "", url, platform || "youtube", is_published ?? true],
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
    const { id, title, description, url, platform, is_published } = await req.json();
    await pool.query(
      `UPDATE podcasts SET title=$1, description=$2, url=$3, platform=$4, is_published=$5 WHERE id=$6`,
      [title, description || "", url, platform || "youtube", is_published ?? true, id],
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
    await pool.query(`DELETE FROM podcasts WHERE id=$1`, [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
