import React from "react";

import { getSession } from "@/services/authServices";
import CoachGroupClassesPage from "@/components/pages/CoachGroupClassesPage";
import AthleteGroupClassesPage from "@/components/pages/AthleteGroupClassesPage";

export default async function AthleteEvaluationPage() {
  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return <AthleteGroupClassesPage />;
  }

  return <CoachGroupClassesPage />;
}
