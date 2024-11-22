import React from "react";
import { getSessionFromHeaders } from "@/services/authServices";
import AthleteGoalSettingSubmissionsPage from "@/components/dashboard-pages/AthleteGoalSettingSubmissionsPage";
import CoachGoalSettingSubmissionsPage from "@/components/dashboard-pages/CoachGoalSettingSubmissionsPage";

export default async function GoalSettingSubmissionsPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteGoalSettingSubmissionsPage />;
  }
  return <CoachGoalSettingSubmissionsPage />;
}
