"use server";

import { signToken } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function loginAdmin(email: string, password: string) {
  const cookieStore = await cookies();

  try {
    if (!email) return { error: "Please enter a valid Email" };
    if (!password) return { error: "Please enter your Password" };

    if (
      !(
        email === "admin@scoutsesh.com" &&
        password == process.env.ADMIN_PASSWORD
      )
    )
      return { error: "Invalid email and password combination" };

    const { token, error } = signToken({ isAuthenticated: true });
    if (error !== null) throw new Error(error);

    cookieStore.set("adminToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return { error: null };
  } catch (error) {
    console.log("Admin Login Error: ", (error as Error).message);
    return { error: "An unexpected error occured" };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("adminToken");
  revalidatePath("/admin", "layout");
}
