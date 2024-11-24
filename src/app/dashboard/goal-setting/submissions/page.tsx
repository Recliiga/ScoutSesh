import React from "react";
import { getSessionFromHeaders } from "@/services/authServices";
import AthleteGoalSettingSubmissionsPage from "@/components/dashboard-pages/AthleteGoalSettingSubmissionsPage";
import CoachGoalSettingSubmissionsPage from "@/components/dashboard-pages/CoachGoalSettingSubmissionsPage";
import { notFound } from "next/navigation";
import { fetchTeamGoalData } from "@/services/goalServices";

export default async function GoalSettingSubmissionsPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete" || user.role === "Assistant Coach") {
    return <AthleteGoalSettingSubmissionsPage />;
  }

  const { teamGoalData, error } = await fetchTeamGoalData(
    user.organization!._id
  );
  if (error !== null) notFound();

  return <CoachGoalSettingSubmissionsPage teamGoalData={teamGoalData} />;
}
