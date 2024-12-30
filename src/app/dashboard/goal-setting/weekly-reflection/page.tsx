import React from "react";
import WeeklyReflectionForm from "@/components/weekly-reflection/WeeklyReflectionForm";
import { fetchAthleteLatestGoalData } from "@/services/goalServices";
import NoWeeklyReflectionPage from "@/components/weekly-reflection/NoWeeklyReflectionPage";
import { notFound } from "next/navigation";
import { getGoalDueDate, getWeeklyReflectionStatus } from "@/lib/utils";
import { getSessionFromHeaders } from "@/services/authServices";

export default async function WeeklyReflectionPage() {
  const user = await getSessionFromHeaders();

  const { goalData, error } = await fetchAthleteLatestGoalData();
  if (error !== null) notFound();

  const status = await getWeeklyReflectionStatus(goalData);

  const dueDate = goalData && getGoalDueDate(goalData);

  if (!goalData || status !== "needs_reflection")
    return <NoWeeklyReflectionPage status={status} dueDate={dueDate} />;

  return (
    <WeeklyReflectionForm
      goalData={goalData}
      coachId={user.organization ? String(user.organization.user) : undefined}
    />
  );
}
