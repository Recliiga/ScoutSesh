"use server";
import connectDB from "@/db/connectDB";
import AthleteEvaluationTemplate, {
  AthleteEvaluationTemplateType,
} from "@/db/models/AthleteEvaluationTemplate";

export async function createTemplate(
  templateData: AthleteEvaluationTemplateType
) {
  try {
    await connectDB();
    await AthleteEvaluationTemplate.create(templateData);
    return { error: null };
  } catch {
    return { error: "Error: Unable to create template" };
  }
}
