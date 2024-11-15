"use server";
import connectDB from "@/db/connectDB";
import Goal from "@/db/models/Goal";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { GoalDataType } from "@/app/app/goal-setting/new/page";

export async function createGoal2(goalData: GoalDataType) {
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
    const newGoal = await Goal.create({ ...goalData, user: userId });
    return { newGoal, error: null };
  } catch (error) {
    return { newGoal: null, error: (error as Error).message };
  }
}

export async function createGoal(goalData: GoalDataType) {
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
    await Goal.create({ ...goalData, user: userId });
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
