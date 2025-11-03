import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const base = process.env.API_BASE || process.env.NEXT_PUBLIC_API_BASE;
  if (!base)
    return NextResponse.json(
      { error: "API_BASE is not configured" },
      { status: 500 }
    );
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || "10";
  const upstreamUrl = `${base}/api/alerts?limit=${encodeURIComponent(limit)}`;
  const res = await fetch(upstreamUrl, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok)
    return NextResponse.json(
      { error: await res.text() },
      { status: res.status }
    );
  return NextResponse.json(await res.json());
}
