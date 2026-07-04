import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { sendEmail, emailHeader, emailFooter } from "@/lib/email";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";

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

// Email clients (Gmail etc.) strip inline base64 images — host the badge on
// Cloudinary and link to it instead, so it actually renders in the inbox.
async function uploadBadgeToCloudinary(buffer: Buffer, regNo: string): Promise<string | null> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !preset) return null;
  try {
    const fd = new FormData();
    fd.append("file", new Blob([new Uint8Array(buffer)], { type: "image/png" }));
    fd.append("upload_preset", preset);
    fd.append("public_id", `badges/${regNo}`);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    return data.secure_url || null;
  } catch (err) {
    console.error("Badge Cloudinary upload error (non-fatal):", err);
    return null;
  }
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

    // Generate the same badge image used on the website/WhatsApp, once, and reuse it everywhere
    const visitorName = `${visitor.first_name || ""} ${visitor.last_name || ""}`.trim();
    let badgeBuffer: Buffer | null = null;
    try {
      const { generateBadgeImage } = await import("@/lib/generateBadgeImage");
      badgeBuffer = await generateBadgeImage({
        name: visitorName,
        company: visitor.company || "",
        regNo,
        qrCodeDataUrl,
      });
    } catch (badgeErr) {
      console.error("Badge image generation error (non-fatal):", badgeErr);
    }

    // Send WhatsApp badge (non-blocking — registration succeeds even if this fails)
    if (visitor.phone_number && badgeBuffer) {
      const waBadgeBuffer = badgeBuffer;
      (async () => {
        try {
          const { uploadImageToWhatsApp, sendWhatsAppBadge } = await import("@/lib/whatsapp");
          const mediaId = await uploadImageToWhatsApp(waBadgeBuffer);
          await sendWhatsAppBadge(visitor.phone_number, mediaId, visitorName);
        } catch (waErr) {
          console.error("WhatsApp badge error (non-fatal):", waErr);
        }
      })();
    }

    // Send confirmation email to visitor with the actual badge image
    // (hosted on Cloudinary — inline base64 images get stripped by Gmail/Outlook)
    if (visitor.email) {
      const badgeUrl = badgeBuffer ? await uploadBadgeToCloudinary(badgeBuffer, regNo) : null;
      sendEmail({
        to: visitor.email,
        subject: "✅ Registration Confirmed — Fusion The Era 2026",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            ${emailHeader("🎉 Registration Confirmed!", "Thank you for registering for Fusion The Era 2026")}
            <div style="background:#fff;padding:28px 32px;">
              <p style="color:#1a1560;font-size:16px;font-weight:bold;">Dear ${visitor.first_name || "Visitor"},</p>
              <p style="color:#6b7280;font-size:14px;">Your registration is complete. Your visitor badge is below — show the QR code at the entry gate.</p>
              ${badgeUrl ? `<div style="text-align:center;margin:20px 0;"><img src="${badgeUrl}" width="320" alt="Your Visitor Badge" style="max-width:100%;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.1);"/></div>` : `<div style="text-align:center;margin:20px 0;"><img src="${qrCodeDataUrl}" width="200" height="200" alt="QR Code" style="border:4px solid #e5e7eb;border-radius:8px;"/></div>`}
              <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;margin:16px 0;background:#f8f9ff;border-radius:10px;">
                <tr><td style="color:#6b7280;font-size:13px;width:40%;padding-left:16px;">🔑 Login Password</td><td style="color:#1a1560;font-weight:700;font-size:14px;">${password}</td></tr>
              </table>
            </div>
            ${emailFooter()}
          </div>
        `,
      }).catch((err: unknown) => console.error("Visitor email error:", err));
    }

    // Notify visitor service team
    sendEmail({
      to: "pawan.singh@fusiontheera.com, jasvinder.chaudhary@fusiontheera.com, sales.info@fusiontheera.com",
      subject: `🔔 New Visitor Registered — ${visitor.first_name || ""} ${visitor.last_name || ""}`.trim(),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          ${emailHeader("🔔 New Visitor Registered")}
          <div style="background:#fff;padding:28px 32px;">
            <table cellpadding="10" cellspacing="0" width="100%" style="border-collapse:collapse;">
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;width:40%;">🔢 Reg No</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${regNo}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">👤 Name</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.first_name || ""} ${visitor.last_name || ""}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">🏢 Company</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.company || "—"}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">📞 Phone</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.phone_number}</td></tr>
              <tr><td style="color:#6b7280;font-size:13px;">📧 Email</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${visitor.email || "—"}</td></tr>
            </table>
          </div>
          ${emailFooter()}
        </div>
      `,
    }).catch((err: unknown) => console.error("Admin email error:", err));

    return NextResponse.json({ success: true, regNo, qrCode: qrCodeDataUrl });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Submission failed." }, { status: 500 });
  }
}
