import connectDB from "@/db/connectDB";
import NotificationEntry, {
  NotificationEntryType,
} from "@/db/models/NotificationEntry";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function fetchNotifications() {
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) return { notifications: [], error: null };

    await connectDB();

    const notifications: NotificationEntryType[] = JSON.parse(
      JSON.stringify(
        await NotificationEntry.find({
          toUser: userId,
        })
          .populate({
            path: "fromUser toUser",
            select: "firstName lastName profilePicture",
          })
          .sort({ createdAt: -1 }),
      ),
    );

    return { notifications, error: null };
  } catch (err) {
    const error = err as Error;
    return { notifications: null, error: error.message };
  }
}
