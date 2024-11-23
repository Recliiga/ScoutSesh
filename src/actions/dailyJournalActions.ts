"use server";
import connectDB from "@/db/connectDB";
import DailyJournal, { DailyJournalType } from "@/db/models/DailyJournal";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function createDailyJournal(dailyJournalData: DailyJournalType) {
  const cookieStore = await cookies();

  try {
    // Get token from cookie
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Invalid token");

    // Verify token and get userId
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") throw new Error("Invalid token");
    const userId = payload.userId;

    // connect to MongoDB and create new Goal
    await connectDB();
    await DailyJournal.create({ ...dailyJournalData, user: userId });
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
