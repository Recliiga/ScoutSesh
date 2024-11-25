import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/authServices";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const { user } = await getSession();

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isInviteRoute = pathname.startsWith("/invite");
  const isCompleteProfileRoute = pathname.startsWith("/complete-profile");
  const isCreateOrganizationRoute = pathname.startsWith("/create-organization");
  const isCreateGoalRoute = pathname === "/dashboard/goal-setting/new";
  const isAuthenticated = Boolean(user);
  const userIsAthlete = user?.role === "Athlete";
  const userIsHeadCoach = user?.role === "Head Coach";
  const userProfileCompleted = Boolean(user?.DOB);
  const coachProfileCompleted = userIsHeadCoach && Boolean(user?.organization);

  const response = NextResponse.next();

  // Add user session to headers if the user exists
  if (isAuthenticated) {
    response.headers.set("x-user-session", JSON.stringify(user));
  } else {
    response.headers.delete("x-user-session");
  }

  // Redirect unauthenticated user from invitation route
  if (isInviteRoute && !isAuthenticated) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect Head Coach from invitation route
  if (isInviteRoute && isAuthenticated && userIsHeadCoach) {
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated user from auth routes
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Redirect authenticated users who haven't completed their profile or created their organization to complete-profile page or create-organiation page
  if (isProtectedRoute && isAuthenticated) {
    if (!userProfileCompleted) {
      const url = new URL("/complete-profile", request.url);
      if (pathname !== "/dashboard") url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    } else if (!userIsAthlete && !coachProfileCompleted) {
      const url = new URL("/create-organization", request.url);
      if (pathname !== "/dashboard") url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect non-athletes from create new goal page
  if (isCreateGoalRoute && isAuthenticated && !userIsAthlete) {
    return NextResponse.redirect(
      new URL("/dashboard/goal-setting", request.url)
    );
  }

  // Redirect un-authenticated users from protected routes
  if (
    (isProtectedRoute || isCompleteProfileRoute || isCreateOrganizationRoute) &&
    !isAuthenticated
  ) {
    const url = new URL("/login", request.url);
    if (
      !Boolean(pathname === "/dashboard") &&
      !isCompleteProfileRoute &&
      !isCreateOrganizationRoute
    )
      url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users who have not completed their profile to create organization page or dashboard page depending on user role
  if (isCompleteProfileRoute && isAuthenticated && userProfileCompleted) {
    if (userIsHeadCoach) {
      return NextResponse.redirect(
        new URL("/create-organization", request.url)
      );
    } else {
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  // Redirect authenticated coaches who have not created their organization to create profile page or dashboard page depending on user role
  if (isCreateOrganizationRoute && isAuthenticated) {
    if (userProfileCompleted) {
      if (userIsAthlete || coachProfileCompleted) {
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/complete-profile", request.url));
    }
  }

  return response;
}

export const config: MiddlewareConfig = {
  matcher: [
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/invite/:path*",
    "/complete-profile",
    "/create-organization",
  ],
};
