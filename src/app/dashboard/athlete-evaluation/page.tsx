import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachAthleteEvaluationPage from "@/components/dashboard-pages/CoachAthleteEvaluationPage";
import UserAthleteEvaluationPage from "@/components/dashboard-pages/UserAthleteEvaluationPage";

export default async function AthleteEvaluationPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <UserAthleteEvaluationPage />;
  }

  return <CoachAthleteEvaluationPage />;
}
