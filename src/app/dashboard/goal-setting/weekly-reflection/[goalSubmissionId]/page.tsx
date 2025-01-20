import WeeklyReflectionResults from "@/components/weekly-reflection/WeeklyReflectionResults";
import { fetchGoalComments } from "@/services/commentServices";
import { fetchAthleteGoalData } from "@/services/goalServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function WeeklyReflectionResultsPage({
  params,
}: {
  params: Promise<{ goalSubmissionId: string }>;
}) {
  const { goalSubmissionId } = await params;
  const { goalData, error: goalError } =
    await fetchAthleteGoalData(goalSubmissionId);
  if (goalError !== null) throw new Error(goalError);

  const { goalComments, error: commentError } =
    await fetchGoalComments(goalSubmissionId);
  if (commentError !== null) throw new Error(commentError);

  if (!goalData) notFound();

  return (
    <WeeklyReflectionResults
      goalData={goalData}
      goalComments={goalComments}
      forAthlete={false}
    />
  );
}
