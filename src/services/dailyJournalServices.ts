import connectDB from "@/db/connectDB";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import DailyJournal, { DailyJournalType } from "@/db/models/DailyJournal";

export async function getAllUserJournals(): Promise<
  | {
      dailyJournals: DailyJournalType[];
      error: null;
    }
  | { dailyJournals: null; error: string }
> {
  const cookieStore = await cookies();
  try {
    // Get token from cookies
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("User is unauthorized");

    // Get userId from token
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") throw new Error("User is unauthorized");
    const userId = payload.userId;

    // Connect to database and get latest user goal
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
