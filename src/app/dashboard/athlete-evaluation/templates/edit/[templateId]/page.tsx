import AthleteEvaluationTemplateForm from "@/components/athlete-evaluation/AthleteEvaluationTemplateForm";
import { fetchCoachAETemplate } from "@/services/AETemplateServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function EditAthleteEvaluationTemplatePage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const user = await getSessionFromHeaders();
  if (user.role !== "Head Coach") notFound();

  const { templateId } = await params;

  const { template, error } = await fetchCoachAETemplate(user._id, templateId);
  if (error !== null) throw new Error(error);

  if (!template) notFound();
  return <AthleteEvaluationTemplateForm template={template} />;
}
