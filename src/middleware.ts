import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/authServices";

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const { user } = await getSession();

  // Routes
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password");
  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isVerifyEmailRoute = pathname.startsWith("/verify-email");
  const isInviteRoute = pathname.startsWith("/invite");
  const isCompleteProfileRoute = pathname.startsWith("/complete-profile");
  const isCreateOrganizationRoute = pathname.startsWith("/create-organization");
  const isCreateGoalRoute = pathname === "/dashboard/goal-setting/new";

  // Conditions
  const isAuthenticated = Boolean(user);
  const userIsAthlete = user?.role === "Athlete";
  const userIsHeadCoach = user?.role === "Head Coach";
  const userProfileCompleted = Boolean(user?.profileCompleted);
  const userEmailVerified = Boolean(user?.emailVerified);
  const coachProfileCompleted = userIsHeadCoach && Boolean(user?.organization);

  const response = NextResponse.next();

  function redirectTo(path: string, addRedirect = true) {
    const url = new URL(path, request.url);
    if (pathname !== "/dashboard" && addRedirect) {
      url.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(url);
  }

  // Add user session to headers if the user exists
  if (isAuthenticated) {
    response.headers.set(
      "x-user-session",
      JSON.stringify(user).replace(/[^\x20-\x7E]/g, ""),
    );
  } else {
    response.headers.delete("x-user-session");
  }

  // Redirect authenticated user from auth routes
  if (isAuthRoute && isAuthenticated) {
    return redirectTo(redirectUrl, false);
  }

  // Redirect authenticated user from verify email route
  if (isVerifyEmailRoute) {
    if (isAuthenticated) {
      if (userEmailVerified) {
        return redirectTo(redirectUrl, false);
      }
    } else {
      return redirectTo("/login", false);
    }
  }

  // Redirect un-authenticated users or users who haven't completed their profile or created their organization from protected routes
  if (isProtectedRoute) {
    if (isAuthenticated) {
      if (!userEmailVerified) {
        return redirectTo("/verify-email");
      } else if (!userProfileCompleted) {
        return redirectTo("/complete-profile");
      } else if (!userIsAthlete && !coachProfileCompleted) {
        return redirectTo("/create-organization");
      }
    } else {
      return redirectTo("/login");
    }
  }

  // Redirect authenticated users who have not completed their profile to create organization page or dashboard page depending on user role
  if (isCompleteProfileRoute) {
    if (isAuthenticated) {
      if (!userEmailVerified) {
        return redirectTo("/verify-email", false);
      } else if (userProfileCompleted) {
        if (userIsHeadCoach) {
          return redirectTo("/create-organization", false);
        } else {
          return redirectTo(redirectUrl, false);
        }
      }
    } else {
      return redirectTo("/login");
    }
  }

  // Redirect authenticated coaches who have not created their organization to create profile page or dashboard page depending on user role
  if (isCreateOrganizationRoute) {
    if (isAuthenticated) {
      if (!userEmailVerified) {
        return redirectTo("/verify-email", false);
      } else if (userProfileCompleted) {
        if (userIsAthlete || coachProfileCompleted) {
          return redirectTo(redirectUrl, false);
        }
      } else {
        return redirectTo("/complete-profile", false);
      }
    } else {
      return redirectTo("/login");
    }
  }

  // Redirect unauthenticated users and head coaches from invitation route
  if (isInviteRoute) {
    if (!isAuthenticated) {
      return redirectTo("/login");
    } else {
      if (userIsHeadCoach) {
        return redirectTo("/dashboard", false);
      }
    }
  }

  // Redirect non-athletes from create new goal page
  if (isCreateGoalRoute && isAuthenticated && !userIsAthlete) {
    return redirectTo("/dashboard/goal-setting", false);
  }

  return response;
}

// export const config: MiddlewareConfig = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };

export const config: MiddlewareConfig = {
  matcher: [
    "/login",
    "/signup",
    "/forgot-password",
    "/dashboard/:path*",
    "/verify-email",
    "/invite/:path*",
    "/complete-profile",
    "/create-organization",
  ],
};
