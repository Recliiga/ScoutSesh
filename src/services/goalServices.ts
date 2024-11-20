import connectDB from "@/db/connectDB";
import Goal, { GoalDataSchemaType, GoalSchemaType } from "@/db/models/Goal";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getLatestGoalData() {
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
      JSON.stringify(await Goal.find({ user: userId }).sort({ createdAt: -1 }))
    );
    return { goalData: goalData || null, error: null };
  } catch (error) {
    return { goalData: null, error: (error as Error).message };
  }
}

export async function getAllAthleteGoalData(): Promise<
  | { athleteGoals: (GoalSchemaType & { goalDataId: string })[]; error: null }
  | { athleteGoals: null; error: string }
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
    const userGoalData: GoalDataSchemaType[] = JSON.parse(
      JSON.stringify(await Goal.find({ user: userId }))
    );

    const athleteGoals: (GoalSchemaType & { goalDataId: string })[] = [];
    userGoalData.forEach((goalD) => {
      const a = goalD.goals.map((goal) => ({ ...goal, goalDataId: goalD._id }));
      athleteGoals.push(...(a as (GoalSchemaType & { goalDataId: string })[]));
    });

    return { athleteGoals, error: null };
  } catch (error) {
    return { athleteGoals: null, error: (error as Error).message };
  }
}

export async function getAthleteGoalData(
  goalSubmissionId: string
): Promise<
  | { goalData: GoalDataSchemaType; error: null }
  | { goalData: null; error: string }
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
    const goalData = JSON.parse(
      JSON.stringify(
        await Goal.findOne({ _id: goalSubmissionId, user: userId }).populate(
          "user"
        )
      )
    );

    return { goalData, error: null };
  } catch (error) {
    return { goalData: null, error: (error as Error).message };
  }
}
