import { UserType } from "@/db/models/User";
import { cookies, headers } from "next/headers";

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
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
}

export async function getSessionFromHeaders(): Promise<UserType> {
  const headersList = await headers();
  const userSessionHeader = headersList.get("x-user-session");

  const user = userSessionHeader ? JSON.parse(userSessionHeader) : null;
  return user;
}
