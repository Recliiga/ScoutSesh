import PurchaseEvaluationForm from "@/components/athlete-evaluation/PurchaseEvaluationForm";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function RequestEvaluationPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  return <PurchaseEvaluationForm />;
}
