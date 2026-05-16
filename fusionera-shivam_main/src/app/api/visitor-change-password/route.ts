import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { identifier, oldPassword, newPassword } = await req.json();
    if (!identifier || !oldPassword || !newPassword)
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );

    const result = await pool.query(
      `SELECT * FROM visitors WHERE registration_no=$1 OR email=$1 OR phone_number=$1 LIMIT 1`,
      [identifier],
    );
    const visitor = result.rows[0];
    if (!visitor)
      return NextResponse.json(
        { error: "Visitor not found." },
        { status: 404 },
      );
    if (visitor.is_blocked)
      return NextResponse.json(
        { error: "Account is blocked." },
        { status: 403 },
      );
    if (!visitor.password_hash)
      return NextResponse.json(
        { error: "No password set. Contact support." },
        { status: 400 },
      );

    const valid = await bcrypt.compare(oldPassword, visitor.password_hash);
    if (!valid)
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 401 },
      );

    const newHash = await bcrypt.hash(newPassword, 10);
    await pool.query(`UPDATE visitors SET password_hash=$1 WHERE id=$2`, [
      newHash,
      visitor.id,
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json(
      { error: "Failed to change password." },
      { status: 500 },
    );
  }
}
