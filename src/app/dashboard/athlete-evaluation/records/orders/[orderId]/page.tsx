import React from "react";
import { fetchEvaluationsByOrderId } from "@/services/AthleteEvaluationServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import AthleteEvaluationRecordsPage from "@/components/athlete-evaluation/AthleteEvaluationRecordsPage";

export const metadata = {
  title: "Athlete Evaluation Records",
  description:
    "View and manage athlete evaluation records for a specific order.",
};

export default async function EvaluationRecordsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const user = await getSessionFromHeaders();

  if (user.role !== "Head Coach") notFound();

  const { evaluations, error: evaluationError } =
    await fetchEvaluationsByOrderId(orderId, user._id);
  if (evaluationError !== null) throw new Error(evaluationError);

  return <AthleteEvaluationRecordsPage evaluationRecords={evaluations} />;
}
