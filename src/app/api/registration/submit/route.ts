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

    // Generate unique regNo — retry up to 5 times to avoid rare collisions
    let regNo = "";
    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = generateRegNo();
      const exists = await pool.query(`SELECT id FROM visitors WHERE registration_no=$1`, [candidate]);
      if (exists.rows.length === 0) { regNo = candidate; break; }
    }
    if (!regNo)
      return NextResponse.json({ error: "Could not generate registration number. Please try again." }, { status: 500 });

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

    // Notify visitor service team
    transporter.sendMail({
      from: `"Fusion The Era Events" <${process.env.GMAIL_USER}>`,
      to: "info@fusiontheera.com, jasvinder.chaudhary@fusiontheera.com",
      subject: `🔔 New Visitor Registered — ${visitor.first_name || ""} ${visitor.last_name || ""}`.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#110c41,#1a1560);padding:24px 32px;">
            <h2 style="color:#fff;margin:0;font-size:18px;">🔔 New Visitor Registered</h2>
          </div>
          <div style="background:#fff;padding:28px 32px;">
            <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;">
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;width:40%;">🔢 Reg No</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${regNo}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">👤 Name</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.first_name || ""} ${visitor.last_name || ""}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">🏢 Company</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.company || "—"}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">📞 Phone</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.phone_number}</td></tr>
              <tr><td style="color:#6b7280;font-size:13px;">📧 Email</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.email || "—"}</td></tr>
            </table>
          </div>
        </div>
      `,
    }).catch((err) => console.error("Admin email error:", err));

    return NextResponse.json({ success: true, regNo, qrCode: qrCodeDataUrl });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Submission failed." }, { status: 500 });
  }
}
