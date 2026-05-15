import { NextRequest, NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";
import twilio from "twilio";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export async function POST(req: NextRequest) {
  try {
    await initDB();
    const { phone, visitorType } = await req.json();

    if (!phone)
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 },
      );

    // Clean phone number and format for Twilio (+91XXXXXXXXXX)
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10)
      return NextResponse.json(
        { error: "Invalid phone number." },
        { status: 400 },
      );

    const fullPhone = `+91${cleanPhone}`;

    // Rate limit: max 3 OTPs per phone per hour
    const rateCheck = await pool.query(
      `SELECT COUNT(*) FROM otps WHERE phone_number=$1 AND created_at > NOW() - INTERVAL '1 hour'`,
      [cleanPhone],
    );
    if (parseInt(rateCheck.rows[0].count) >= 4) {
      return NextResponse.json(
        { error: "Too many OTP requests. Please try after 1 hour." },
        { status: 429 },
      );
    }

    // Send OTP via Twilio Verify
    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({ to: fullPhone, channel: "sms" });

    console.log("Twilio verification status:", verification.status);

    if (verification.status !== "pending") {
      return NextResponse.json(
        { error: "Failed to send OTP. Please try again." },
        { status: 500 },
      );
    }

    // Save a record in DB (otp field empty since Twilio manages it)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      `INSERT INTO otps (phone_number, otp, expires_at) VALUES ($1, $2, $3)`,
      [cleanPhone, "twilio", expiresAt],
    );

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
      phone: cleanPhone,
      visitorType,
    });
  } catch (err: any) {
    console.error("OTP send error:", err?.message || err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
