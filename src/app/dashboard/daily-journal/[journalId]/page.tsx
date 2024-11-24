import DailyJournalResults from "@/components/daily-journal/DailyJournalResults";
import { fetchJournal } from "@/services/journalServices";

export type DailyJournalDetailsType = {
  trainingAndCompetition: string;
  nutrition: string;
  sleep: string;
  mentalState: string;
  changeTomorrow: string;
  continueTomorrow: string;
};

export default async function DailyJournalResultsPage({
  params,
}: {
  params: Promise<{ journalId: string }>;
}) {
  const { journalId } = await params;
  const { journalData, error } = await fetchJournal(journalId);

  if (error !== null) throw new Error(error);

  return <DailyJournalResults journalData={journalData} />;
}
