import { NextRequest, NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

function verifyToken(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASS },
});

function generatePassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

function generateRegNo(): string {
  return `FE${new Date().getFullYear()}${Math.floor(10000 + Math.random() * 90000)}`;
}

async function sendVisitorEmail(
  to: string,
  fullName: string,
  regNo: string,
  password: string,
) {
  await transporter.sendMail({
    from: `"Fusionera Events" <${process.env.GMAIL_USER}>`,
    to,
    subject: "✅ Registration Confirmed — Fusionera 2026",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#110c41,#1a1560);padding:32px 40px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:1px;">FUSIONERA 2026</h1>
          <p style="color:#a5b4fc;margin:6px 0 0;font-size:12px;">Perfect Business Platform</p>
        </div>
        <div style="background:#fff;padding:36px 40px;text-align:center;">
          <div style="width:60px;height:60px;background:linear-gradient(135deg,#00c9a7,#00b4d8);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">
            <span style="color:#fff;font-size:26px;">✓</span>
          </div>
          <h2 style="color:#1a1560;margin:0 0 10px;font-size:20px;">Registration Confirmed!</h2>
          <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 24px;">
            Dear <strong>${fullName}</strong>, you are successfully registered for Fusionera 2026.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;border-radius:10px;text-align:left;margin-bottom:20px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 12px;color:#374151;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Your Login Credentials</p>
              <table cellpadding="8" cellspacing="0" width="100%">
                <tr><td style="color:#6b7280;font-size:13px;width:50%;">🔢 Registration No</td><td style="color:#1a1560;font-size:15px;font-weight:700;">${regNo}</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">🔑 Password</td><td style="color:#1a1560;font-size:15px;font-weight:700;">${password}</td></tr>
              </table>
            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9ff;border-radius:10px;text-align:left;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 10px;color:#374151;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Event Details</p>
              <table cellpadding="6" cellspacing="0" width="100%">
                <tr><td style="color:#6b7280;font-size:13px;width:40%;">📅 Dates</td><td style="color:#1a1560;font-size:13px;font-weight:600;">July 4–6, 2026</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">📍 Location</td><td style="color:#1a1560;font-size:13px;font-weight:600;">New Delhi, India</td></tr>
                <tr><td style="color:#6b7280;font-size:13px;">🎟️ Entry</td><td style="color:#00c9a7;font-size:13px;font-weight:600;">Free Entry</td></tr>
              </table>
            </td></tr>
          </table>
        </div>
        <div style="background:#f8f9ff;padding:16px 40px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#9ca3af;font-size:11px;margin:0;">© 2026 Fusionera — Perfect Business Platform</p>
        </div>
      </div>
    `,
  });
}

async function sendAdminEmail(
  fullName: string,
  phoneNumber: string,
  email: string,
  regNo: string,
) {
  await transporter.sendMail({
    from: `"Fusionera Events" <${process.env.GMAIL_USER}>`,
    to: "info@fusionera.in",
    subject: `🔔 New Visitor — ${fullName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#110c41,#1a1560);padding:24px 32px;">
          <h2 style="color:#fff;margin:0;font-size:18px;">🔔 New Visitor Registered</h2>
        </div>
        <div style="background:#fff;padding:28px 32px;">
          <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;">
            <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;width:40%;">🔢 Reg No</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${regNo}</td></tr>
            <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">👤 Name</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${fullName}</td></tr>
            <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">📞 Phone</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${phoneNumber}</td></tr>
            <tr><td style="color:#6b7280;font-size:13px;">📧 Email</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${email || "—"}</td></tr>
          </table>
        </div>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    await initDB();
    const { fullName, phoneNumber, email } = await req.json();
    if (!fullName || !phoneNumber) {
      return NextResponse.json(
        { error: "Full name and phone number are required." },
        { status: 400 },
      );
    }
    const regNo = generateRegNo();
    const password = generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO visitors (full_name, phone_number, email, registration_no, password_hash) VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      [fullName, phoneNumber, email || null, regNo, passwordHash],
    );

    Promise.allSettled([
      email
        ? sendVisitorEmail(email, fullName, regNo, password)
        : Promise.resolve(),
      sendAdminEmail(fullName, phoneNumber, email, regNo),
    ]).catch((err) => console.error("Email error:", err));

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await initDB();
    const result = await pool.query(
      `SELECT * FROM visitors ORDER BY created_at DESC`,
    );
    return NextResponse.json({ visitors: result.rows });
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch visitors." },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, is_blocked } = await req.json();
    await pool.query(`UPDATE visitors SET is_blocked = $1 WHERE id = $2`, [
      is_blocked,
      id,
    ]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Block error:", err);
    return NextResponse.json(
      { error: "Failed to update visitor." },
      { status: 500 },
    );
  }
}
