// import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { StatusType } from "@/components/goal-setting/GoalSettingNotificationSign";
import { GoalDataSchemaType } from "@/db/models/Goal";
import { UserType } from "@/db/models/User";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatTime(timeString: string) {
  const [start, end] = timeString.split(" - ").map((t) => {
    const [time, period] = t.split(" ");
    const [hours, minutes] = time.split(":");
    return { hours: parseInt(hours), minutes: parseInt(minutes), period };
  });

  const formatPart = (
    part: {
      hours: number;
      minutes: number;
      period: string;
    },
    showPeriod = true
  ) => {
    if (part.minutes === 0) {
      return `${part.hours}${showPeriod ? part.period : ""}`;
    }
    return `${part.hours}:${part.minutes.toString().padStart(2, "0")}${
      showPeriod ? part.period : ""
    }`;
  };

  if (start.period === end.period) {
    return `${formatPart(start, false)} - ${formatPart(end)}`;
  } else {
    return `${formatPart(start)} - ${formatPart(end)}`;
  }
}

export function resizeImage(
  imgFile: File,
  width: number = 500
): Promise<string | null> {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imgFile);
    fileReader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (!dataUrl) return;
      const canvas = document.createElement("canvas");
      const img = document.createElement("img");
      img.src = dataUrl as string;

      img.onload = (ev: Event) => {
        const eventTarget = ev.target as HTMLImageElement;
        const scaleSize = width / eventTarget.width;
        canvas.width = width;
        canvas.height = eventTarget.height * scaleSize;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(eventTarget, 0, 0, canvas.width, canvas.height);
        const resizedImage = ctx?.canvas.toDataURL(undefined, 0.8) || null;
        resolve(resizedImage);
      };
    };
  });
}

function getLatestGoal(goalData: GoalDataSchemaType) {
  const latestGoal = goalData.goals.reduce(
    (prev, curr) =>
      new Date(curr.updatedAt).getTime() > new Date(prev.updatedAt).getTime()
        ? curr
        : prev,
    goalData.goals[0]
  );
  return latestGoal;
}

export async function getWeeklyReflectionStatus(
  goalData: GoalDataSchemaType | null
): Promise<StatusType> {
  let status: StatusType = "not_due";

  if (!goalData) return "no_goals";

  // Check if all goals are completed
  const allGoalsCompleted = !goalData.goals.some(
    (goal) => goal.dateCompleted === null
  );

  // Get the updated date of the most recent goal
  const latestGoal = getLatestGoal(goalData);

  const latestGoalCreationDate = new Date(latestGoal.updatedAt);

  const today = new Date();

  const todayIsFriday = today.getDay() === 5;

  latestGoalCreationDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const differenceinMs = Math.abs(
    today.getTime() - latestGoalCreationDate.getTime()
  );

  const differenceinDays = differenceinMs / (1000 * 60 * 60 * 24);

  // Check if the difference in days is less than 7
  const reflectionDue = differenceinDays >= 7;

  const weeklyReflectionDoneToday = latestGoal
    ? new Date(latestGoal.updatedAt).getDate() === today.getDate()
    : false;

  // Set the status based on the criterias below
  if (!weeklyReflectionDoneToday && (reflectionDue || todayIsFriday))
    status = "needs_reflection";

  if (allGoalsCompleted) status = "all_complete";

  if (goalData && goalData.goals.length < 1) status = "no_goals";

  return status;
}

export function getGoalDueDate(goalData: GoalDataSchemaType) {
  const latestGoal = getLatestGoal(goalData);

  const nextFriday = new Date();
  const dayOfWeek = nextFriday.getDay();
  const daysUntilFriday = dayOfWeek >= 5 ? 12 - dayOfWeek : 5 - dayOfWeek;
  nextFriday.setDate(nextFriday.getDate() + daysUntilFriday);

  const nextWeekDueDate = new Date(latestGoal.updatedAt);
  nextWeekDueDate.setDate(nextWeekDueDate.getDate() + 7);

  const dueDate =
    nextWeekDueDate.getDate() < nextFriday.getDate()
      ? nextWeekDueDate
      : nextFriday;

  return dueDate.toDateString();
}

export function getFullname(user: UserType) {
  return `${user.firstName} ${user.lastName}`;
}

export async function uploadImage(
  image: string
): Promise<{ url: string; error: null } | { url: null; error: string }> {
  try {
    const formData = new FormData();
    formData.set("image", image);
    const BASE_URL = process.env.BASE_URL!;
    const res = await fetch(`${BASE_URL}/api/upload-image`, {
      method: "POST",
      body: JSON.stringify({ image }),
      headers: { "Content-Type": "application/json" },
    });
    const { url, error } = await res.json();

    return { url, error };
  } catch (error) {
    return { url: null, error: (error as Error).message };
  }
}
