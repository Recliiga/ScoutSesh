import { StatusType } from "@/components/goal-setting/GoalSettingNotificationSign";
import { GoalDataSchemaType } from "@/db/models/Goal";
import { UserType } from "@/db/models/User";
import { clsx, type ClassValue } from "clsx";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { DailyJournalType } from "@/db/models/DailyJournal";
import { RepeatFrequencyType } from "@/db/models/GroupClass";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { NotificationEntryType } from "@/db/models/NotificationEntry";
import { TransactionType } from "@/app/dashboard/billings-and-payments/page";

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
    showPeriod = true,
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
  width: number = 500,
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
    goalData.goals[0],
  );
  return latestGoal;
}

export async function getWeeklyReflectionStatus(
  goalData: GoalDataSchemaType | null,
): Promise<StatusType> {
  let status: StatusType = "not_due";

  if (!goalData) return "no_goals";

  // Check if all goals are completed
  const allGoalsCompleted = !goalData.goals.some(
    (goal) => goal.dateCompleted === null,
  );

  // Get the updated date of the most recent goal
  const latestGoal = getLatestGoal(goalData);

  const latestGoalCreationDate = new Date(latestGoal.updatedAt);

  const today = new Date();

  const todayIsFriday = today.getDay() === 5;

  latestGoalCreationDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const differenceinMs = Math.abs(
    today.getTime() - latestGoalCreationDate.getTime(),
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
    nextWeekDueDate.getTime() < nextFriday.getTime()
      ? nextWeekDueDate
      : nextFriday;

  return dueDate.toDateString();
}

export function getFullname(user: UserType) {
  return `${user.firstName} ${user.lastName}`;
}

export async function uploadImage(
  image: string,
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

export async function uploadImageClient(
  image: string,
): Promise<{ url: string; error: null } | { url: null; error: string }> {
  try {
    if (image.startsWith("https")) return { url: image, error: null };

    const formData = new FormData();
    formData.set("image", image);
    const res = await fetch(`/api/upload-image`, {
      method: "POST",
      body: JSON.stringify({ image }),
      headers: { "Content-Type": "application/json" },
    });
    const { url, error } = await res.json();

    return { url, error: error || null };
  } catch (error) {
    return { url: null, error: (error as Error).message };
  }
}

export async function uploadVideosClient(
  videos: { title: string; duration: number; url: string }[],
): Promise<
  | {
      uploadedVideos: { title: string; duration: number; url: string }[];
      error: null;
    }
  | { uploadedVideos: null; error: string }
> {
  try {
    const uploadedVideos = await Promise.all(
      videos.map(async (video) => {
        if (video.url.startsWith("https")) return video;
        const formData = new FormData();
        formData.set("video", video.url);
        const res = await fetch(`/api/upload-video`, {
          method: "POST",
          body: formData,
        });
        const { url, error } = await res.json();
        if (error) throw new Error(error);

        return { ...video, url };
      }),
    );
    return { uploadedVideos, error: null };
  } catch (error) {
    return { uploadedVideos: null, error: (error as Error).message };
  }
}

export function getUserIdFromCookies(cookieStore: ReadonlyRequestCookies) {
  try {
    // Get token from cookies
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("User is unauthorized");

    // Get userId from token
    const { payload, error } = verifyToken(token);
    if (error !== null) throw new Error(error);

    const userId: string = payload.userId;
    return { userId, error: null };
  } catch (error) {
    return { userId: null, error: (error as Error).message };
  }
}

export function calculateStreak(journalEntries: DailyJournalType[]) {
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const entry of journalEntries) {
    const entryDate = new Date(entry.createdAt);
    entryDate.setHours(0, 0, 0, 0);

    const entryIsToday =
      entryDate.toDateString() === currentDate.toDateString();
    const oneDay = 24 * 60 * 60 * 1000;
    const diffInDays = Math.round(
      (currentDate.getTime() - entryDate.getTime()) / oneDay,
    );

    if (entryIsToday || diffInDays === 1) {
      streak++;
      currentDate = entryDate;
    } else {
      break;
    }
  }

  return streak;
}

export function getDatesBetween(
  startDate: Date,
  endDate: Date,
  frequency?: RepeatFrequencyType,
) {
  const dates = [];
  const currentDate = new Date(startDate);

  const intervalDays: Record<RepeatFrequencyType, number> = {
    daily: 1,
    weekly: 7,
    "bi-weekly": 14,
    monthly: 1,
    yearly: 1,
  };

  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate));
    if (
      frequency === "daily" ||
      frequency === "weekly" ||
      frequency === "bi-weekly"
    )
      currentDate.setDate(currentDate.getDate() + intervalDays[frequency]);
    else if (frequency === "monthly")
      currentDate.setMonth(currentDate.getMonth() + intervalDays[frequency]);
    else if (frequency === "yearly")
      currentDate.setFullYear(
        currentDate.getFullYear() + intervalDays[frequency],
      );
    else {
      return dates;
    }
  }

  return dates;
}

