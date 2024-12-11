import React from "react";
import AthleteEvaluationRecordsPage from "@/components/athlete-evaluation/AthleteEvaluationRecordsPage";
import { fetchAthleteEvaluations } from "@/services/AthleteEvaluationServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";

export default async function EvaluationRecordsPage() {
  const user = await getSessionFromHeaders();

  if (user.role !== "Athlete") notFound();

  const { evaluations, error } = await fetchAthleteEvaluations(user._id);
  if (error !== null) throw new Error(error);

  return <AthleteEvaluationRecordsPage evaluationRecords={evaluations} />;
}
