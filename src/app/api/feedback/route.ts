import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  try { jwt.verify(token, JWT_SECRET); return true; } catch { return false; }
}

async function initTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      title VARCHAR(20),
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      company VARCHAR(255),
      designation VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      address TEXT,
      pin_code VARCHAR(20),
      city VARCHAR(100),
      state VARCHAR(100),
      country VARCHAR(100),
      message TEXT,
      consent BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function GET() {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await initTable();
    const result = await pool.query(`SELECT * FROM enquiries ORDER BY created_at DESC`);
    return NextResponse.json({ success: true, data: result.rows }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Failed to fetch." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initTable();
    const b = await req.json();
    await pool.query(
      `INSERT INTO enquiries (title,first_name,last_name,company,designation,email,phone,address,pin_code,city,state,country,message,consent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [b.title||"", b.first_name||"", b.last_name||"", b.company||"", b.designation||"",
       b.email||"", b.phone||"", b.address||"", b.pin_code||"", b.city||"",
       b.state||"", b.country||"", b.message||"", b.consent||false],
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await pool.query(`DELETE FROM enquiries WHERE id=$1`, [id]);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
