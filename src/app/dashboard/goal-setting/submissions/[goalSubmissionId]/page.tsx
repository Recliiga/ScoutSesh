import React from "react";
import { fetchAthleteGoalData } from "@/services/goalServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import WeeklyReflectionResults from "@/components/weekly-reflection/WeeklyReflectionResults";
import { fetchGoalComments } from "@/services/commentServices";

export const metadata = {
  title: "Goal Setting Results",
  description: "View and manage your goal setting results and reflections.",
};

export default async function GoalSettingResults({
  params,
}: {
  params: Promise<{ goalSubmissionId: string }>;
}) {
  const user = await getSessionFromHeaders();
  const { goalSubmissionId } = await params;
  const { goalData } = await fetchAthleteGoalData(goalSubmissionId);
  if (!goalData) notFound();

  const { goalComments, error: commentError } =
    await fetchGoalComments(goalSubmissionId);
  if (commentError !== null) throw new Error(commentError);

  return (
    <WeeklyReflectionResults
      goalComments={goalComments}
      goalData={goalData}
      forAthlete={user.role === "Athlete"}
    />
  );
}
