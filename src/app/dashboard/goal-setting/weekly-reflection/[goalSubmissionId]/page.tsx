import WeeklyReflectionResults from "@/components/weekly-reflection/WeeklyReflectionResults";
import { getGoalComments } from "@/services/commentServices";
import { getAthleteGoalData } from "@/services/goalServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function WeeklyReflectionResultsPage({
  params,
}: {
  params: Promise<{ goalSubmissionId: string }>;
}) {
  const { goalSubmissionId } = await params;
  const { goalData, error: goalError } = await getAthleteGoalData(
    goalSubmissionId
  );
  if (goalError !== null) notFound();

  const { comments, error: commentError } = await getGoalComments(
    goalData._id as string
  );
  if (commentError !== null) notFound();

  return <WeeklyReflectionResults goalData={goalData} comments={comments} />;
}
