import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

async function initExhibitorLoginTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS exhibitor_logins (
      id SERIAL PRIMARY KEY,
      exhibitor_name VARCHAR(255) NOT NULL,
      exhibitor_id VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      company VARCHAR(255),
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function POST(req: NextRequest) {
  try {
    await initExhibitorLoginTable();
    const { name, id, password } = await req.json();

    if (!name || !id || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `SELECT * FROM exhibitor_logins WHERE exhibitor_id=$1 AND is_active=TRUE`,
      [id.trim()],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          error:
            "Invalid Exhibitor ID or Password. Please contact FusionEra team.",
        },
        { status: 401 },
      );
    }

    const exhibitor = result.rows[0];

    // Check name match (case insensitive)
    if (exhibitor.exhibitor_name.toLowerCase() !== name.trim().toLowerCase()) {
      return NextResponse.json(
        {
          error: "Invalid Exhibitor Name or ID. Please contact FusionEra team.",
        },
        { status: 401 },
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      exhibitor.password_hash,
    );
    if (!passwordMatch) {
      return NextResponse.json(
        {
          error:
            "Invalid Password. Please use Resend Password to get your credentials.",
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      exhibitorId: exhibitor.id,
      name: exhibitor.exhibitor_name,
      company: exhibitor.company,
    });
  } catch (err: any) {
    console.error("Exhibitor login error:", err?.message || err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
