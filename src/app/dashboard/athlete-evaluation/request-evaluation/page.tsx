import PurchaseEvaluationForm from "@/components/athlete-evaluation/PurchaseEvaluationForm";
import { fetchPricingPlanByCoach } from "@/services/AEPricingPlanServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function RequestEvaluationPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  if (!user.organization)
    return (
      <div className="flex-center flex-1">
        You are not connected to an organization
      </div>
    );

  const { pricingPlans, error } = await fetchPricingPlanByCoach(
    String(user.organization.user),
  );
  if (error !== null) throw new Error(error);

  const clubs = pricingPlans.map((plan) => ({
    plan,
    organization: user.organization!,
  }));

  return <PurchaseEvaluationForm programs={clubs} />;
}