export function getCourseTimeString(courseTime: {
  hours: number;
  mins: number;
}) {
  let hours = Number(courseTime.hours);
  const mins = courseTime.mins;
  let suffix = "AM";

  if (hours > 12) {
    hours -= 12;
    suffix = "PM";
  }

  return `${hours}:${mins} ${suffix}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getNextEvaluationDueDate(order: AthleteEvaluationOrderType) {
  const evaluationDateIndex = order.evaluationDates.findIndex(
    (evaluationDate) => !evaluationDate.dateCoachEvaluated,
  );
  return new Date(
    order.evaluationDates[evaluationDateIndex].date,
  ).toDateString();
}

export function getLastEvaluationDate(
  order: AthleteEvaluationOrderType,
  evaluations: AthleteEvaluationType[],
) {
  return evaluations.find(
    (evaluation) => String(evaluation.order) === order._id,
  )?.createdAt;
}

export function getNotificationMessage(
  notification: NotificationEntryType,
  useFullname = false,
) {
  switch (notification.type) {
    case "goal":
      return `${useFullname ? getFullname(notification.fromUser) : notification.fromUser.firstName} achieved their goal`;

    case "evaluation":
      return `Evaluation due for ${useFullname ? getFullname(notification.fromUser) : notification.fromUser.firstName}`;

    case "evaluation-athlete":
      return `Coach ${useFullname ? getFullname(notification.fromUser) : notification.fromUser.firstName} has finished evaluating your recent performance`;

    case "team":
      return `${useFullname ? getFullname(notification.fromUser) : notification.fromUser.firstName} joined your team`;

    case "videoCourse":
      return `${useFullname ? getFullname(notification.fromUser) : notification.fromUser.firstName} purchased a course`;

    case "liveClass":
      return `${useFullname ? getFullname(notification.fromUser) : notification.fromUser.firstName} enrolled in a class`;

    case "videoCourse":
      return `${getFullname(notification.fromUser)} purchased a course`;

    default:
      break;
  }
}

export function getDuration(fromDate: Date, toDate: Date = new Date()): string {
  const fromTime = new Date(fromDate).getTime();
  const toTime = toDate.getTime();
  const seconds = Math.floor((toTime - fromTime) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function getLast12Months() {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date;
  });
}

export function calculateMonthlyEarnings(
  transactions: TransactionType[],
  month: number,
  year: number,
) {
  return transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.purchaseDate);
      return (
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    })
    .reduce((total, transaction) => total + transaction.price, 0);
}

export function calculateMonthlyPlatformFees(
  transactions: TransactionType[],
  month: number,
  year: number,
) {
  return transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.purchaseDate);
      return (
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    })
    .reduce(
      (total, transaction) =>
        total + (transaction.price * transaction.platformPercentage) / 100,
      0,
    );
}

export function signToken(payload: object, options?: jwt.SignOptions) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, options);
    return { token, error: null };
  } catch (err) {
    const error = err as Error;
    return { token: null, error: error.message };
  }
}

export function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") throw new Error("Invalid token");
    return { payload, error: null };
  } catch (err) {
    const error = err as Error;
    return { payload: null, error: error.message };
  }
export function generateRecurrenceRule(
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

export function getTimeZone(date: Date) {
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
