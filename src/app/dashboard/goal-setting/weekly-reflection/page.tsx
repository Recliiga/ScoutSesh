import React from "react";
import WeeklyReflectionForm from "@/components/weekly-reflection/WeeklyReflectionForm";
import { getLatestGoalData } from "@/services/goalServices";
import NoWeeklyReflectionPage from "@/components/weekly-reflection/NoWeeklyReflectionPage";
import { notFound } from "next/navigation";
import { getWeeklyReflectionStatus } from "@/lib/utils";

const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export default async function WeeklyReflectionPage() {
  const { goalData, error } = await getLatestGoalData();
  const status = await getWeeklyReflectionStatus(goalData);

  if (error) return notFound();

  const latestGoalCreationDate = new Date(
    goalData?.goals.at(-1)?.createdAt as Date
  );

  function getNextFriday() {
    const nextFriday = new Date();
    const dayOfWeek = nextFriday.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
    nextFriday.setDate(nextFriday.getDate() + daysUntilFriday);
    return nextFriday;
  }

  const dueDate = new Date(latestGoalCreationDate);
  dueDate.setDate(dueDate.getDate() + 7);

  if (!goalData || status !== "needs_reflection")
    return (
      <NoWeeklyReflectionPage
        status={status}
        dueDate={getNextFriday().toDateString()}
      />
    );

  return <WeeklyReflectionForm goalData={goalData} />;
}
