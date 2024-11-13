import React from "react";

import { getSession } from "@/services/authServices";
import CoachAthleteEvaluationPage from "@/components/CoachAthleteEvaluationPage";
import UserAthleteEvaluationPage from "@/components/UserAthleteEvaluationPage";

export default async function AthleteEvaluationPage() {
  // Sort all athletes by completion date

  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return <UserAthleteEvaluationPage />;
  }

  return <CoachAthleteEvaluationPage />;
}
