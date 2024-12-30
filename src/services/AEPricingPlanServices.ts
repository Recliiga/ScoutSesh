import connectDB from "@/db/connectDB";
import AthleteEvaluationPricingPlan, {
  AEPricingPlanType,
} from "@/db/models/AthleteEvaluationPricingPlan";

export async function fetchCoachPricingPlan(coachId: string) {
  try {
    await connectDB();
    const pricingPlan: AEPricingPlanType | null = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationPricingPlan.findOne({ user: coachId }).populate({
          path: "user",
          select: "status",
        }),
      ),
    );

    if (pricingPlan && pricingPlan.user.status !== "Active")
      return { error: "Pricing plan coach is not active" };

    return { pricingPlan, error: null };
  } catch (error) {
    return {
      pricingPlan: null,
      error: (error as Error).message,
    };
  }
}
