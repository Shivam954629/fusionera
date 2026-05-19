import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import twilio from "twilio";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export async function POST(req: NextRequest) {
  try {
    const { phone, email, otp, visitorType } = await req.json();

    // INTERNATIONAL: verify email OTP
    if (visitorType === "international") {
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
    }

    // INDIAN: verify phone OTP via Twilio
    if (!phone || !otp)
      return NextResponse.json({ error: "Phone and OTP required." }, { status: 400 });

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    const fullPhone = `+91${cleanPhone}`;

    const verificationCheck = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verificationChecks.create({ to: fullPhone, code: otp });

    if (verificationCheck.status !== "approved") {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 401 });
    }

    await pool.query(
      `UPDATE otps SET used=TRUE WHERE phone_number=$1 AND used=FALSE`,
      [cleanPhone],
    );

    const existing = await pool.query(
      `SELECT id FROM visitors WHERE phone_number=$1 AND registration_complete=FALSE LIMIT 1`,
      [cleanPhone],
    );

    let visitorId: number;
    if (existing.rows.length > 0) {
      visitorId = existing.rows[0].id;
    } else {
      const newVisitor = await pool.query(
        `INSERT INTO visitors (phone_number, otp_verified, full_name) VALUES ($1, TRUE, $2) RETURNING id`,
        [cleanPhone, ""],
      );
      visitorId = newVisitor.rows[0].id;
    }

    return NextResponse.json({ success: true, visitorId, phone: cleanPhone });
  } catch (err: any) {
    console.error("OTP verify error:", err?.message || err);
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
