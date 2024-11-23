import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachTeamMembersPage from "@/components/dashboard-pages/CoachTeamMembersPage";
import AthleteTeamMembersPage from "@/components/dashboard-pages/AthleteTeamMembersPage";
import { fetchTeamMembers } from "@/services/userServices";

export default async function TeamMembersPage() {
  const user = await getSessionFromHeaders();
  const { teamMembers, error } = user.organization
    ? await fetchTeamMembers(user.organization._id)
    : { teamMembers: null, error: null };

  if (error !== null) throw new Error(error);

  if (user.role === "Athlete" || "Assistant Coach") {
    return <AthleteTeamMembersPage organizationMembers={teamMembers} />;
  }

  return <CoachTeamMembersPage organizationMembers={teamMembers!} />;
}
