import React from "react";
import WeeklyReflectionForm from "@/components/weekly-reflection/WeeklyReflectionForm";
import { getGoalData } from "@/services/goalServices";
import NoWeeklyReflectionPage from "@/components/weekly-reflection/NoWeeklyReflectionPage";
import { notFound } from "next/navigation";

export default async function WeeklyReflectionPage() {
  const { goalData, error } = await getGoalData();

  if (error) return notFound();

  if (!goalData) return <NoWeeklyReflectionPage type="unavailable" />;

  const allGoalsCompleted = !goalData.goals.some(
    (goal) => goal.dateCompleted === null
  );

  if (allGoalsCompleted) return <NoWeeklyReflectionPage type="pending" />;

  return <WeeklyReflectionForm goalData={goalData} />;
}
