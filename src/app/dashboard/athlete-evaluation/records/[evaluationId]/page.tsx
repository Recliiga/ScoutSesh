import EvaluationResults from "@/components/athlete-evaluation/AthleteEvaluationResults";
import { fetchEvaluationResults } from "@/services/AthleteEvaluationServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function EvaluationResultsPage({
  params,
}: {
  params: Promise<{ evaluationId: string }>;
}) {
  const { evaluationId } = await params;
  const { evaluationResults, error } =
    await fetchEvaluationResults(evaluationId);
  if (error !== null) notFound();

  return <EvaluationResults evaluationResults={evaluationResults} />;
}
