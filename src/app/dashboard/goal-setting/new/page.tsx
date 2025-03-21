import CannotCreateGoalPage from "@/components/goal-setting/CannotCreateGoalPage";
import CreateGoalForm from "@/components/goal-setting/CreateGoalForm";
import { getWeeklyReflectionStatus } from "@/lib/utils";
import { fetchAthleteLatestGoalData } from "@/services/goalServices";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Create Goal",
  description: "Create a new goal for yourself.",
};

export default async function CreateGoalPage() {
  const { goalData, error } = await fetchAthleteLatestGoalData();
  if (error !== null) notFound();

  const status = await getWeeklyReflectionStatus(goalData);

  if (!(status === "all_complete" || status === "no_goals"))
    return <CannotCreateGoalPage />;

  return <CreateGoalForm />;
}
