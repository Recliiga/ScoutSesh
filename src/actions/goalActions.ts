"use server";
import connectDB from "@/db/connectDB";
import Goal, {
  GoalDataSchemaType,
  WeeklyReflectionSchemaType,
} from "@/db/models/Goal";
import { cookies } from "next/headers";
import { ReflectionDataType } from "@/components/weekly-reflection/WeeklyReflectionForm";
import { GoalSubmissionType } from "@/components/goal-setting/CreateGoalForm";
import { getUserIdFromCookies } from "@/lib/utils";
import NotificationEntry from "@/db/models/NotificationEntry";

export async function createGoal(goalData: GoalSubmissionType) {
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) throw new Error(authError);

    // connect to MongoDB and create new Goal
    await connectDB();
    await Goal.create({ ...goalData, user: userId });
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function updateGoal(goalId: string, goalData: GoalSubmissionType) {
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) throw new Error(authError);

    // connect to MongoDB and create new Goal
    await connectDB();
    const goalToUpdate: GoalDataSchemaType | null = await Goal.findById(goalId);

    // Throw error if goal not found
    if (!goalToUpdate) {
      throw new Error("Goal not found");
    }

    // Throw error if user is not the creator of the goal
    const goalUser = JSON.parse(JSON.stringify(goalToUpdate.user));
    if (goalUser !== userId) {
      throw new Error("User is not authorized");
    }

    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: goalId, user: userId },
      goalData,
    );
    if (!updatedGoal) throw new Error("Unable to update goal");
    return { error: null };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function performWeeklyReflection(
  goalId: string,
  reflectionData: ReflectionDataType[],
  coachId: string | null,
) {
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) throw new Error(authError);

    // connect to MongoDB and update Goal
    await connectDB();
    const updatedGoal: GoalDataSchemaType | null = await Goal.findById(goalId);

    if (!updatedGoal) throw new Error(`Goal with id "${goalId}" not found`);
    if (updatedGoal.user.toString() !== userId)
      throw new Error(`User is unauthorized`);

    updatedGoal.goals.forEach(async (goal, index) => {
      goal.weeklyReflections.push(
        reflectionData[index].reflection as WeeklyReflectionSchemaType,
      );
      if (reflectionData[index].reflection.isCompleted) {
        goal.dateCompleted = new Date();

        if (coachId)
          await NotificationEntry.create({
            type: "goal",
            fromUser: userId,
            toUser: coachId,
            link: `/dashboard/goal-setting/weekly-reflection/${goalId}`,
          });
      }
    });

    await updatedGoal.save();
    return { error: null };
  } catch (error) {
    return { newGoal: null, error: (error as Error).message };
  }
}
