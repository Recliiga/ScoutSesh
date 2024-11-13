import React from "react";

import { getSession } from "@/services/authServices";
import CoachDailyJournalPage from "@/components/pages/CoachDailyJournalPage";

export default async function DailyJournalPage() {
  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return null;
  }

  return <CoachDailyJournalPage />;
}
