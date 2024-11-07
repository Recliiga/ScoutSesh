import { cookies } from "next/headers";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const res = await fetch("http://localhost:3000/api/auth/session", {
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
