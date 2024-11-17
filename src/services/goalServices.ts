import connectDB from "@/db/connectDB";
import Goal, { GoalDataSchemaType, GoalSchemaType } from "@/db/models/Goal";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getLatestGoalData(): Promise<{
  goalData: GoalDataSchemaType | null;
  error: string | null;
}> {
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
    const [goalData] = JSON.parse(
      JSON.stringify(await Goal.find({ user: userId }))
    );
    return { goalData: goalData || null, error: null };
  } catch (error) {
    return { goalData: null, error: (error as Error).message };
  }
}

export async function getAthleteGoals(): Promise<{
  userGoals: GoalSchemaType[] | null;
  error: string | null;
}> {
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
    const userGoalData: GoalDataSchemaType[] = JSON.parse(
      JSON.stringify(await Goal.find({ user: userId }))
    );

    const userGoals: GoalSchemaType[] = [];
    userGoalData.forEach((goalData) => userGoals.push(...goalData.goals));
    return { userGoals, error: null };
  } catch (error) {
    return { userGoals: null, error: (error as Error).message };
  }
}
