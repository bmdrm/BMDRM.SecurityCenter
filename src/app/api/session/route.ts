import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  console.log("[SESSION] Checking session, token exists:", !!token);
  return NextResponse.json({ authenticated: !!token });
}
