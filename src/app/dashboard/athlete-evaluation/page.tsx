import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachAthleteEvaluationPage from "@/components/dashboard-pages/CoachAthleteEvaluationPage";
import UserAthleteEvaluationPage from "@/components/dashboard-pages/UserAthleteEvaluationPage";
import {
  fetchAthleteEvaluationOrders,
  fetchCoachEvaluationOrders,
  fetchEvaluationsByCoach,
} from "@/services/AthleteEvaluationServices";
import { fetchCoachPricingPlan } from "@/services/AEPricingPlanServices";

export default async function AthleteEvaluationPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Head Coach") {
    const { orders, error } = await fetchCoachEvaluationOrders(user._id);
    if (error !== null) throw new Error(error);

    const { pricingPlan, error: pricingPlanError } =
      await fetchCoachPricingPlan(user._id);
    if (pricingPlanError !== null) throw new Error(pricingPlanError);

    const { evaluations, error: evaluationError } =
      await fetchEvaluationsByCoach(user._id);
    if (evaluationError !== null) throw new Error(evaluationError);

    return (
      <CoachAthleteEvaluationPage
        coachEvaluations={evaluations}
        orders={orders}
        hasPricingPlan={Boolean(pricingPlan)}
      />
    );
  }
  const { orders, error } = await fetchAthleteEvaluationOrders(user._id);
  if (error !== null) throw new Error(error);

  return <UserAthleteEvaluationPage orders={orders} />;
}
