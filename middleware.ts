import NextAuth from "next-auth";

import { authConfig } from "@lib/auth.config";
import { AUTH_REDIRECT, PUBLIC_ROUTES, ROOT } from "@lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  // robots.txt & sitemap.xml
  if (
    nextUrl.pathname === "/robots.txt" ||
    nextUrl.pathname === "/sitemap.xml"
  ) {
    return;
  }

  if (isPublicRoute && isAuthenticated) {
    return Response.redirect(new URL(AUTH_REDIRECT, nextUrl));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
