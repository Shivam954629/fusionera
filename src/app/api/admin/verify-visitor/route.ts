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

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { regNo, phone } = await req.json();
    if (!regNo && !phone)
      return NextResponse.json({ error: "regNo or phone required" }, { status: 400 });

    const result = regNo
      ? await pool.query(`SELECT * FROM visitors WHERE registration_no=$1`, [regNo])
      : await pool.query(`SELECT * FROM visitors WHERE phone_number=$1`, [phone]);

    const visitor = result.rows[0];
    if (!visitor)
      return NextResponse.json({ error: "Visitor not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      visitor: {
        id: visitor.id,
        name: visitor.full_name || `${visitor.first_name || ""} ${visitor.last_name || ""}`.trim(),
        phone: visitor.phone_number,
        email: visitor.email,
        company: visitor.company || visitor.company_name || "",
        city: visitor.city || "",
        regNo: visitor.registration_no,
        is_blocked: visitor.is_blocked,
        registration_complete: visitor.registration_complete,
      },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
