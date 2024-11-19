import EditGoalForm from "@/components/goal-setting/EditGoalForm";
import { getAthleteGoalData } from "@/services/goalServices";
import React from "react";

export default async function GoalSettingEditPage({
  params,
}: {
  params: Promise<{ goalSubmissionId: string }>;
}) {
  const { goalSubmissionId } = await params;
  const { goalData, error } = await getAthleteGoalData(goalSubmissionId);

  if (!goalData) throw new Error(error);

  return <EditGoalForm goalDataToEdit={goalData} />;
}
