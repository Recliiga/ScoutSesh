import AthleteEvaluationTemplateForm from "@/components/athlete-evaluation/AthleteEvaluationTemplateForm";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function CreateAthleteEvaluationTemplatePage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Head Coach") notFound();

  return <AthleteEvaluationTemplateForm />;
}
