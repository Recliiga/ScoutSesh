import EvaluationForm from "@/components/athlete-evaluation/EvaluationForm";
import { fetchLatestAthleteEvaluationOrder } from "@/services/AthleteEvaluationServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function SelfEvaluationPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  const { order, error } = await fetchLatestAthleteEvaluationOrder(user._id);
  if (error !== null) throw new Error(error);

  return <EvaluationForm order={order} />;
}
