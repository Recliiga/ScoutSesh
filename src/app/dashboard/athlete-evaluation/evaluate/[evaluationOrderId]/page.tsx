import EvaluationForm from "@/components/athlete-evaluation/EvaluationForm";
import BackButton from "@/components/dashboard/BackButton";
import { fetchCoachAETemplates } from "@/services/AETemplateServices";
import { fetchEvaluationOrder } from "@/services/AthleteEvaluationServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Athlete Evaluation",
  description: "Evaluate athlete performance and progress",
};

export default async function SelfEvaluationPage({
  params,
}: {
  params: Promise<{ evaluationOrderId: string }>;
}) {
  const user = await getSessionFromHeaders();

  const { evaluationOrderId } = await params;

  const { order, error } = await fetchEvaluationOrder(evaluationOrderId);
  if (error !== null) throw new Error(error);

  if (!order) notFound();

  if (user.role === "Head Coach") {
    const { templates, error: templateError } = await fetchCoachAETemplates(
      user._id,
    );
    if (templateError !== null) throw new Error(templateError);

    return <EvaluationForm order={order} coachTemplates={templates} />;
  }

  const athleteCanEvaluate = order.evaluationDates.some(
    (date) => date.dateCoachEvaluated && !date.dateAthleteEvaluated,
  );

  if (!athleteCanEvaluate)
    return (
      <div className="flex-center flex-1 flex-col gap-2 text-accent-gray-300">
        <p>This Evaluation is not due yet</p>
        <BackButton actionText="Go Back" />
      </div>
    );

  return <EvaluationForm order={order} />;
}
