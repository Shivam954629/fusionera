import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

async function initTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS feedback (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(50),
      message TEXT NOT NULL,
      rating INT DEFAULT 5,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function POST(req: NextRequest) {
  try {
    await initTable();
    const { name, email, phone, message, rating } = await req.json();
    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message required." },
        { status: 400 },
      );
    }
    await pool.query(
      `INSERT INTO feedback (name, email, phone, message, rating) VALUES ($1,$2,$3,$4,$5)`,
      [name, email || "", phone || "", message, rating || 5],
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit." }, { status: 500 });
  }
}

export async function GET() {
  try {
    await initTable();
    const result = await pool.query(
      `SELECT * FROM feedback ORDER BY created_at DESC`,
    );
    return NextResponse.json({ success: true, data: result.rows });
  } catch {
    return NextResponse.json({ error: "Failed to fetch." }, { status: 500 });
  }
}
