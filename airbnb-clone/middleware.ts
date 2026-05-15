import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

const PROTECTED_PREFIXES = ["/profile", "/bookings", "/checkout"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Esta capa corta el acceso temprano para no renderizar páginas privadas sin sesión.
  const needsAuth = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!needsAuth) {
    return NextResponse.next();
  }

  const hasSessionCookie = Boolean(
    request.cookies.get(SESSION_COOKIE_NAME)?.value,
  );

  if (hasSessionCookie) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  // Guardamos destino original para redirigir al usuario luego del login.
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/profile/:path*", "/bookings/:path*", "/checkout/:path*"],
};
