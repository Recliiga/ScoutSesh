"use server";

import connectDB from "@/db/connectDB";
import NotificationEntry from "@/db/models/NotificationEntry";
import { getUserIdFromCookies } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function markAllNotificationAsRead() {
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) return { error: "User unauthenticated" };

    await connectDB();
    await NotificationEntry.updateMany({ toUser: userId }, { read: true });

    revalidatePath("/", "layout");
    return { error: null };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
}
