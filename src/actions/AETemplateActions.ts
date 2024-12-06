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

    // Check if authenticated user is the owner of the template
    const templateToDelete: AthleteEvaluationTemplateType | null =
      await AthleteEvaluationTemplate.findById(templateId).populate({
        path: "user",
        select: "_id",
      });
    if (!templateToDelete) throw new Error("Invalid template ID");
    if (templateToDelete.user._id.toString() !== userId)
      throw new Error("User unauthorized");

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

export async function deleteTemplate(templateId: string) {
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) return { error: "User unauthenticated" };

    await connectDB();

    // Check if authenticated user is the owner of the template
    const templateToDelete: AthleteEvaluationTemplateType | null =
      await AthleteEvaluationTemplate.findById(templateId).populate({
        path: "user",
        select: "_id",
      });
    if (!templateToDelete) throw new Error("Invalid template ID");
    if (templateToDelete.user._id.toString() !== userId)
      throw new Error("User unauthorized");

    const deletedTemplate =
      await AthleteEvaluationTemplate.findByIdAndDelete(templateId);
    if (!deletedTemplate) throw new Error();
    return { error: null };
  } catch {
    return { error: "Error: Unable to delete template" };
  }
}
