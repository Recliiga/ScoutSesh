import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/authServices";

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const { user } = await getSession();
  if (pathname === "/app") {
    if (user) {
      if (!user.DOB) {
        return NextResponse.redirect(new URL("/complete-profile", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (pathname === "/login" || pathname === "/signup") {
    if (user) return NextResponse.redirect(new URL("/app", request.url));
  } else if (pathname === "/complete-profile") {
    if (user) {
      if (user?.DOB) return NextResponse.redirect(new URL("/app", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/login", "/signup", "/app", "/complete-profile"],
};
