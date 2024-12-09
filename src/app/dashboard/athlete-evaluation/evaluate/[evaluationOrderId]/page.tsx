import EvaluationForm from "@/components/athlete-evaluation/EvaluationForm";
import { fetchCoachAETemplates } from "@/services/AETemplateServices";
import { fetchEvaluationOrder } from "@/services/AthleteEvaluationServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function SelfEvaluationPage({
  params,
}: {
  params: Promise<{ evaluationOrderId: string }>;
}) {
  const user = await getSessionFromHeaders();
  if (user.role !== "Head Coach") notFound();

  const { evaluationOrderId } = await params;

  const { order, error } = await fetchEvaluationOrder(evaluationOrderId);
  if (error !== null) throw new Error(error);

  const { templates, error: templateError } = await fetchCoachAETemplates(
    user._id,
  );
  if (templateError !== null) throw new Error(templateError);

  if (!order) notFound();
  return <EvaluationForm order={order} coachTemplates={templates} />;
}
