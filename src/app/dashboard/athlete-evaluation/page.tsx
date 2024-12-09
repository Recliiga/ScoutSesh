import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachAthleteEvaluationPage from "@/components/dashboard-pages/CoachAthleteEvaluationPage";
import UserAthleteEvaluationPage from "@/components/dashboard-pages/UserAthleteEvaluationPage";
import { fetchCoachEvaluationOrders } from "@/services/AthleteEvaluationServices";

export default async function AthleteEvaluationPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Head Coach") {
    const { orders, error } = await fetchCoachEvaluationOrders(user._id);
    if (error !== null) throw new Error(error);

    return <CoachAthleteEvaluationPage orders={orders} />;
  }

  return <UserAthleteEvaluationPage />;
}
