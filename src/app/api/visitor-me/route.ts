import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("visitor_token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number };
    const result = await pool.query(`SELECT * FROM visitors WHERE id=$1`, [
      payload.id,
    ]);
    const v = result.rows[0];
    if (!v || v.is_blocked)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({
      visitor: {
        id: v.id,
        fullName: v.full_name,
        regNo: v.registration_no,
        email: v.email,
        phone: v.phone_number,
      },
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
