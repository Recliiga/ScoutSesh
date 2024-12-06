"use server";
import connectDB from "@/db/connectDB";
import AthleteEvaluationPricingPlan, {
  AEPricingPlanType,
} from "@/db/models/AthleteEvaluationPricingPlan";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createPricingPlan(pricingPlanData: AEPricingPlanType) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) return { error: "User unauthenticated" };

    await connectDB();
    await AthleteEvaluationPricingPlan.create({
      ...pricingPlanData,
      user: userId,
    });
    redirectUrl = "/dashboard/athlete-evaluation";
  } catch (err) {
    console.log((err as Error).message);
    return { error: "An unexpected error occured" };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}
