import { UserType } from "@/db/models/User";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";

export async function getSession(): Promise<
  | {
      user: UserType;
      error: null;
    }
  | {
      user: null;
      error: string;
    }
> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const BASE_URL = process.env.BASE_URL;

    const res = await fetch(`${BASE_URL}/api/auth/session`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { user, error } = await res.json();

    return { user, error };
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    return { user: null, error: error.message };
  }
}

export async function getSessionFromHeaders(): Promise<UserType> {
  const headersList = await headers();
  const userSessionHeader = headersList.get("x-user-session");

  const user = userSessionHeader ? JSON.parse(userSessionHeader) : null;
  return user;
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("adminToken")?.value;
    if (!token) throw new Error("Invalid token");
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") throw new Error("Invalid token");

    const isAuthenticated: true | undefined = payload.isAuthenticated;

    return { isAuthenticated: isAuthenticated || false, error: null };
  } catch (error) {
    return { isAuthenticated: false, error: (error as Error).message };
  }
}
