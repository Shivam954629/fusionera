import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASS },
});

function generateRegNo(): string {
  return `FE${new Date().getFullYear()}${Math.floor(10000 + Math.random() * 90000)}`;
}

function generatePassword(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

export async function POST(req: NextRequest) {
  try {
    const { visitorId } = await req.json();
    if (!visitorId)
      return NextResponse.json(
        { error: "Visitor ID required." },
        { status: 400 },
      );

    const result = await pool.query(`SELECT * FROM visitors WHERE id=$1`, [
      visitorId,
    ]);
    const visitor = result.rows[0];
    if (!visitor)
      return NextResponse.json(
        { error: "Visitor not found." },
        { status: 404 },
      );
    if (visitor.registration_complete)
      return NextResponse.json(
        { error: "Already registered." },
        { status: 400 },
      );

    const regNo = generateRegNo();
    const password = generatePassword();
    const passwordHash = await bcrypt.hash(password, 10);

    // Generate QR code
    const qrData = JSON.stringify({
      regNo,
      phone: visitor.phone_number,
      name: `${visitor.first_name} ${visitor.last_name}`,
    });
    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
    });

    // Update visitor
    await pool.query(
      `UPDATE visitors SET registration_no=$1, password_hash=$2, qr_code=$3, registration_complete=TRUE, full_name=$4 WHERE id=$5`,
      [
        regNo,
        passwordHash,
        qrCodeDataUrl,
        `${visitor.first_name || ""} ${visitor.last_name || ""}`.trim(),
        visitorId,
      ],
    );

    // Send email with QR pass
    if (visitor.email) {
      await transporter.sendMail({
        from: `"Fusion The Era Events" <${process.env.GMAIL_USER}>`,
        to: visitor.email,
        subject: "✅ Registration Confirmed — Your Entry Pass | Fusion The Era 2026",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
            <div style="background:linear-gradient(135deg,#110c41,#1a1560);padding:32px 40px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:24px;letter-spacing:1px;">FUSION THE ERA 2026</h1>
              <p style="color:#a5b4fc;margin:6px 0 0;font-size:13px;">Perfect Business Platform</p>
            </div>
            <div style="background:#fff;padding:36px 40px;">
              <div style="text-align:center;margin-bottom:24px;">
                <h2 style="color:#1a1560;margin:0 0 8px;font-size:22px;">🎟️ Your Entry Pass</h2>
                <p style="color:#6b7280;font-size:14px;margin:0;">Present this QR code at the venue entrance</p>
              </div>
              
              <!-- Visitor Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9ff;border-radius:12px;margin-bottom:24px;">
                <tr><td style="padding:20px 24px;">
                  <table width="100%" cellpadding="6" cellspacing="0">
                    <tr><td style="color:#6b7280;font-size:13px;width:40%;">👤 Name</td><td style="color:#1a1560;font-weight:700;font-size:14px;">${visitor.first_name || ""} ${visitor.last_name || ""}</td></tr>
                    <tr><td style="color:#6b7280;font-size:13px;">🏢 Company</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.company || "—"}</td></tr>
                    <tr><td style="color:#6b7280;font-size:13px;">📞 Mobile</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.phone_number}</td></tr>
                    <tr><td style="color:#6b7280;font-size:13px;">🔢 Reg No</td><td style="color:#1a1560;font-weight:700;font-size:15px;">${regNo}</td></tr>
                    <tr><td style="color:#6b7280;font-size:13px;">🔑 Password</td><td style="color:#1a1560;font-weight:700;font-size:15px;">${password}</td></tr>
                  </table>
                </td></tr>
              </table>

              <!-- QR Code -->
              <div style="text-align:center;background:#f0f4ff;border-radius:12px;padding:24px;margin-bottom:24px;">
                <p style="color:#374151;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 16px;">Scan QR Code at Entrance</p>
                <img src="${qrCodeDataUrl}" alt="QR Code" style="width:200px;height:200px;border-radius:8px;" />
                <p style="color:#6b7280;font-size:12px;margin:12px 0 0;">Registration No: <strong>${regNo}</strong></p>
              </div>

              <!-- Event Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9ff;border-radius:12px;margin-bottom:16px;">
                <tr><td style="padding:16px 24px;">
                  <table width="100%" cellpadding="6" cellspacing="0">
                    <tr><td style="color:#6b7280;font-size:13px;width:40%;">📅 Dates</td><td style="color:#1a1560;font-weight:600;font-size:13px;">July 4–6, 2026</td></tr>
                    <tr><td style="color:#6b7280;font-size:13px;">📍 Venue</td><td style="color:#1a1560;font-weight:600;font-size:13px;">Bharat Mandapam, Pragati Maidan, New Delhi</td></tr>
                    <tr><td style="color:#6b7280;font-size:13px;">🎟️ Entry</td><td style="color:#00c9a7;font-weight:700;font-size:13px;">FREE</td></tr>
                  </table>
                </td></tr>
              </table>
            </div>
            <div style="background:#f8f9ff;padding:16px 40px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="color:#9ca3af;font-size:11px;margin:0;">© 2026 Fusion The Era — Perfect Business Platform</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, regNo, qrCode: qrCodeDataUrl });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Submission failed." }, { status: 500 });
  }
}
