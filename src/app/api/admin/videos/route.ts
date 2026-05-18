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
    CREATE TABLE IF NOT EXISTS videos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      url VARCHAR(500) NOT NULL,
      thumbnail VARCHAR(500),
      category VARCHAR(100) DEFAULT 'general',
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
      `SELECT * FROM videos ORDER BY sort_order ASC, created_at DESC`,
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
    const { title, url, thumbnail, category, is_published, sort_order } =
      await req.json();
    const result = await pool.query(
      `INSERT INTO videos (title, url, thumbnail, category, is_published, sort_order) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [
        title,
        url,
        thumbnail || "",
        category || "general",
        is_published ?? true,
        sort_order ?? 0,
      ],
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
    const { id, title, url, thumbnail, category, is_published, sort_order } =
      await req.json();
    await pool.query(
      `UPDATE videos SET title=$1, url=$2, thumbnail=$3, category=$4, is_published=$5, sort_order=$6 WHERE id=$7`,
      [
        title,
        url,
        thumbnail || "",
        category || "general",
        is_published ?? true,
        sort_order ?? 0,
        id,
      ],
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
    await pool.query(`DELETE FROM videos WHERE id=$1`, [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
