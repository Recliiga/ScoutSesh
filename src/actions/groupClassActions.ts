"use server";

import connectDB from "@/db/connectDB";
import GroupClass, { RepeatFrequencyType } from "@/db/models/GroupClass";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ClassDataVideoType = {
  title: string;
  duration: number;
  url: string;
};

type ClassDataType = {
  title: string;
  description: string;
  thumbnail: string;
  coaches: string[];
  courseType?: "live" | "video";
  startDate?: Date;
  endDate?: Date;
  startTime: { hours: string; mins: string };
  duration: number;
  customDuration: number;
  isRecurring: boolean;
  repeatFrequency?: RepeatFrequencyType;
  totalSpots: number;
  skillLevels: string[];
  videos: ClassDataVideoType[];
  price: number;
};

export async function createClass(classData: ClassDataType) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    await connectDB();
    await GroupClass.create({ ...classData, user: userId });
    redirectUrl = "/dashboard/group-classes/courses";
  } catch (error) {
    return { error: (error as Error).message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

export async function updateClass(
  groupClassId: string,
  classData: ClassDataType & { user: { _id: string } }
) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    if (classData.user._id !== userId) throw new Error("Unauthorized!");

    await connectDB();
    const updatedGroupClass = await GroupClass.findByIdAndUpdate(groupClassId, {
      ...classData,
      user: userId,
    });
    if (!updatedGroupClass) throw new Error("An error occured updating course");
    redirectUrl = "/dashboard/group-classes/courses";
  } catch (error) {
    return { error: (error as Error).message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}
