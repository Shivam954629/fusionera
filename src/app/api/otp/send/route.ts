import { NextRequest, NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";
import nodemailer from "nodemailer";

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

    // ── INTERNATIONAL: email OTP (unchanged) ────────────────────────
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
            <h2 style="color:#1a1464;margin:0 0 8px">Fusion The Era Visitor Registration</h2>
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

    // ── INDIAN: no OTP — phone uniqueness check ──────────────────────
    if (!phone)
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10)
      return NextResponse.json({ error: "Invalid phone number. Enter 10 digits." }, { status: 400 });

    // Already fully registered — return their existing pass
    const complete = await pool.query(
      `SELECT id, registration_no, qr_code FROM visitors WHERE phone_number=$1 AND registration_complete=TRUE LIMIT 1`,
      [cleanPhone],
    );
    if (complete.rows.length > 0) {
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        regNo: complete.rows[0].registration_no,
        qrCode: complete.rows[0].qr_code || null,
      });
    }

    // In-progress registration — resume
    const inProgress = await pool.query(
      `SELECT id FROM visitors WHERE phone_number=$1 AND registration_complete=FALSE LIMIT 1`,
      [cleanPhone],
    );
    if (inProgress.rows.length > 0) {
      return NextResponse.json({
        success: true,
        visitorId: inProgress.rows[0].id,
        resuming: true,
      });
    }

    // New visitor — create record
    const newVisitor = await pool.query(
      `INSERT INTO visitors (phone_number, otp_verified, full_name) VALUES ($1, TRUE, '') RETURNING id`,
      [cleanPhone],
    );
    return NextResponse.json({
      success: true,
      visitorId: newVisitor.rows[0].id,
      isNew: true,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error.";
    console.error("OTP send error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
