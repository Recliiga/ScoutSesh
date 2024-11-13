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
