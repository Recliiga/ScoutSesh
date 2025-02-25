import connectDB from "@/db/connectDB";
import DailyJournal, { DailyJournalType } from "@/db/models/DailyJournal";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const { userId, error } = await getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    await connectDB();
    const journalEntries: DailyJournalType[] = JSON.parse(
      JSON.stringify(
        await DailyJournal.find({ user: userId }).sort({ createdAt: -1 }),
      ),
    );
    return NextResponse.json({ journalEntries, error: null });
  } catch (error) {
    return NextResponse.json({
      journalEntries: null,
      error: (error as Error).message,
    });
  }
}
