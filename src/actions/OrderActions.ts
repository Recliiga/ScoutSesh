"use server";

import connectDB from "@/db/connectDB";
import { VideoType } from "@/db/models/GroupClass";
import Order, { OrderType } from "@/db/models/Order";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function purchaseCourse(courseId: string) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error("Unauthenticated");

    await connectDB();
    await Order.create({ course: courseId, user: userId });

    redirectUrl = "/dashboard/group-classes/my-classes";
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

export async function addVideoToCompletedLessons(
  courseId: string,
  video: VideoType
) {
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error("Unauthenticated");

    await connectDB();
    const updatedOrder: OrderType | null = await Order.findOne({
      course: courseId,
      user: userId,
    });

    if (!updatedOrder)
      throw new Error("Error: Unable to update completed lessons");

    if (
      !updatedOrder.completedLessons.some((lesson) => lesson.url === video.url)
    ) {
      console.log(video);
      updatedOrder.completedLessons.push(video);
      console.log("updatedCompletedLessons");
      await updatedOrder.save();
    }

    return { error: null };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
}
