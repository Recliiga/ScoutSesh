"use server";
import connectDB from "@/db/connectDB";
import AthleteEvaluationTemplate, {
  AthleteEvaluationTemplateType,
} from "@/db/models/AthleteEvaluationTemplate";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";

export async function createTemplate(
  templateData: AthleteEvaluationTemplateType,
) {
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) return { error: "User unauthenticated" };

    await connectDB();
    await AthleteEvaluationTemplate.create({
      ...templateData,
      _id: undefined,
      user: userId,
    });
    return { error: null };
  } catch {
    return { error: "Error: Unable to create template" };
  }
}

export async function updateTemplate(
  templateId: string,
  templateData: AthleteEvaluationTemplateType,
) {
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) return { error: "User unauthenticated" };

    await connectDB();
    const templateToUpdate = await AthleteEvaluationTemplate.findOne({
      _id: templateId,
      user: userId,
    });
    if (!templateToUpdate) throw new Error("User unauthorized");

    const updatedTemplate = await AthleteEvaluationTemplate.findByIdAndUpdate(
      templateId,
      templateData,
    );
    if (!updatedTemplate) throw new Error();
    return { error: null };
  } catch {
    return { error: "Error: Unable to update template" };
  }
}
