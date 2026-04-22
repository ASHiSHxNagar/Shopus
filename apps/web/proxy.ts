import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = new Set(["/", "/auth/login", "/auth/register", "/home"]);

function normalizePath(pathname: string): string {
  const lower = pathname.toLowerCase();
  if (lower.length > 1 && lower.endsWith("/")) {
    return lower.slice(0, -1);
  }
  return lower;
}

export async function proxy(request: NextRequest) {
  const normalizedPath = normalizePath(request.nextUrl.pathname);

  if (PUBLIC_ROUTES.has(normalizedPath)) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secureCookie: request.nextUrl.protocol === "https:",
  });

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};