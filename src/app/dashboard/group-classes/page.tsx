import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachGroupClassesPage from "@/components/dashboard-pages/CoachGroupClassesPage";
import AthleteGroupClassesPage from "@/components/dashboard-pages/AthleteGroupClassesPage";

export default async function AthleteEvaluationPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteGroupClassesPage />;
  }

  return <CoachGroupClassesPage />;
}
