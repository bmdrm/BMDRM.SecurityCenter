/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, twoFactorCode, twoFactorRecoveryCode } =
      body || {};

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const base = process.env.API_BASE || process.env.NEXT_PUBLIC_API_BASE;
    const loginPath = process.env.API_LOGIN_PATH || "/login";

    if (!base) {
      return NextResponse.json(
        { error: "API_BASE is not configured" },
        { status: 500 }
      );
    }

    // Forward login request to upstream API
    const upstream = await fetch(`${base}${loginPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        twoFactorCode,
        twoFactorRecoveryCode,
      }),
    });

    const text = await upstream.text();
    let data = {};
    try {
      data = JSON.parse(text);
    } catch {}

    if (!upstream.ok) {
      return NextResponse.json(
        {
          error: (data && (data as any).error) || text || "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const token = (data as any)?.accessToken;
    if (!token) {
      return NextResponse.json(
        { error: "No accessToken returned from API" },
        { status: 502 }
      );
    }

    console.log("[LOGIN] Setting cookie, token length:", token.length);
    console.log("[LOGIN] NODE_ENV:", process.env.NODE_ENV);

    // Set authentication cookie
    const cookieStore = await cookies();

    // Only use secure flag if actually on HTTPS
    // Check if request is from HTTPS
    const isHttps =
      req.headers.get("x-forwarded-proto") === "https" ||
      req.url.startsWith("https://");

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      path: "/",
      secure: isHttps, // Only secure if HTTPS
      maxAge: 60 * 60 * 24 * 7, // 7 days
    };

    console.log("[LOGIN] Cookie options:", cookieOptions);
    cookieStore.set("auth_token", token, cookieOptions);
    console.log("[LOGIN] Cookie set successfully");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[LOGIN] Error:", err);
    return NextResponse.json(
      { error: (err as Error)?.message || "Login failed" },
      { status: 500 }
    );
  }
}
