import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import jwt from "jsonwebtoken";

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

// Block / Unblock
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const { is_blocked } = await req.json();
    await pool.query(`UPDATE visitors SET is_blocked = $1 WHERE id = $2`, [
      is_blocked,
      parseInt(id),
    ]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update visitor." },
      { status: 500 },
    );
  }
}

// Delete
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    await pool.query(`DELETE FROM visitors WHERE id = $1`, [parseInt(id)]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete visitor." },
      { status: 500 },
    );
  }
}
