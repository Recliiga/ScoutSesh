import connectDB from "@/db/connectDB";
import AthleteEvaluationTemplate, {
  AthleteEvaluationTemplateType,
} from "@/db/models/AthleteEvaluationTemplate";

export async function fetchCoachAETemplates(coachId: string) {
  try {
    await connectDB();
    const templates: AthleteEvaluationTemplateType[] = JSON.parse(
      JSON.stringify(await AthleteEvaluationTemplate.find({ user: coachId })),
    );
    return { templates, error: null };
  } catch (error) {
    return {
      templates: null,
      error: (error as Error).message,
    };
  }
}
