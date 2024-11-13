import React from "react";

import { getSession } from "@/services/authServices";
import CoachAthleteEvaluationPage from "@/components/pages/CoachAthleteEvaluationPage";
import UserAthleteEvaluationPage from "@/components/pages/UserAthleteEvaluationPage";

export default async function AthleteEvaluationPage() {
  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return <UserAthleteEvaluationPage />;
  }

  return <CoachAthleteEvaluationPage />;
}
