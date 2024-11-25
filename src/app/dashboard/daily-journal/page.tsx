import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachDailyJournalPage from "@/components/dashboard-pages/CoachDailyJournalPage";
import AthleteDailyJournalPage from "@/components/dashboard-pages/AthleteDailyJournalPage";
import {
  fetchAllUserJournals,
  fetchTeamJournalEntries,
} from "@/services/journalServices";

export default async function DailyJournalPage() {
  const user = await getSessionFromHeaders();
  const { journalEntries, error } = await fetchAllUserJournals();

  if (error !== null) throw new Error(error);

  if (user.role === "Athlete") {
    return <AthleteDailyJournalPage journalEntries={journalEntries} />;
  }

  const { teamJournalEntries, error: teamJournalError } =
    await fetchTeamJournalEntries(user.organization!._id);
  if (teamJournalError !== null) throw new Error(teamJournalError);

  return <CoachDailyJournalPage teamJournalEntries={teamJournalEntries} />;
}
