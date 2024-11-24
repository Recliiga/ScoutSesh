import AthleteDailyJournalPage from "@/components/dashboard-pages/AthleteDailyJournalPage";
import { fetchJournalEntriesByUser } from "@/services/journalServices";
import React from "react";

export default async function UserDailyJournalEntriesPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const { journalEntries, error } = await fetchJournalEntriesByUser(userId);

  if (error !== null) throw new Error(error);

  return (
    <AthleteDailyJournalPage journalEntries={journalEntries} isCoachView />
  );
}
