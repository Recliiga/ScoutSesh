import React from "react";
import WeeklyReflectionForm from "@/components/weekly-reflection/WeeklyReflectionForm";
import { getLatestGoalData } from "@/services/goalServices";
import NoWeeklyReflectionPage from "@/components/weekly-reflection/NoWeeklyReflectionPage";
import { notFound } from "next/navigation";
import { getGoalDueDate, getWeeklyReflectionStatus } from "@/lib/utils";

export default async function WeeklyReflectionPage() {
  const { goalData, error } = await getLatestGoalData();
  if (error !== null) return notFound();

  const status = await getWeeklyReflectionStatus(goalData);

  const dueDate = goalData && getGoalDueDate(goalData);

  if (!goalData || status !== "needs_reflection")
    return <NoWeeklyReflectionPage status={status} dueDate={dueDate} />;

  return <WeeklyReflectionForm goalData={goalData} />;
}
