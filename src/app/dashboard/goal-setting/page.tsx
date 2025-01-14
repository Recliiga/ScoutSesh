import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachGoalSettingPage from "@/components/dashboard-pages/CoachGoalSettingPage";
import AthleteGoalSettingPage from "@/components/dashboard-pages/AthleteGoalSettingPage";
import { fetchTeamGoalData } from "@/services/goalServices";
import { notFound } from "next/navigation";

export default async function GoalSettingPage() {
  const user = await getSessionFromHeaders();

  if (user.role !== "Head Coach") {
    return <AthleteGoalSettingPage />;
  }

  const { teamGoalData, error } = await fetchTeamGoalData(
    user.organization!._id,
  );
  if (error !== null) notFound();

  return <CoachGoalSettingPage teamGoalData={teamGoalData} />;
}
