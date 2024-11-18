import React from "react";

import { getSessionFromHeaders } from "@/services/authServices";
import CoachGroupClassesPage from "@/components/pages/CoachGroupClassesPage";
import AthleteGroupClassesPage from "@/components/pages/AthleteGroupClassesPage";

export default async function AthleteEvaluationPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteGroupClassesPage />;
  }

  return <CoachGroupClassesPage />;
}
