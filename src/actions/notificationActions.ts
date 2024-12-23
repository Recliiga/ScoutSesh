"use server";

import connectDB from "@/db/connectDB";
import NotificationEntry from "@/db/models/NotificationEntry";
import { revalidatePath } from "next/cache";

export async function markNotificationsAsRead(userId: string) {
  try {
    await connectDB();
    await NotificationEntry.updateMany({ toUser: userId }, { read: true });
    revalidatePath("/", "layout");
    return { error: null };
  } catch (error) {
    console.log("Mark as read error: ", (error as Error).message);
    return { error: "An unexpected error occured" };
  }
}
