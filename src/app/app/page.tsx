import React from "react";
import CoachDashboard from "@/components/CoachDashboard";
import { getSession } from "@/services/authServices";
import AthleteDashboard from "@/components/AthleteDashboard";

export default async function DashboardPage() {
  const { user } = await getSession();

  if (!user) return;

  if (user.role === "Athlete") {
    return <AthleteDashboard user={user} />;
  }
  return <CoachDashboard user={user} />;
}
