"use server";
import connectDB from "@/db/connectDB";
import Goal, {
  GoalDataSchemaType,
  WeeklyReflectionSchemaType,
} from "@/db/models/Goal";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { GoalSubmissionType } from "@/app/dashboard/goal-setting/new/page";
import { ReflectionDataType } from "@/components/weekly-reflection/WeeklyReflectionForm";

export async function createGoal(goalData: GoalSubmissionType) {
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

export async function performWeeklyReflection(
  goalId: string,
  reflectionData: ReflectionDataType[]
) {
  const cookieStore = await cookies();

  try {
    // Get token from cookie
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Invalid token");

    // Verify token and get userId
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof payload === "string") throw new Error("Invalid token");
    const userId = payload.userId;

    // connect to MongoDB and update Goal
    await connectDB();
    const updatedGoal: GoalDataSchemaType | null = await Goal.findById(goalId);

    if (!updatedGoal) throw new Error(`Goal with id "${goalId}" not found`);
    if (updatedGoal.user.toString() !== userId)
      throw new Error(`User is unauthorized`);

    updatedGoal.goals.forEach((goal, index) => {
      goal.weeklyReflections.push(
        reflectionData[index].reflection as WeeklyReflectionSchemaType
      );
      if (reflectionData[index].reflection.isCompleted) {
        goal.dateCompleted = new Date();
      }
    });

    await updatedGoal.save();
    return { error: null };
  } catch (error) {
    return { newGoal: null, error: (error as Error).message };
  }
}
