import { StatusType } from "@/components/app/NotificationSign";
import { GoalDataSchemaType } from "@/db/models/Goal";
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

export async function getWeeklyReflectionStatus(
  goalData: GoalDataSchemaType | null
): Promise<StatusType> {
  let status: StatusType = "needs_reflection";

  // Check if all goals are completed
  const allGoalsCompleted = !goalData?.goals.some(
    (goal) => goal.dateCompleted === null
  );

  // Get the creation date of the most recent goal
  const latestGoalCreationDate = new Date(
    goalData?.goals.at(-1)?.createdAt as Date
  );

  const today = new Date("2024-11-14");

  const todayIsFriday = today.getDay() === 5;

  latestGoalCreationDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const differenceinMs = Math.abs(
    today.getTime() - latestGoalCreationDate.getTime()
  );

  const differenceinDays = differenceinMs / (1000 * 60 * 60 * 24);

  // Check if the difference in days is less than 7
  const notYetTimeForReflection = differenceinDays < 7;
  const reflectionNotDue = notYetTimeForReflection;

  // Set the status based on the criterias below

  if (reflectionNotDue && !todayIsFriday) status = "not_due";

  if (allGoalsCompleted) status = "all_complete";

  if (!goalData?.goals.length) status = "no_goals";

  return status;
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
