import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { visitorId, step, data } = await req.json();
    if (!visitorId || !step)
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });

    const fieldMap: Record<number, string[]> = {
      1: [
        "photo_url",
        "invited_by",
        "title",
        "first_name",
        "middle_name",
        "last_name",
        "designation",
        "company",
        "email",
        "country",
        "business_card_front",
        "business_card_back",
      ],
      2: ["address1", "address2", "city", "state", "pincode"],
      3: ["business_type", "nature_of_business", "annual_turnover"],
      4: ["product_interests"],
      5: ["visit_purpose"],
      6: ["annual_buying"],
      7: ["how_did_you_hear", "additional_notes"],
      8: ["brands_interested"],
    };

    const fields = fieldMap[step];
    if (!fields)
      return NextResponse.json({ error: "Invalid step." }, { status: 400 });

    const updates = fields.filter((f) => data[f] !== undefined);
    if (updates.length === 0) return NextResponse.json({ success: true });

    const setClause = updates.map((f, i) => `${f}=$${i + 2}`).join(", ");
    const values = [visitorId, ...updates.map((f) => data[f])];

    await pool.query(`UPDATE visitors SET ${setClause} WHERE id=$1`, values);

    // Keep full_name in sync whenever first_name or last_name is saved (step 1)
    if (step === 1 && (data.first_name !== undefined || data.last_name !== undefined)) {
      const row = await pool.query(`SELECT first_name, last_name FROM visitors WHERE id=$1`, [visitorId]);
      if (row.rows.length > 0) {
        const fullName = `${row.rows[0].first_name || ""} ${row.rows[0].last_name || ""}`.trim();
        if (fullName) {
          await pool.query(`UPDATE visitors SET full_name=$1 WHERE id=$2`, [fullName, visitorId]);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Save step error:", err);
    return NextResponse.json({ error: "Failed to save." }, { status: 500 });
  }
}
