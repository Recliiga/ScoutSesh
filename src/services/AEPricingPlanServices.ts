import connectDB from "@/db/connectDB";
import AthleteEvaluationPricingPlan, {
  AEPricingPlanType,
} from "@/db/models/AthleteEvaluationPricingPlan";

export async function fetchCoachPricingPlan(coachId: string) {
  try {
    await connectDB();
    const pricingPlan: AEPricingPlanType = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationPricingPlan.findOne({ user: coachId }),
      ),
    );
    return { pricingPlan, error: null };
  } catch (error) {
    return {
      pricingPlan: null,
      error: (error as Error).message,
    };
  }
}
