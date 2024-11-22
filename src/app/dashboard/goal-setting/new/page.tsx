import CannotCreateGoalPage from "@/components/goal-setting/CannotCreateGoalPage";
import CreateGoalForm from "@/components/goal-setting/CreateGoalForm";
import { getWeeklyReflectionStatus } from "@/lib/utils";
import { getLatestGoalData } from "@/services/goalServices";
import React from "react";

export default async function CreateGoalPage() {
  const { goalData, error } = await getLatestGoalData();
  if (error !== null) throw new Error(error);

  const status = await getWeeklyReflectionStatus(goalData);

  if (error) throw new Error(error);

  if (!(status === "all_complete" || status === "no_goals"))
    return <CannotCreateGoalPage />;

  return <CreateGoalForm />;
}
