import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachTeamMembersPage from "@/components/dashboard-pages/CoachTeamMembersPage";
import AthleteTeamMembersPage from "@/components/dashboard-pages/AthleteTeamMembersPage";

export default async function TeamMembersPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteTeamMembersPage />;
  }

  return <CoachTeamMembersPage />;
}
