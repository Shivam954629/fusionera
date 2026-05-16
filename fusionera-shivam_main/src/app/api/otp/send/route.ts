import { NextRequest, NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";
import twilio from "twilio";
import nodemailer from "nodemailer";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASS },
});

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    await initDB();
    const { phone, email, visitorType } = await req.json();

    // ── INTERNATIONAL: Email OTP ──
    if (visitorType === "international") {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
          { error: "Valid email address is required." },
          { status: 400 },
        );
      }

      // Rate limit: max 4 per hour
      const rateCheck = await pool.query(
        `SELECT COUNT(*) FROM otps WHERE phone_number=$1 AND created_at > NOW() - INTERVAL '1 hour'`,
        [email],
      );
      if (parseInt(rateCheck.rows[0].count) >= 4) {
        return NextResponse.json(
          { error: "OTP limit reached. Please try again after 1 hour." },
          { status: 429 },
        );
      }

      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await pool.query(
        `INSERT INTO otps (phone_number, otp, expires_at) VALUES ($1, $2, $3)`,
        [email, otp, expiresAt],
      );

      await transporter.sendMail({
        from: `"FusionEra Events" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "FusionEra 2026 — Your OTP for Visitor Registration",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto">
            <div style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:20px;text-align:center;border-radius:12px 12px 0 0">
              <h2 style="color:white;margin:0">FusionEra Exhibition 2026</h2>
              <p style="color:#bfdbfe;margin:4px 0;font-size:13px">July 4–7, 2026 · Bharat Mandapam, New Delhi</p>
            </div>
            <div style="padding:24px;background:#f8fafc;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
              <p style="color:#374151;margin:0 0 16px">Your One-Time Password (OTP) for Visitor Registration:</p>
              <div style="background:white;border:2px solid #3b82f6;border-radius:12px;padding:20px;text-align:center;margin:16px 0">
                <p style="font-size:36px;font-weight:bold;color:#1d4ed8;letter-spacing:8px;margin:0">${otp}</p>
              </div>
              <p style="color:#6b7280;font-size:13px">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
            </div>
          </div>
        `,
      });

      return NextResponse.json({
        success: true,
        message: "OTP sent to your email.",
        visitorType,
      });
    }

    // ── INDIAN: SMS OTP via Twilio ──
    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 },
      );
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const fullPhone = phone.startsWith("+")
      ? phone
      : `+91${cleanPhone.slice(-10)}`;

    // Rate limit
    const rateCheck = await pool.query(
      `SELECT COUNT(*) FROM otps WHERE phone_number=$1 AND created_at > NOW() - INTERVAL '1 hour'`,
      [cleanPhone.slice(-10)],
    );
    if (parseInt(rateCheck.rows[0].count) >= 4) {
      return NextResponse.json(
        { error: "OTP limit reached. Please try again after 1 hour." },
        { status: 429 },
      );
    }

    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({ to: fullPhone, channel: "sms" });

    if (verification.status !== "pending") {
      return NextResponse.json(
        { error: "Failed to send OTP. Please try again." },
        { status: 500 },
      );
    }

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      `INSERT INTO otps (phone_number, otp, expires_at) VALUES ($1, $2, $3)`,
      [cleanPhone.slice(-10), "twilio", expiresAt],
    );

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
      phone: cleanPhone.slice(-10),
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
