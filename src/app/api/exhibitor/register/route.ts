import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { sendEmail, emailHeader, emailFooter } from "@/lib/email";

async function initTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS exhibitor_registrations (
      id SERIAL PRIMARY KEY,
      company_name VARCHAR(255),
      contact_name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      city VARCHAR(100),
      product_category VARCHAR(500),
      stall_type VARCHAR(100),
      message TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export async function POST(req: NextRequest) {
  try {
    await initTable();
    const body = await req.json();

    const {
      exhibitorType,
      participationMode,
      companyName,
      boothArea,
      boothType,
      brands,
      productCategories,
      orgHead,
      contactPerson,
    } = body;

    if (!companyName || !contactPerson?.email) {
      return NextResponse.json(
        { error: "Company name and contact email are required." },
        { status: 400 },
      );
    }

    const contactName = `${contactPerson.firstName || ""} ${contactPerson.lastName || ""}`.trim();
    const phone = `${contactPerson.countryCode || ""}${contactPerson.mobile || ""}`.trim();
    const productCategoryStr = Array.isArray(productCategories)
      ? productCategories.join(", ")
      : productCategories || "";

    // Store all form details as JSON in message field for admin reference
    const message = JSON.stringify({
      exhibitorType,
      participationMode,
      boothArea,
      orgHead,
      brands,
      contactPerson,
    });

    await pool.query(
      `INSERT INTO exhibitor_registrations
        (company_name, contact_name, email, phone, city, product_category, stall_type, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        companyName,
        contactName,
        contactPerson.email,
        phone,
        contactPerson.city || "",
        productCategoryStr,
        boothType || "",
        message,
      ],
    );

    // Notify admin via email
    sendEmail({
      to: "pawan.singh@fusiontheera.com, jasvinder.chaudhary@fusiontheera.com, sales.info@fusiontheera.com",
      subject: `🏢 New Exhibitor Registration — ${companyName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          ${emailHeader("🏢 New Exhibitor Registration")}
          <div style="background:#fff;padding:28px 32px;">
            <table cellpadding="8" cellspacing="0" width="100%" style="border-collapse:collapse;">
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;width:40%;">Company</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${companyName}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">Contact</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${contactName}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">Email</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${contactPerson.email}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">Phone</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${phone}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">City</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${contactPerson.city || "—"}</td></tr>
              <tr style="border-bottom:1px solid #f0f0f0;"><td style="color:#6b7280;font-size:13px;">Type</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${exhibitorType} · ${boothType || "—"}</td></tr>
              <tr><td style="color:#6b7280;font-size:13px;">Categories</td><td style="color:#1a1560;font-weight:600;font-size:13px;">${productCategoryStr || "—"}</td></tr>
            </table>
          </div>
          ${emailFooter()}
        </div>
      `,
    }).catch((err: unknown) => console.error("Email error:", err));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Exhibitor register error:", err?.message || err);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }
}
