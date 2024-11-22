import React from "react";
import { getSessionFromHeaders } from "@/services/authServices";
import AthleteGoalSettingSubmissionsPage from "@/components/dashboard-pages/AthleteGoalSettingSubmissionsPage";
import CoachGoalSettingSubmissionsPage from "@/components/dashboard-pages/CoachGoalSettingSubmissionsPage";
import { notFound } from "next/navigation";
import { getTeamGoalData } from "@/services/goalServices";

export default async function GoalSettingSubmissionsPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteGoalSettingSubmissionsPage />;
  }

  const { teamGoalData, error } = await getTeamGoalData(
    user.organization._id as string
  );
  if (error !== null) notFound();

  return <CoachGoalSettingSubmissionsPage teamGoalData={teamGoalData} />;
}
