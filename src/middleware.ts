import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/authServices";

export async function middleware(request: NextRequest) {
  const { user } = await getSession();
  if (user) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config: MiddlewareConfig = { matcher: ["/auth"] };
