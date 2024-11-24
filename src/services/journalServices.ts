import connectDB from "@/db/connectDB";
import DailyJournal, { DailyJournalType } from "@/db/models/DailyJournal";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function fetchAllUserJournals(): Promise<
  | {
      journalEntries: DailyJournalType[];
      error: null;
    }
  | { journalEntries: null; error: string }
> {
  const cookieStore = await cookies();
  try {
    const { userId, error } = getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    await connectDB();
    const journalEntries: DailyJournalType[] = JSON.parse(
      JSON.stringify(
        await DailyJournal.find({ user: userId })
          .populate({ path: "user", select: "" })
          .sort({ createdAt: -1 })
      )
    );

    return { journalEntries, error: null };
  } catch (error) {
    return { journalEntries: null, error: (error as Error).message };
  }
}

export async function fetchJournalEntriesByUser(userId: string): Promise<
  | {
      journalEntries: DailyJournalType[];
      error: null;
    }
  | { journalEntries: null; error: string }
> {
  try {
    await connectDB();
    const journalEntries: DailyJournalType[] = JSON.parse(
      JSON.stringify(
        await DailyJournal.find({ user: userId })
          .populate({ path: "user", select: "" })
          .sort({ createdAt: -1 })
      )
    );

    return { journalEntries, error: null };
  } catch (error) {
    return { journalEntries: null, error: (error as Error).message };
  }
}

export async function fetchTeamJournalEntries(organizationId: string): Promise<
  | {
      teamJournalEntries: DailyJournalType[];
      error: null;
    }
  | { teamJournalEntries: null; error: string }
> {
  try {
    await connectDB();
    const allJournalEntries: DailyJournalType[] = JSON.parse(
      JSON.stringify(
        await DailyJournal.find()
          .populate({
            path: "user",
            select: "firstName lastName profilePicture organization",
          })
          .sort({ createdAt: -1 })
      )
    );

    const teamJournalEntries = allJournalEntries.filter(
      (entry) => String(entry.user.organization) === organizationId
    );

    return { teamJournalEntries, error: null };
  } catch (error) {
    return { teamJournalEntries: null, error: (error as Error).message };
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
