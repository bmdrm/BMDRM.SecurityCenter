import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const base = process.env.API_BASE || process.env.NEXT_PUBLIC_API_BASE;
  if (!base)
    return NextResponse.json(
      { error: "API_BASE is not configured" },
      { status: 500 }
    );

  const body = await req.json().catch(() => ({}));
  const ids: string[] = body?.ids || [];
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "ids array required" }, { status: 400 });
  }

  // Fallback implementation: delete sequentially
  for (const id of ids) {
    const res = await fetch(`${base}/decisions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: await res.text(), failedId: id },
        { status: res.status }
      );
    }
  }
  return NextResponse.json({ success: true, count: ids.length });
}
