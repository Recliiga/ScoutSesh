import DailyJournalResults from "@/components/daily-journal/DailyJournalResults";
import { fetchJournalComments } from "@/services/commentServices";
import { fetchJournal } from "@/services/journalServices";
import { notFound } from "next/navigation";

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
  const { journalData, error: journalError } = await fetchJournal(journalId);
  const { journalComments, error: commentError } = await fetchJournalComments(
    journalId
  );

  if (journalError !== null) throw new Error(journalError);
  if (commentError !== null) throw new Error(commentError);

  if (!journalData) notFound();

  return (
    <DailyJournalResults
      journalData={journalData}
      journalComments={journalComments}
    />
  );
}