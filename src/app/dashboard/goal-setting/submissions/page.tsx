import React from "react";
import { getSessionFromHeaders } from "@/services/authServices";
import AthleteGoalSettingSubmissionsPage from "@/components/pages/AthleteGoalSettingSubmissionsPage";
import CoachGoalSettingSubmissionsPage from "@/components/pages/CoachGoalSettingSubmissionsPage";

export default async function DashboardPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteGoalSettingSubmissionsPage />;
  }
  return <CoachGoalSettingSubmissionsPage />;
}
