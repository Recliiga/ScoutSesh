"use server";
import connectDB from "@/db/connectDB";
import AthleteEvaluationOrder, {
  AthleteEvaluationOrderType,
} from "@/db/models/AthleteEvaluationOrder";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function purchaseEvaluation(
  evaluationPurchaseData: Partial<AthleteEvaluationOrderType>,
) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) return { error: "User unauthenticated" };

    await connectDB();
    await AthleteEvaluationOrder.create({
      ...evaluationPurchaseData,
      pricingPlan: evaluationPurchaseData.pricingPlan!._id,
      user: userId,
    });
    redirectUrl = "/dashboard/athlete-evaluation";
  } catch (err) {
    console.log((err as Error).message);
    return { error: "Something went wrong. Unable to complete purchase" };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}
