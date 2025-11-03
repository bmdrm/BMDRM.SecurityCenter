import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const base = process.env.API_BASE || process.env.NEXT_PUBLIC_API_BASE;
  if (!base) {
    return NextResponse.json(
      { error: "API_BASE is not configured" },
      { status: 500 }
    );
  }
  const res = await fetch(`${base}/api/decisions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
