import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, otp, visitorType } = await req.json();

    // INTERNATIONAL only — email OTP verification
    if (visitorType !== "international")
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });

    if (!email || !otp)
      return NextResponse.json({ error: "Email and OTP required." }, { status: 400 });

    const record = await pool.query(
      `SELECT * FROM otps WHERE phone_number=$1 AND used=FALSE AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
      [email],
    );

    if (record.rows.length === 0)
      return NextResponse.json({ error: "OTP expired or not found. Please request a new one." }, { status: 401 });

    if (record.rows[0].otp !== otp)
      return NextResponse.json({ error: "Invalid OTP. Please try again." }, { status: 401 });

    await pool.query(
      `UPDATE otps SET used=TRUE WHERE phone_number=$1 AND used=FALSE`,
      [email],
    );

    // Get or create visitor record
    const existing = await pool.query(
      `SELECT id FROM visitors WHERE email=$1 AND registration_complete=FALSE LIMIT 1`,
      [email],
    );

    let visitorId: number;
    if (existing.rows.length > 0) {
      visitorId = existing.rows[0].id;
    } else {
      const newVisitor = await pool.query(
        `INSERT INTO visitors (phone_number, email, otp_verified, full_name) VALUES ($1, $2, TRUE, $3) RETURNING id`,
        [email, email, ""],
      );
      visitorId = newVisitor.rows[0].id;
    }

    return NextResponse.json({ success: true, visitorId, email });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Verification failed.";
    console.error("OTP verify error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
