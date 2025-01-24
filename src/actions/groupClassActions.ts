"use server";

import { v4 as uuidv4 } from "uuid";
import connectDB from "@/db/connectDB";
import GroupClass, {
  GroupClassType,
  RepeatFrequencyType,
} from "@/db/models/GroupClass";
import {
  generateRecurrenceRule,
  getTimeZone,
  getUserIdFromCookies,
} from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { ClassDataType } from "@/components/group-classes/CreateClassForm";
import { getCalendarAPI } from "@/lib/getCalendarAPI";

export async function createClass(
  classData: Partial<Omit<GroupClassType, "coaches"> & { coaches: string[] }>,
) {
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
    if (groupClass.meetingData?.id) {
      const { calendar, error } = await getCalendarAPI(
        groupClass.coaches[0]._id,
      );
      if (error !== null) throw new Error(error);

      await calendar.events.delete({
        eventId: groupClass.meetingData.id,
        calendarId: "primary",
      });
    }

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
  } catch (err) {
    const error = err as Error;
    console.log("Error deleting group class: ", error.message);
    return { error: "An error occured deleting group class" };
  }
}

type MeetingDetailsType = {
  userId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  repeatFrequency?: RepeatFrequencyType;
  repeatCount?: number;
};

export async function scheduleMeeting(meetingDetails: MeetingDetailsType) {
  try {
    const {
      userId,
      title,
      description,
      startTime,
      endTime,
      repeatCount,
      repeatFrequency,
    } = meetingDetails;

    const { calendar, error } = await getCalendarAPI(userId);
    if (error !== null) throw new Error(error);

    // Add the event to the calendar
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: title || "Live Class",
        description: description || "Scoutsesh Live Class",
        start: {
          dateTime: startTime.toISOString(),
          timeZone: getTimeZone(startTime),
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: getTimeZone(endTime),
        },
        recurrence:
          repeatCount && repeatFrequency
            ? generateRecurrenceRule(repeatCount, repeatFrequency)
            : undefined,
        conferenceData: {
          createRequest: {
            requestId: uuidv4(),
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
      conferenceDataVersion: 1,
    });

    return { event: response.data, error: null };
  } catch (err) {
    const error = err as Error;
    console.error("Error scheduling meeting:", error.message);
    return { event: null, error: "Error scheduling meeting" };
  }
}
