import PurchaseEvaluationForm from "@/components/athlete-evaluation/PurchaseEvaluationForm";
import { fetchCoachPricingPlan } from "@/services/AEPricingPlanServices";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function RequestEvaluationPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Athlete") notFound();

  if (!user.organization)
    return (
      <div className="flex-center flex-1 text-accent-gray-300">
        You are not connected to an organization
      </div>
    );

  const { pricingPlan } = await fetchCoachPricingPlan(
    String(user.organization.user),
  );

  const clubs = pricingPlan
    ? [
        {
          plan: pricingPlan,
          organization: user.organization,
        },
      ]
    : [];

  return <PurchaseEvaluationForm programs={clubs} />;
}
