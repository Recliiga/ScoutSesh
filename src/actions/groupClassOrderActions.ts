"use server";

import connectDB from "@/db/connectDB";
import { VideoType } from "@/db/models/GroupClass";
import GroupClassOrder, {
  GroupClassOrderType,
} from "@/db/models/GroupClassOrder";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function addVideoToCompletedLessons(
  courseId: string,
  video: VideoType,
) {
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error("Unauthenticated");

    await connectDB();
    const updatedOrder: GroupClassOrderType | null =
      await GroupClassOrder.findOne({
        course: courseId,
        user: userId,
      });

    if (!updatedOrder)
      throw new Error("Error: Unable to update completed lessons");

    if (
      !updatedOrder.completedLessons.some((lesson) => lesson.url === video.url)
    ) {
      updatedOrder.completedLessons.push(video);
      await updatedOrder.save();
    }

    return { error: null };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
}
