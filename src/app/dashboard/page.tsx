import React from "react";
import CoachDashboard from "@/components/dashboard-pages/CoachDashboard";
import AthleteDashboard from "@/components/dashboard-pages/AthleteDashboard";
import { getSessionFromHeaders } from "@/services/authServices";

export default async function DashboardPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    return <AthleteDashboard user={user} />;
  }
  return <CoachDashboard user={user} />;
}
