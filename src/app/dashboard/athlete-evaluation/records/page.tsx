import React from "react";
import AthleteEvaluationRecordsPage from "@/components/athlete-evaluation/AthleteEvaluationRecordsPage";
import { fetchEvaluationsByAthlete } from "@/services/AthleteEvaluationServices";
import { getSessionFromHeaders } from "@/services/authServices";

// Mock data for evaluation records

export default async function EvaluationRecordsPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    const { evaluations, error } = await fetchEvaluationsByAthlete(user._id);
    if (error !== null) throw new Error(error);
    return <AthleteEvaluationRecordsPage evaluationRecords={evaluations} />;
  }
}
