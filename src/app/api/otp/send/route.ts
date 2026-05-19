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

    // INTERNATIONAL: email-based OTP
    if (visitorType === "international") {
      if (!email)
        return NextResponse.json({ error: "Email address is required." }, { status: 400 });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return NextResponse.json({ error: "Invalid email address." }, { status: 400 });

      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await pool.query(
        `INSERT INTO otps (phone_number, otp, expires_at) VALUES ($1, $2, $3)`,
        [email, otp, expiresAt],
      );

      await transporter.sendMail({
        from: `"Fusion The Era" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Your Fusion The Era OTP",
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#fff;border:1px solid #dde6ff;border-radius:16px">
            <h2 style="color:#3B82F6;margin:0 0 8px">Fusion The Era Visitor Registration</h2>
            <p style="color:#6b7280;margin:0 0 24px">Your OTP for email verification:</p>
            <div style="background:linear-gradient(135deg,#110c41,#1a1560);border-radius:12px;padding:20px;text-align:center;margin-bottom:24px">
              <p style="color:#8cecff;font-size:12px;letter-spacing:0.2em;margin:0 0 8px;text-transform:uppercase">One-Time Password</p>
              <p style="color:#fff;font-size:36px;font-weight:900;letter-spacing:0.3em;margin:0">${otp}</p>
            </div>
            <p style="color:#6b7280;font-size:13px;margin:0">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, message: "OTP sent to your email.", visitorType });
    }

    // INDIAN: phone-based OTP via Twilio
    if (!phone)
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10)
      return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });

    const fullPhone = `+91${cleanPhone}`;

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

    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({ to: fullPhone, channel: "sms" });

    if (verification.status !== "pending") {
      return NextResponse.json({ error: "Failed to send OTP. Please try again." }, { status: 500 });
    }

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await pool.query(
      `INSERT INTO otps (phone_number, otp, expires_at) VALUES ($1, $2, $3)`,
      [cleanPhone, "twilio", expiresAt],
    );

    return NextResponse.json({ success: true, message: "OTP sent successfully.", phone: cleanPhone, visitorType });
  } catch (err: any) {
    console.error("OTP send error:", err?.message || err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
