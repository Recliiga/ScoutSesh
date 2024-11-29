"use server";

import connectDB from "@/db/connectDB";
import GroupClass, { RepeatFrequencyType } from "@/db/models/GroupClass";
import { getUserIdFromCookies, uploadImage, uploadVideo } from "@/lib/utils";
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
  duration: string;
  customDuration: string;
  isRecurring: boolean;
  repeatFrequency?: RepeatFrequencyType;
  totalSpots: string;
  skillLevels: string[];
  videos: ClassDataVideoType[];
  price: string;
};

export async function createClass(classData: ClassDataType) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    if (!classData.thumbnail) throw new Error("Please select a thumbnail");

    // Upload thumbnail
    const { url, error: uploadThumbnailError } = await uploadImage(
      classData.thumbnail
    );
    if (uploadThumbnailError !== null) throw new Error(uploadThumbnailError);
    classData.thumbnail = url;

    // Upload videos
    classData.videos = await Promise.all(
      classData.videos.map(async (video) => {
        const { url, error: uploadVideoError } = await uploadVideo(video.url);
        if (uploadVideoError !== null) throw new Error(uploadVideoError);
        return { ...video, url };
      })
    );

    await connectDB();
    await GroupClass.create({ ...classData, user: userId });
    redirectUrl = "/dashboard/group-classes/courses";
  } catch (error) {
    return { error: (error as Error).message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

export async function updateClass(classData: ClassDataType) {
  return { newGroupClass: classData, error: "asdfa" };
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    if (!classData.thumbnail) throw new Error("Please select a thumbnail");

    // Upload thumbnail
    const { url, error: uploadThumbnailError } = await uploadImage(
      classData.thumbnail
    );
    if (uploadThumbnailError !== null) throw new Error(uploadThumbnailError);
    classData.thumbnail = url;

    // Upload videos
    classData.videos = await Promise.all(
      classData.videos.map(async (video) => {
        const { url, error: uploadVideoError } = await uploadVideo(video.url);
        if (uploadVideoError !== null) throw new Error(uploadVideoError);
        return { ...video, url };
      })
    );

    await connectDB();
    await GroupClass.create({ ...classData, user: userId });
    redirectUrl = "/dashboard/group-classes/courses";
  } catch (error) {
    return { error: (error as Error).message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}
