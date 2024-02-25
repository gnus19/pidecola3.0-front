import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/services/checkSession";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("auth_token");
  const isValidSession = await checkSession(authCookie);

  // Si un usuario tiene una sesión válida, no tiene que entrar en login o register
  if (
    pathname === "/" ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/login")
  )
    if (isValidSession)
      return NextResponse.redirect(new URL("/profile", request.url));

  // Si un usuario no tiene una sesión válida tiene que registrarse
  if (pathname.startsWith("/profile")) {
    if (!isValidSession)
      return NextResponse.redirect(new URL("/login", request.url));
  }
}
