import React from "react";
import WeeklyReflectionForm from "@/components/weekly-reflection/WeeklyReflectionForm";
import { getLatestGoalData } from "@/services/goalServices";
import NoWeeklyReflectionPage from "@/components/weekly-reflection/NoWeeklyReflectionPage";
import { notFound } from "next/navigation";

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

  if (error) return notFound();

  if (!goalData) return <NoWeeklyReflectionPage type="unavailable" />;

  const allGoalsCompleted = !goalData.goals.some(
    (goal) => goal.dateCompleted === null
  );

  const latestGoalCreationDate = new Date(
    goalData.goals.at(-1)?.createdAt as Date
  );
  const today = new Date(Date.now());

  latestGoalCreationDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const differenceinMs = Math.abs(
    today.getTime() - latestGoalCreationDate.getTime()
  );

  const differenceinDays = differenceinMs / (1000 * 60 * 60 * 24);

  const notYetTimeForReflection = differenceinDays < 7;

  const dueDate = new Date(latestGoalCreationDate);
  dueDate.setDate(dueDate.getDate() + 7);

  if (allGoalsCompleted || notYetTimeForReflection)
    return (
      <NoWeeklyReflectionPage
        type="pending"
        dueDate={daysOfTheWeek[dueDate.getDay()]}
      />
    );

  return <WeeklyReflectionForm goalData={goalData} />;
}
