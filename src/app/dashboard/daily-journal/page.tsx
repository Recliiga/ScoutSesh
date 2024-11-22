import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachDailyJournalPage from "@/components/dashboard-pages/CoachDailyJournalPage";
import AthleteDailyJournalPage from "@/components/dashboard-pages/AthleteDailyJournalPage";

export default async function DailyJournalPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteDailyJournalPage />;
  }

  return <CoachDailyJournalPage />;
}
