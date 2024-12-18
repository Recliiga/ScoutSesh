"use server";

import connectDB from "@/db/connectDB";
import { VideoType } from "@/db/models/GroupClass";
import NotificationEntry from "@/db/models/NotificationEntry";
import GroupClassOrder, {
  GroupClassOrderType,
} from "@/db/models/GroupClassOrder";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function purchaseCourse(
  courseId: string,
  price: number,
  coachId: string,
  isLiveClass: boolean,
) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error("Unauthenticated");

    await connectDB();
    await GroupClassOrder.create({ course: courseId, user: userId, price });

    if (isLiveClass) {
      await NotificationEntry.create({
        type: "liveClass",
        fromUser: userId,
        toUser: coachId,
        link: `/dashboard/group-classes/live-classes/${courseId}`,
      });
    } else {
      await NotificationEntry.create({
        type: "videoCourse",
        fromUser: userId,
        toUser: coachId,
        link: `/dashboard/group-classes/courses`,
      });
    }

    redirectUrl = isLiveClass
      ? `/dashboard/group-classes/live-classes/${courseId}`
      : "/dashboard/group-classes/my-classes";
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

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
