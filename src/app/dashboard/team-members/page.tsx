import React from "react";

import { getSession } from "@/services/authServices";
import CoachTeamMembersPage from "@/components/pages/CoachTeamMembersPage";
import AthleteTeamMembersPage from "@/components/pages/AthleteTeamMembersPage";

export default async function TeamMembersPage() {
  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return <AthleteTeamMembersPage />;
  }

  return <CoachTeamMembersPage />;
}
