import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth_token")?.value;
  const allCookies = req.cookies.getAll();

  // Temporary debug logging for production
  console.log("[MIDDLEWARE]", {
    pathname,
    hasToken: !!token,
    tokenLength: token?.length || 0,
    allCookies: allCookies.map((c) => c.name),
    url: req.url,
  });

  // Allow public paths
  const publicPaths = [
    "/login",
    "/_next",
    "/favicon.ico",
    "/api/login",
    "/api/logout",
    "/api/session",
    "/api/debug",
  ];
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    // If already authenticated and trying to visit login, redirect to dashboard
    if (pathname === "/login" && token) {
      const url = req.nextUrl.clone();
      const next = url.searchParams.get("next") || "/alerts";
      url.pathname = next;
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Protect all other routes (dashboard routes)
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/login).*)"],
};
