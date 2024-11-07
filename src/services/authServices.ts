import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(`${BASE_URL}/api/auth/session`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (data.error) {
      return { user: null, error: data.error };
    } else {
      return { user: data, error: null };
    }
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
}
