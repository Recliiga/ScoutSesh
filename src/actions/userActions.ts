"use server";
import connectDB from "@/db/connectDB";
import User from "@/db/models/User";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function joinTeam(organizationId: string) {
  try {
    const cookieStore = await cookies();
    const userId = getUserIdFromCookies(cookieStore);

    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(userId, {
      organization: organizationId,
    });
    if (!updatedUser) throw new Error("An error occured while joining team");

    return { error: null };
  } catch (err) {
    return { error: (err as Error).message };
  }
}
