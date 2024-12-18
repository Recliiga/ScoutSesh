import NotificationEntry, {
  NotificationEntryType,
} from "@/db/models/NotificationEntry";
import { UserType } from "@/db/models/User";

export async function fetchNotifications(user: UserType | null) {
  try {
    if (!user) return { notifications: [], error: null };

    const notifications: NotificationEntryType[] = await NotificationEntry.find(
      { toUser: user._id },
    )
      .populate({
        path: "fromUser toUser",
        select: "firstName lastName profilePicture",
      })
      .sort({ createdAt: -1 });

    return { notifications, error: null };
  } catch (err) {
    const error = err as Error;
    return { notifications: null, error: error.message };
  }
}
