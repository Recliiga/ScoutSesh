import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/authServices";

export async function middleware(request: NextRequest) {
  const { user } = await getSession();
  console.log("User from Middleware", user);

  if (user) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config: MiddlewareConfig = { matcher: ["/login", "/signup"] };
