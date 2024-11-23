import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachDailyJournalPage from "@/components/dashboard-pages/CoachDailyJournalPage";
import AthleteDailyJournalPage from "@/components/dashboard-pages/AthleteDailyJournalPage";
import { getAllUserJournals } from "@/services/dailyJournalServices";

export default async function DailyJournalPage() {
  const user = await getSessionFromHeaders();
  const { dailyJournals, error } = await getAllUserJournals();

  if (error !== null) throw new Error(error);

  if (user.role === "Athlete") {
    return <AthleteDailyJournalPage journalEntries={dailyJournals} />;
  }

  return <CoachDailyJournalPage />;
}
