import CoachDailyJournalSubmissionsPage from "@/components/dashboard-pages/CoachDailyJournalSubmissionsPage";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchTeamJournalEntries } from "@/services/journalServices";
import React from "react";

export const metadata = {
  title: "Daily Journal Submissions",
  description: "View and manage daily journal entries.",
};

export default async function DailyJournalSubmissionsPage() {
  const user = await getSessionFromHeaders();
  const { teamJournalEntries, error: teamJournalError } =
    await fetchTeamJournalEntries(user.organization!._id);

  if (teamJournalError !== null) throw new Error(teamJournalError);

  return (
    <CoachDailyJournalSubmissionsPage teamJournalEntries={teamJournalEntries} />
  );
}
