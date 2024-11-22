import EditGoalForm from "@/components/goal-setting/EditGoalForm";
import { fetchAthleteGoalData } from "@/services/goalServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function GoalSettingEditPage({
  params,
}: {
  params: Promise<{ goalSubmissionId: string }>;
}) {
  const { goalSubmissionId } = await params;
  const { goalData } = await fetchAthleteGoalData(goalSubmissionId);

  if (!goalData) notFound();

  return <EditGoalForm goalDataToEdit={goalData} />;
}
