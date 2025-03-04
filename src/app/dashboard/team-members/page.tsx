import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachTeamMembersPage from "@/components/dashboard-pages/CoachTeamMembersPage";
import AthleteTeamMembersPage from "@/components/dashboard-pages/AthleteTeamMembersPage";
import { fetchTeamMembers } from "@/services/userServices";
import { fetchTeamJournalEntries } from "@/services/journalServices";
import { fetchLatestInvitationCode } from "@/services/invitationServices";

export const metadata = {
  title: "Team Members",
  description: "Manage your team members.",
};

export default async function TeamMembersPage() {
  const user = await getSessionFromHeaders();
  const { invitationCode } = await fetchLatestInvitationCode();

  const { teamMembers, error } = user.organization
    ? await fetchTeamMembers(user.organization._id)
    : { teamMembers: null, error: null };

  const { teamJournalEntries, error: journalError } = user.organization
    ? await fetchTeamJournalEntries(user.organization._id)
    : { teamJournalEntries: null, error: null };

  if (error !== null) throw new Error(error);
  if (journalError !== null) throw new Error(journalError);

  if (user.role !== "Head Coach") {
    return (
      <AthleteTeamMembersPage
        organizationMembers={teamMembers}
        teamJournalEntries={teamJournalEntries}
        user={user}
      />
    );
  }

  return (
    <CoachTeamMembersPage
      user={user}
      invitationCode={invitationCode}
      organizationMembers={teamMembers!}
      teamJournalEntries={teamJournalEntries}
    />
  );
}
