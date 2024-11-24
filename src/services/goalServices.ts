import connectDB from "@/db/connectDB";
import Goal, { GoalDataSchemaType } from "@/db/models/Goal";
import { cookies } from "next/headers";
import { getUserIdFromCookies } from "@/lib/utils";

export async function fetchAllAthleteGoalData(): Promise<
  | {
      athleteGoalData: GoalDataSchemaType[];
      error: null;
    }
  | { athleteGoalData: null; error: string }
> {
  try {
    const cookieStore = await cookies();
    const { userId, error } = await getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    // Connect to database and get latest user goal
    await connectDB();
    const athleteGoalData: GoalDataSchemaType[] = JSON.parse(
      JSON.stringify(await Goal.find({ user: userId }))
    );

    return { athleteGoalData, error: null };
  } catch (error) {
    return { athleteGoalData: null, error: (error as Error).message };
  }
}

export async function fetchAthleteGoalData(goalSubmissionId: string) {
  try {
    // Connect to database and get latest user goal
    await connectDB();
    const goalData: GoalDataSchemaType | null = JSON.parse(
      JSON.stringify(await Goal.findById(goalSubmissionId).populate("user"))
    );

    return { goalData, error: null };
  } catch (error) {
    return { goalData: null, error: (error as Error).message };
  }
}

export async function fetchAthleteLatestGoalData() {
  try {
    const cookieStore = await cookies();
    const { userId, error } = await getUserIdFromCookies(cookieStore);
    if (error !== null) throw new Error(error);

    // Connect to database and get latest user goal
    await connectDB();
    const allGoalData: GoalDataSchemaType[] | [] = JSON.parse(
      JSON.stringify(await Goal.find({ user: userId }).sort({ createdAt: -1 }))
    );
    return { goalData: allGoalData.at(0) || null, error: null };
  } catch (error) {
    return { goalData: null, error: (error as Error).message };
  }
}

export async function fetchTeamGoalData(organizationId: string) {
  try {
    await connectDB();
    const allGoalData: GoalDataSchemaType[] = JSON.parse(
      JSON.stringify(await Goal.find().populate("user"))
    );
    const teamGoalData = allGoalData.filter(
      (goalData) =>
        JSON.parse(JSON.stringify(goalData.user.organization)) ===
        organizationId
    );
    return { teamGoalData, error: null };
  } catch (error) {
    return { teamGoalData: null, error: (error as Error).message };
  }
}
