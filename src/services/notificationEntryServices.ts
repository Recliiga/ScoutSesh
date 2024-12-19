import connectDB from "@/db/connectDB";
import NotificationEntry, {
  NotificationEntryType,
} from "@/db/models/NotificationEntry";

export async function fetchNotifications(userId?: string) {
  try {
    if (!userId) {
      return { notifications: [], error: null };
    }

    await connectDB();
    const notifications: NotificationEntryType[] = JSON.parse(
      JSON.stringify(
        await NotificationEntry.find({ toUser: userId })
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
    console.log("Fetch Notification Error: ", error.message);
    return { notifications: null, error: error.message };
  }
}
