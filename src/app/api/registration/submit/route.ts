import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
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
      name: `${visitor.first_name} ${visitor.last_name}`.trim(),
      phone: visitor.phone_number,
      email: visitor.email || "",
      company: visitor.company || "",
      designation: visitor.designation || "",
      city: visitor.city || "",
      state: visitor.state || "",
      business_type: visitor.business_type || "",
      product_interests: visitor.product_interests || "",
      visit_purpose: visitor.visit_purpose || "",
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

    // Send WhatsApp badge (non-blocking — registration succeeds even if this fails)
    if (visitor.phone_number) {
      (async () => {
        try {
          const { generateBadgeImage } = await import("@/lib/generateBadgeImage");
          const { uploadImageToWhatsApp, sendWhatsAppBadge } = await import("@/lib/whatsapp");
          const badgeBuffer = await generateBadgeImage({
            name: `${visitor.first_name || ""} ${visitor.last_name || ""}`.trim(),
            company: visitor.company || "",
            regNo,
            qrCodeDataUrl,
          });
          const mediaId = await uploadImageToWhatsApp(badgeBuffer);
          await sendWhatsAppBadge(visitor.phone_number, mediaId, `${visitor.first_name || ""} ${visitor.last_name || ""}`.trim());
        } catch (waErr) {
          console.error("WhatsApp badge error (non-fatal):", waErr);
        }
      })();
    }

    // Send confirmation email to visitor with QR badge
    if (visitor.email) {
      transporter.sendMail({
        from: `"Fusion The Era Events" <${process.env.SMTP_USER}>`,
        to: visitor.email,
        subject: "✅ Registration Confirmed — Fusion The Era 2026",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#110c41,#1a1560);padding:32px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:22px;">🎉 Registration Confirmed!</h1>
              <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;">Thank you for registering for Fusion The Era 2026</p>
            </div>
            <div style="background:#fff;padding:28px 32px;">
              <p style="color:#1a1560;font-size:16px;font-weight:bold;">Dear ${visitor.first_name || "Visitor"},</p>
              <p style="color:#6b7280;font-size:14px;">Your registration is complete. Please find your details below:</p>
              <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;margin:16px 0;">
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;width:40%;">Registration No.</td><td style="color:#1a1560;font-weight:700;font-size:14px;">${regNo}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">Name</td><td style="color:#1a1560;font-size:13px;">${visitor.first_name || ""} ${visitor.last_name || ""}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">Company</td><td style="color:#1a1560;font-size:13px;">${visitor.company || "—"}</td></tr>
                <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">Login Password</td><td style="color:#1a1560;font-weight:700;font-size:13px;">${password}</td></tr>
              </table>
              <div style="text-align:center;margin:24px 0;">
                <p style="color:#6b7280;font-size:13px;margin-bottom:12px;">Your QR Code — Show this at the entry gate</p>
                <img src="${qrCodeDataUrl}" width="200" height="200" alt="QR Code" style="border:4px solid #e5e7eb;border-radius:8px;"/>
              </div>
              <div style="background:#fef3c7;border-radius:8px;padding:16px;margin-top:16px;">
                <p style="color:#92400e;font-size:13px;font-weight:bold;margin:0 0 8px;">📅 Event Details</p>
                <p style="color:#78350f;font-size:13px;margin:0;">Date: 4 · 5 · 6 · 7 July 2026</p>
                <p style="color:#78350f;font-size:13px;margin:4px 0 0;">Venue: Bharat Mandapam, Pragati Maidan, New Delhi</p>
              </div>
            </div>
            <div style="background:#f9fafb;padding:16px;text-align:center;">
              <p style="color:#9ca3af;font-size:12px;margin:0;">fusiontheera.com</p>
            </div>
          </div>
        `,
      }).catch((err) => console.error("Visitor email error:", err));
    }

    // Notify visitor service team
    transporter.sendMail({
      from: `"Fusion The Era Events" <${process.env.SMTP_USER}>`,
      to: "pawan.singh@fusiontheera.com, jasvinder.chaudhary@fusiontheera.com, sales.info@fusiontheera.com",
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
