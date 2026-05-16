import { NextRequest, NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

export async function POST(req: NextRequest) {
  try {
    await initDB();

    const { username, password } = await req.json();

    // Check if admin exists; if not and env creds match, auto-create
    const adminRes = await pool.query(
      `SELECT * FROM admins WHERE username = $1`,
      [username],
    );

    let admin = adminRes.rows[0];

    if (!admin) {
      // Auto-create from env if first login
      if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const hash = await bcrypt.hash(password, 10);
        const insertRes = await pool.query(
          `INSERT INTO admins (username, password_hash) VALUES ($1, $2) RETURNING *`,
          [username, hash],
        );
        admin = insertRes.rows[0];
      } else {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 },
        );
      }
    } else {
      const valid = await bcrypt.compare(password, admin.password_hash);
      if (!valid) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 },
        );
      }
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: "8h" },
    );

    const response = NextResponse.json({
      success: true,
      username: admin.username,
    });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}
