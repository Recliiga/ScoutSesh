import React from "react";

import { getSession } from "@/services/authServices";
import CoachGoalSettingPage from "@/components/pages/CoachGoalSettingPage";
import AthleteGoalSettingPage from "@/components/pages/AthleteGoalSettingPage";

export default async function GoalSettingPage() {
  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return <AthleteGoalSettingPage />;
  }

  return <CoachGoalSettingPage />;
}
