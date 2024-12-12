"use server";
import connectDB from "@/db/connectDB";
import User from "@/db/models/User";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function joinTeam(organizationId: string) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error("User is unauthenticated");

    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(userId, {
      organization: organizationId,
    });
    if (!updatedUser) throw new Error("An error occured while joining team");

    redirectUrl = "/dashboard";
  } catch (err) {
    return { error: (err as Error).message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}
