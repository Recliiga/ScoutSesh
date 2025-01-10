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

/*
{
  uuid: 'Vvb6VXi6RE66xLKzE/IFcg==',
  id: 83459750981,
  host_id: 'K2JYrpvqQW6zukvcME7LMw',
  host_email: 'greatochuko123@gmail.com',
  topic: 'Live class 2',
  type: 2,
  status: 'waiting',
  start_time: '2025-01-16T17:00:00Z',
  duration: 30,
  timezone: 'America/Los_Angeles',
  created_at: '2025-01-10T01:28:16Z',
  start_url: 'https://us05web.zoom.us/s/83459750981?zak=eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJ3ZWIiLCJjbHQiOjAsIm1udW0iOiI4MzQ1OTc1MDk4MSIsImF1ZCI6ImNsaWVudHNtIiwidWlkIjoiSzJKWXJwdnFRVzZ6dWt2Y01FN0xNdyIsInppZCI6IjRkMzRlZTdkMDMxZTRlNGQ5NTQzNTVmNGJhMWI3MjIxIiwic2siOiIwIiwic3R5IjoxLCJ3Y2QiOiJ1czA1IiwiZXhwIjoxNzM2NDc5Njk2LCJpYXQiOjE3MzY0NzI0OTYsImFpZCI6ImJFWlBOV3A0VEhxaUo4aDlRR0djalEiLCJjaWQiOiIifQ.6pUQIFhKqsEEK0DIqbsHVtUKxFlLmXLcXTJktlSBHMQ',
  join_url: 'https://us05web.zoom.us/j/83459750981?pwd=CTydODDYJcHQBCGNJpfk5exkcks5rl.1',
  password: 'amPU8p',
  h323_password: '024062',
  pstn_password: '024062',
  encrypted_password: 'CTydODDYJcHQBCGNJpfk5exkcks5rl.1',
  settings: {
    host_video: false,
    participant_video: false,
    cn_meeting: false,
    in_meeting: false,
    join_before_host: false,
    jbh_time: 0,
    mute_upon_entry: false,
    watermark: false,
    use_pmi: false,
    approval_type: 2,
    audio: 'voip',
    auto_recording: 'none',
    enforce_login: false,
    enforce_login_domains: '',
    alternative_hosts: '',
    alternative_host_update_polls: false,
    close_registration: false,
    show_share_button: false,
    allow_multiple_devices: false,
    registrants_confirmation_email: true,
    waiting_room: false,
    request_permission_to_unmute_participants: false,
    registrants_email_notification: true,
    meeting_authentication: false,
    encryption_type: 'enhanced_encryption',
    approved_or_denied_countries_or_regions: { enable: false },
    breakout_room: { enable: false },
    internal_meeting: false,
    continuous_meeting_chat: {
      enable: true,
      auto_add_invited_external_users: false,
      auto_add_meeting_participants: false,
      channel_id: 'web_sch_29390b057be24693bd3bf71faca2dec7'
    },
    participant_focused_meeting: false,
    push_change_to_calendar: false,
    resources: [],
    allow_host_control_participant_mute_state: false,
    alternative_hosts_email_notification: true,
    show_join_info: false,
    device_testing: false,
    focus_mode: false,
    meeting_invitees: [],
    private_meeting: false,
    email_notification: true,
    host_save_video_order: false,
    sign_language_interpretation: { enable: false },
    email_in_attendee_report: false
  },
  supportGoLive: false,
  creation_source: 'open_api',
  pre_schedule: false
}
*/
