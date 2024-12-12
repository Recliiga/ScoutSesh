import React from "react";
import AthleteEvaluationRecordsPage from "@/components/athlete-evaluation/AthleteEvaluationRecordsPage";
import {
  fetchAthleteEvaluations,
  fetchCoachEvaluationOrders,
  fetchCoachEvaluations,
} from "@/services/AthleteEvaluationServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import CoachAllEvaluationsPage from "@/components/athlete-evaluation/CoachAllEvaluationsPage";

export default async function EvaluationRecordsPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    const { evaluations, error } = await fetchAthleteEvaluations(user._id);
    if (error !== null) throw new Error(error);

    return <AthleteEvaluationRecordsPage evaluationRecords={evaluations} />;
  }

  if (user.role === "Head Coach") {
    const { orders, error } = await fetchCoachEvaluationOrders(user._id);
    if (error !== null) throw new Error(error);

    const { evaluations, error: evaluationError } = await fetchCoachEvaluations(
      user._id,
    );
    if (evaluationError !== null) throw new Error(evaluationError);

    return (
      <CoachAllEvaluationsPage orders={orders} coachEvaluations={evaluations} />
    );
  }

  notFound();
}
