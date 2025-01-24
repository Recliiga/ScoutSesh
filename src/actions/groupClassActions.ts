"use server";

import { v4 as uuidv4 } from "uuid";
import { google } from "googleapis";
import connectDB from "@/db/connectDB";
import GroupClass, {
  GroupClassType,
  RepeatFrequencyType,
} from "@/db/models/GroupClass";
import User, { UserType } from "@/db/models/User";
import { getUserIdFromCookies } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { ClassDataType } from "@/components/group-classes/CreateClassForm";

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

function generateRecurrenceRule(
  count: number,
  frequency: RepeatFrequencyType,
): string[] {
  let freq: string;
  let interval: number = 1;

  switch (frequency) {
    case "daily":
      freq = "DAILY";
      break;
    case "weekly":
      freq = "WEEKLY";
      break;
    case "bi-weekly":
      freq = "WEEKLY";
      interval = 2; // Set interval to 2 for bi-weekly
      break;
    case "monthly":
      freq = "MONTHLY";
      break;
    case "yearly":
      freq = "YEARLY";
      break;
    default:
      throw new Error("Invalid frequency type");
  }

  const rule = `RRULE:FREQ=${freq};INTERVAL=${interval};COUNT=${count}`;
  return [rule];
}

function getTimeZone(date: Date) {
  const offsetInMinutes = date.getTimezoneOffset();

  // Convert it to hours and minutes
  const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
  const offsetMinutes = Math.abs(offsetInMinutes) % 60;

  // Determine the sign (UTC+ or UTC-)
  const sign = offsetInMinutes > 0 ? "-" : "+";

  // Format the UTC offset string
  const offsetString = `UTC${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;

  return offsetString;
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
    // Retrieve the user's access and refresh tokens from the database
    const userTokens = await getUserTokensFromDatabase(userId); // Implement this function

    if (!userTokens) {
      throw new Error("User unauthenticated");
    }

    const { access_token, refresh_token } = userTokens;

    // Set up the Google OAuth2 client
    const redirectUrl = `${process.env.BASE_URL}/api/oauth2/callback`;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl,
    );

    oauth2Client.setCredentials({
      access_token: access_token,
      refresh_token: refresh_token,
    });

    // Refresh the access token if needed
    oauth2Client.on("tokens", (tokens) => {
      if (tokens.refresh_token) {
        saveTokensToDatabase(userId, tokens);
      }
    });

    // Set up the Calendar API
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

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

// Mock function to fetch user tokens from the database
async function getUserTokensFromDatabase(userId: string) {
  const user: UserType | null = await User.findById(userId);
  return user?.googleTokens;
}

// Mock function to save updated tokens to the database
async function saveTokensToDatabase(userId: string, tokens: object) {
  await User.findByIdAndUpdate(userId, { googleTokens: tokens });
}
