import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AthleteEvaluationPricingForm from "@/components/athlete-evaluation/AthleteEvaluationPricingForm";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";

export default async function CreateAthleteEvaluationPricingPage() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Head Coach") notFound();

  return (
    <main className="flex-1 container mx-auto max-w-5xl w-[90%] py-8 ">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Set Up Your Athlete Evaluation Pricing Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AthleteEvaluationPricingForm />
        </CardContent>
      </Card>
    </main>
  );
}
