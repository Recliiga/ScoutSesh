import CannotCreateGoalPage from "@/components/goal-setting/CannotCreateGoalPage";
import CreateGoalForm from "@/components/goal-setting/CreateGoalForm";
import { getWeeklyReflectionStatus } from "@/lib/utils";
import { getLatestGoalData } from "@/services/goalServices";
import React from "react";

export default async function CreateGoalPage() {
  const { goalData } = await getLatestGoalData();
  const status = await getWeeklyReflectionStatus(goalData);

  if (!goalData) return null;

  if (status !== "all_complete")
    return <CannotCreateGoalPage/>;

  return <CreateGoalForm />;
}
