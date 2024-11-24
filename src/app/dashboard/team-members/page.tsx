import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachTeamMembersPage from "@/components/dashboard-pages/CoachTeamMembersPage";
import AthleteTeamMembersPage from "@/components/dashboard-pages/AthleteTeamMembersPage";
import { fetchTeamMembers } from "@/services/userServices";
import { fetchTeamJournalEntries } from "@/services/journalServices";

export default async function TeamMembersPage() {
  const user = await getSessionFromHeaders();

  const { teamMembers, error } = user.organization
    ? await fetchTeamMembers(user.organization._id)
    : { teamMembers: null, error: null };

  const { teamJournalEntries, error: journalError } = user.organization
    ? await fetchTeamJournalEntries(user.organization._id)
    : { teamJournalEntries: null, error: null };

  if (error !== null) throw new Error(error);
  if (journalError !== null) throw new Error(journalError);

  if (user.role === "Athlete" || "Assistant Coach") {
    return (
      <AthleteTeamMembersPage
        organizationMembers={teamMembers}
        teamJournalEntries={teamJournalEntries}
      />
    );
  }

  return <CoachTeamMembersPage organizationMembers={teamMembers!} />;
}
