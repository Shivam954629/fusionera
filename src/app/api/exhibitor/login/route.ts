import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

async function initTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS exhibitor_logins (
      id SERIAL PRIMARY KEY,
      exhibitor_id VARCHAR(50) UNIQUE,
      name VARCHAR(255),
      company VARCHAR(255),
      email VARCHAR(255),
      password_hash VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function POST(req: NextRequest) {
  try {
    await initTable();
    const { name, id, password } = await req.json();

    if (!name?.trim() || !id?.trim() || !password?.trim()) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const result = await pool.query(
      `SELECT * FROM exhibitor_logins WHERE exhibitor_id=$1`,
      [id.trim()],
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid Exhibitor ID or credentials." }, { status: 401 });
    }

    const exhibitor = result.rows[0];

    if (exhibitor.name.toLowerCase() !== name.trim().toLowerCase()) {
      return NextResponse.json({ error: "Invalid Exhibitor ID or credentials." }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password.trim(), exhibitor.password_hash);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      exhibitorId: exhibitor.exhibitor_id,
      name: exhibitor.name,
      company: exhibitor.company,
    });
  } catch (err: any) {
    console.error("Exhibitor login error:", err?.message || err);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
