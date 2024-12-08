"use server";
import connectDB from "@/db/connectDB";
import AthleteEvaluation, {
  AthleteEvaluationType,
} from "@/db/models/AthleteEvaluation";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function createEvaluation(
  evaluationData: Partial<AthleteEvaluationType>,
) {
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) return { error: "User unauthenticated" };

    await connectDB();
    const newEvaluation = JSON.parse(
      JSON.stringify(
        await AthleteEvaluation.create({
          ...evaluationData,
          user: userId,
        }),
      ),
    );

    return { newEvaluation, error: null };
  } catch (err) {
    console.log((err as Error).message);
    return { newEvaluation: null, error: "An unexpected error occured" };
  }
}
