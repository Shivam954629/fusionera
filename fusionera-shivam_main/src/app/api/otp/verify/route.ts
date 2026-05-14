import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();
    if (!phone || !otp)
      return NextResponse.json(
        { error: "Phone and OTP required." },
        { status: 400 },
      );

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);

    // Find valid OTP
    const result = await pool.query(
      `SELECT * FROM otps WHERE phone_number=$1 AND otp=$2 AND used=FALSE AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1`,
      [cleanPhone, otp],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid or expired OTP." },
        { status: 401 },
      );
    }

    // Mark OTP as used
    await pool.query(`UPDATE otps SET used=TRUE WHERE id=$1`, [
      result.rows[0].id,
    ]);

    // Create or get visitor session
    const existing = await pool.query(
      `SELECT id FROM visitors WHERE phone_number=$1 AND registration_complete=FALSE LIMIT 1`,
      [cleanPhone],
    );

    let visitorId: number;
    if (existing.rows.length > 0) {
      visitorId = existing.rows[0].id;
    } else {
      const newVisitor = await pool.query(
        `INSERT INTO visitors (phone_number, otp_verified) VALUES ($1, TRUE) RETURNING id`,
        [cleanPhone],
      );
      visitorId = newVisitor.rows[0].id;
    }

    return NextResponse.json({ success: true, visitorId, phone: cleanPhone });
  } catch (err) {
    console.error("OTP verify error:", err);
    return NextResponse.json(
      { error: "Verification failed." },
      { status: 500 },
    );
  }
}
