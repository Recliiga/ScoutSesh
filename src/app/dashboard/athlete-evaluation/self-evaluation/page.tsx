import SelfEvaluationForm from "@/components/athlete-evaluation/SelfEvaluationForm";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function SelfEvaluationPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  return <SelfEvaluationForm primarySport={user.primarySport} />;
}
