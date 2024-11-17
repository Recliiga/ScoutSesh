import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/authServices";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const { user } = await getSession();

  if (pathname === "/dashboard/goal-setting/new") {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    } else if (user.role !== "Athlete")
      return NextResponse.redirect(
        new URL("/dashboard/goal-setting", request.url)
      );
  } else if (pathname.startsWith("/dashboard")) {
    if (user) {
      if (!user.DOB && !user.organization) {
        return NextResponse.redirect(
          new URL(`/complete-profile?redirect=${pathname}`, request.url)
        );
      }
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  } else if (pathname === "/login" || pathname === "/signup") {
    if (user) return NextResponse.redirect(new URL(redirectUrl, request.url));
  } else if (pathname === "/complete-profile") {
    if (user) {
      if (user?.DOB || user.organization)
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/login", "/signup", "/dashboard/:path*", "/complete-profile"],
};
