import React from "react";

import { getSession } from "@/services/authServices";
import CoachTeamMembersPage from "@/components/pages/CoachTeamMembersPage";

export default async function TeamMembersPage() {
  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return null;
  }

  return <CoachTeamMembersPage />;
}
