import connectDB from "@/db/connectDB";
import DailyJournal, { DailyJournalType } from "@/db/models/DailyJournal";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function fetchAllUserJournals(): Promise<
  | {
      dailyJournals: DailyJournalType[];
      error: null;
    }
  | { dailyJournals: null; error: string }
> {
  const cookieStore = await cookies();
  try {
    const { userId, error } = await getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    await connectDB();
    const dailyJournals: DailyJournalType[] = JSON.parse(
      JSON.stringify(
        await DailyJournal.find({ user: userId }).sort({ dateCreated: -1 })
      )
    );

    return { dailyJournals, error: null };
  } catch (error) {
    return { dailyJournals: null, error: (error as Error).message };
  }
}

export async function fetchJournal(journalId: string) {
  try {
    await connectDB();
    const journalData: DailyJournalType | null = JSON.parse(
      JSON.stringify(await DailyJournal.findById(journalId).populate("user"))
    );

    return { journalData, error: null };
  } catch (error) {
    return { journalData: null, error: (error as Error).message };
  }
}
