"use server";
import connectDB from "@/db/connectDB";
import DailyJournal, { DailyJournalType } from "@/db/models/DailyJournal";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function createJournal(dailyJournalData: DailyJournalType) {
  const cookieStore = await cookies();

  try {
    const { userId, error: authError } =
      await getUserIdFromCookies(cookieStore);
    if (authError !== null) throw new Error(authError);

    // connect to MongoDB and create new Goal
    await connectDB();
    await DailyJournal.create({ ...dailyJournalData, user: userId });
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
