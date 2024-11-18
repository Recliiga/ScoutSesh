import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachDailyJournalPage from "@/components/pages/CoachDailyJournalPage";
import AthleteDailyJournalPage from "@/components/pages/AthleteDailyJournalPage";

export default async function DailyJournalPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteDailyJournalPage />;
  }

  return <CoachDailyJournalPage />;
}
