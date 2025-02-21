import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AthleteEvaluationPricingForm from "@/components/athlete-evaluation/AthleteEvaluationPricingForm";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import { fetchCoachPricingPlan } from "@/services/AEPricingPlanServices";

export const metadata = {
  title: "Athlete Evaluation Pricing",
  description: "Set up and manage your athlete evaluation pricing plans",
};

export default async function CreateAthleteEvaluationPricingPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Head Coach") notFound();

  const { pricingPlan, error } = await fetchCoachPricingPlan(user._id);
  if (error !== null) throw new Error(error);

  return (
    <main className="container mx-auto w-[90%] max-w-5xl flex-1 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Set Up Your Athlete Evaluation Pricing Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AthleteEvaluationPricingForm pricingPlan={pricingPlan} />
        </CardContent>
      </Card>
    </main>
  );
}
