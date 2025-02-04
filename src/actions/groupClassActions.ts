"use server";

import connectDB from "@/db/connectDB";
import GroupClass, {
  GroupClassType,
  MeetingType,
  RepeatFrequencyType,
} from "@/db/models/GroupClass";
import User from "@/db/models/User";
import { getUserIdFromCookies } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

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
  meetings?: MeetingType[];
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
    if (redirectUrl) redirect(redirectUrl, RedirectType.replace);
  }
}

export async function updateClass(
  groupClassId: string,
  classData: ClassDataType & { user: { _id: string } },
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
    if (redirectUrl) redirect(redirectUrl, RedirectType.replace);
  }
}

export async function deleteClass(groupClass: GroupClassType) {
  try {
    const cookieStore = await cookies();
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    if (groupClass.user._id !== userId) throw new Error("Unauthorized!");

    await connectDB();
    const deletedGroupClass = await GroupClass.findByIdAndDelete(
      groupClass._id,
    );
    if (!deletedGroupClass) throw new Error("An error occured deleting course");
    revalidatePath("/dashboard/group-classes/courses");
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  } finally {
  }
}

export async function scheduleMeeting(
  title: string,
  startTime: { hours: string; mins: string },
  durationInMinutes: number,
  dates: Date[],
  refreshToken: string,
  userId: string,
): Promise<
  { data: MeetingType[]; error: null } | { data: null; error: string }
> {
  try {
    const clientId = process.env.ZOOM_CLIENT_ID;
    const clientSecret = process.env.ZOOM_CLIENT_SECRET;

    // Get access token
    const tokenUrl = "https://zoom.us/oauth/token";

    const tokenHeaders = new Headers({
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    });

    const tokenBody = new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: tokenHeaders,
      body: tokenBody,
    });
    const tokenData = await tokenResponse.json();

    //Save refresh token to user database
    const updatedUser = await User.findByIdAndUpdate(userId, {
      zoomRefreshToken: tokenData.refresh_token,
    });
    if (!updatedUser)
      throw new Error("An error occured saving new refresh token to database");

    // Schedule meeting
    const url = "https://api.zoom.us/v2/users/me/meetings";

    const headers = new Headers({
      Authorization: `Bearer ${tokenData.access_token}`,
      "Content-Type": "application/json",
    });

    const meetings = await Promise.all(
      dates.map(async (date) => {
        const classStartTime = new Date(date);
        classStartTime.setHours(Number(startTime.hours));
        classStartTime.setMinutes(Number(startTime.mins));
        const body = JSON.stringify({
          topic: title,
          start_time: classStartTime,
          duration: durationInMinutes,
        });
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: body,
        });
        const data: MeetingType = await response.json();
        return data;
      }),
    );

    return { data: meetings, error: null };
  } catch (error) {
    console.log("Error scheduling meeting: ", (error as Error).message);
    return { data: null, error: "Error scheduling meeting" };
  }
}
