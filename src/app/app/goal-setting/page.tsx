import React from "react";

import { getSession } from "@/services/authServices";
import CoachGoalSettingPage from "@/components/CoachGoalSettingPage";
import AthleteGoalSettingPage from "@/components/AthleteGoalSettingPage";

export default async function GoalSettingPage() {
  // Sort all athletes by completion date

  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return <AthleteGoalSettingPage />;
  }

  return <CoachGoalSettingPage />;
}
