import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Skip static files, api routes, _next
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".") // static files like .png, .ico, etc.
  ) {
    return NextResponse.next();
  }

  // Redirect root to default locale
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}`, request.url)
    );
  }

  // Redirect non-locale paths to /ko/{path} (old URLs)
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Match all paths except _next/static, _next/image, favicon.ico, and files with extensions
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
