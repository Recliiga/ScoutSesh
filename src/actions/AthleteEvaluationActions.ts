"use server";
import connectDB from "@/db/connectDB";
import AthleteEvaluation, {
  AthleteEvaluationType,
} from "@/db/models/AthleteEvaluation";
import AthleteEvaluationOrder, {
  AthleteEvaluationOrderType,
} from "@/db/models/AthleteEvaluationOrder";
import AthleteEvaluationPricingPlan, {
  AEPricingPlanType,
} from "@/db/models/AthleteEvaluationPricingPlan";
import AthleteEvaluationTemplate, {
  AthleteEvaluationTemplateType,
} from "@/db/models/AthleteEvaluationTemplate";
import { getUserIdFromCookies } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createEvaluation(
  evaluationData: Partial<AthleteEvaluationType>,
) {
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) return { error: "User unauthenticated" };

    await connectDB();
    const newEvaluation = JSON.parse(
      JSON.stringify(
        await AthleteEvaluation.create({
          ...evaluationData,
          user: userId,
        }),
      ),
    );

    return { newEvaluation, error: null };
  } catch (err) {
    console.log((err as Error).message);
    return { newEvaluation: null, error: "An unexpected error occured" };
  }
}

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

export async function updatePricingPlan(
  pricingPlanId: string,
  pricingPlanData: AEPricingPlanType,
) {
  let redirectUrl;
  try {
    const cookieStore = await cookies();
    const { userId, error: authError } = getUserIdFromCookies(cookieStore);
    if (authError !== null) return { error: "User unauthenticated" };

    if (String(pricingPlanData.user) !== userId)
      return { error: "User unauthorized" };

    await connectDB();
    const updatedPricingPlan =
      await AthleteEvaluationPricingPlan.findByIdAndUpdate(
        pricingPlanId,
        pricingPlanData,
      );
    if (!updatedPricingPlan) return { error: "Unable to update pricing plan" };

    redirectUrl = "/dashboard/athlete-evaluation";
  } catch (err) {
    console.log((err as Error).message);
    return { error: "An unexpected error occured" };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

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
