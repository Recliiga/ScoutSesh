import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/authServices";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const { user } = await getSession();

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isCompleteProfileRoute = pathname.startsWith("/complete-profile");
  const isCreateGoalRoute = pathname === "/dashboard/goal-setting/new";
  const isAuthenticated = !!user;
  const userProfileCompleted = !!user?.DOB || !!user?.organization;
  const userIsAthlete = user?.role === "Athlete";

  const response = NextResponse.next();

  // Add user session to headers if the user exists
  if (isAuthenticated) {
    response.headers.set("x-user-session", JSON.stringify(user));
  } else {
    response.headers.delete("x-user-session");
  }

  // Redirect authenticated user from auth routes
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Redirect authenticated users who haven't completed their profile to complete-profile page
  if (isProtectedRoute && isAuthenticated && !userProfileCompleted) {
    const url = new URL("/complete-profile", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect non-athletes from create new goal page
  if (isCreateGoalRoute && isAuthenticated && !userIsAthlete) {
    return NextResponse.redirect(
      new URL("/dashboard/goal-setting", request.url)
    );
  }

  // Redirect authenticated users who have completed their profile to dashboard page
  if (isCompleteProfileRoute && isAuthenticated && userProfileCompleted) {
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Redirect un-authenticated users from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config: MiddlewareConfig = {
  matcher: ["/login", "/signup", "/dashboard/:path*", "/complete-profile"],
};
