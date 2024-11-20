import WeeklyReflectionResults from "@/components/weekly-reflection/WeeklyReflectionResults";
import { getAthleteGoalData } from "@/services/goalServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function WeeklyReflectionResultsPage({
  params,
}: {
  params: Promise<{ goalSubmissionId: string }>;
}) {
  const { goalSubmissionId } = await params;
  const { goalData } = await getAthleteGoalData(goalSubmissionId);

  if (!goalData) notFound();

  return <WeeklyReflectionResults goalData={goalData} />;
}
