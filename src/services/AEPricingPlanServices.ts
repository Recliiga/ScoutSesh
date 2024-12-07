import connectDB from "@/db/connectDB";
import AthleteEvaluationPricingPlan, {
  AEPricingPlanType,
} from "@/db/models/AthleteEvaluationPricingPlan";

export async function fetchPricingPlanByCoach(coachId: string) {
  try {
    await connectDB();
    const pricingPlans: AEPricingPlanType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationPricingPlan.find({ user: coachId }),
      ),
    );
    return { pricingPlans, error: null };
  } catch (error) {
    return {
      pricingPlans: null,
      error: (error as Error).message,
    };
  }
}
