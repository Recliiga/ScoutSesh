import React from "react";
import { getSession } from "@/services/authServices";
import AthleteGoalSettingSubmissionsPage from "@/components/pages/AthleteGoalSettingSubmissionsPage";
import CoachGoalSettingSubmissionsPage from "@/components/pages/CoachGoalSettingSubmissionsPage";

export default async function DashboardPage() {
  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return <AthleteGoalSettingSubmissionsPage />;
  }
  return <CoachGoalSettingSubmissionsPage />;
}
