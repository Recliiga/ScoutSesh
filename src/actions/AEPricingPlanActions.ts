"use server";
import connectDB from "@/db/connectDB";
import AthleteEvaluationPricingPlan, {
  AEPricingPlanType,
} from "@/db/models/AthleteEvaluationPricingPlan";
import { redirect } from "next/navigation";

export async function createPricingPlan(pricingPlanData: AEPricingPlanType) {
  let redirectUrl;
  try {
    await connectDB();
    await AthleteEvaluationPricingPlan.create(pricingPlanData);
    redirectUrl = "/dashboard/athlete-evaluation";
  } catch {
    return { error: "An unexpected error occured" };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}
