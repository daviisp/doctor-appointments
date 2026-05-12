import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { auth as authMiddleware } from "@/auth";

export default authMiddleware((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.auth && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/painel", req.url));
  }

  if (req.auth && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/painel", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png).*)"],
};
