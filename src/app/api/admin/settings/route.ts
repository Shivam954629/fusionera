import { NextRequest, NextResponse } from "next/server";
import { pool, initDB } from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_change_this";

function verifyToken(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; username: string };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await initDB();
  const res = await pool.query(`SELECT key, value FROM site_settings ORDER BY key`);
  const settings: Record<string, string> = {};
  for (const row of res.rows) settings[row.key] = row.value;
  return NextResponse.json({ success: true, settings });
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await initDB();
  const body = await req.json();
  const { settings } = body as { settings: Record<string, string> };

  for (const [key, value] of Object.entries(settings)) {
    await pool.query(
      `INSERT INTO site_settings (key, value, updated_at) VALUES ($1, $2, NOW())
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
      [key, value],
    );
  }
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const user = verifyToken(req);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword)
    return NextResponse.json({ error: "Current and new password required." }, { status: 400 });
  if (newPassword.length < 8)
    return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });

  const adminRes = await pool.query(`SELECT * FROM admins WHERE id = $1`, [user.id]);
  if (!adminRes.rows[0])
    return NextResponse.json({ error: "Admin not found." }, { status: 404 });

  const valid = await bcrypt.compare(currentPassword, adminRes.rows[0].password_hash);
  if (!valid)
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });

  const hash = await bcrypt.hash(newPassword, 10);
  await pool.query(`UPDATE admins SET password_hash = $1 WHERE id = $2`, [hash, user.id]);
  return NextResponse.json({ success: true, message: "Password changed successfully." });
}
