"use server";

import connectDB from "@/db/connectDB";
import GroupClass, { RepeatFrequencyType } from "@/db/models/GroupClass";
import { getUserIdFromCookies, uploadImage, uploadVideo } from "@/lib/utils";
import { cookies } from "next/headers";

// type ClassDataType = {
//   title: string;
//   description: string;
//   thumbnail: string;
//   coaches: string[];
//   courseType?: string;
//   startDate?: Date;
//   endDate?: Date;
//   startTime: { hours: string; mins: string };
//   duration?: string;
//   isRecurring?: boolean;
//   totalSpots?: string;
//   skillLevels: string[];
//   videos?: string[];
//   price: string;
// };

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
  videos: {
    title: string;
    duration: number;
    url: string;
  }[];
  price: string;
};

export async function createClass(classData: ClassDataType) {
  try {
    // return { newGroupClass: classData, error: "null" };

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
    classData.videos.map(async (video) => {
      const { url, error: uploadVideoError } = await uploadVideo(video.url);
      if (uploadVideoError !== null) throw new Error(uploadVideoError);
      return { ...video, url };
    });

    await connectDB();
    const newGroupClass = JSON.parse(
      JSON.stringify(await GroupClass.create({ ...classData, user: userId }))
    );
    return { newGroupClass, error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
