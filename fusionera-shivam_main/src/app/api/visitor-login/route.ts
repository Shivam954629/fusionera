import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = await req.json();
    if (!identifier || !password)
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );

    const result = await pool.query(
      `SELECT * FROM visitors WHERE registration_no=$1 OR email=$1 OR phone_number=$1 LIMIT 1`,
      [identifier],
    );
    const visitor = result.rows[0];
    if (!visitor)
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    if (visitor.is_blocked)
      return NextResponse.json(
        { error: "Your account has been blocked. Please contact support." },
        { status: 403 },
      );
    if (!visitor.password_hash)
      return NextResponse.json(
        { error: "Password not set. Please contact support." },
        { status: 401 },
      );

    const valid = await bcrypt.compare(password, visitor.password_hash);
    if (!valid)
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );

    const token = jwt.sign(
      { id: visitor.id, regNo: visitor.registration_no },
      JWT_SECRET,
      { expiresIn: "8h" },
    );
    const response = NextResponse.json({ success: true });
    response.cookies.set("visitor_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("Visitor login error:", err);
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("visitor_token");
  return response;
}
