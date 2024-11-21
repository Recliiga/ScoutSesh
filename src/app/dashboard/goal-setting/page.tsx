import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachGoalSettingPage from "@/components/pages/CoachGoalSettingPage";
import AthleteGoalSettingPage from "@/components/pages/AthleteGoalSettingPage";
import { getAllGoalData } from "@/services/goalServices";
import { notFound } from "next/navigation";

export default async function GoalSettingPage() {
  const user = await getSessionFromHeaders();
  const { goalData, error } = await getAllGoalData();

  if (error !== null) notFound();

  if (user.role === "Athlete") {
    return <AthleteGoalSettingPage />;
  }

  return <CoachGoalSettingPage goalData={goalData} />;
}
