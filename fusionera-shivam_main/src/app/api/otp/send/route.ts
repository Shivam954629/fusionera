import { NextRequest, NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendSMS(phone: string, otp: string): Promise<boolean> {
  // DEV MODE: if no API key, skip SMS and just return true (OTP shown in server console)
  if (!process.env.FAST2SMS_API_KEY) {
    console.warn(
      `⚠️  FAST2SMS_API_KEY not set. OTP for ${phone}: ${otp} (DEV MODE — not sent via SMS)`,
    );
    return true; // pretend success so dev can test the flow
  }

  try {
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_API_KEY}&route=otp&variables_values=${otp}&flash=0&numbers=${phone}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { "cache-control": "no-cache" },
    });
    const data = await res.json();
    console.log("Fast2SMS response:", data);
    return data.return === true;
  } catch (err) {
    console.error("SMS error:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    await initDB();
    const { phone, visitorType } = await req.json();

    if (!phone)
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 },
      );

    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10)
      return NextResponse.json(
        { error: "Invalid phone number." },
        { status: 400 },
      );

    // Check rate limit - max 3 OTPs per phone per hour
    const rateCheck = await pool.query(
      `SELECT COUNT(*) FROM otps WHERE phone_number=$1 AND created_at > NOW() - INTERVAL '1 hour'`,
      [cleanPhone],
    );
    if (parseInt(rateCheck.rows[0].count) >= 3) {
      return NextResponse.json(
        { error: "Too many OTP requests. Please try after 1 hour." },
        { status: 429 },
      );
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to DB
    await pool.query(
      `INSERT INTO otps (phone_number, otp, expires_at) VALUES ($1, $2, $3)`,
      [cleanPhone, otp, expiresAt],
    );

    // Send SMS (or log in dev)
    const sent = await sendSMS(cleanPhone, otp);
    if (!sent) {
      return NextResponse.json(
        { error: "Failed to send OTP via SMS. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
      phone: cleanPhone,
      visitorType,
      // In dev (no API key), expose OTP in response for testing
      ...(process.env.NODE_ENV !== "production" && !process.env.FAST2SMS_API_KEY
        ? { devOtp: otp }
        : {}),
    });
  } catch (err) {
    console.error("OTP send error:", err);
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
