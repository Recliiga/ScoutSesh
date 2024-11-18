import React from "react";
import CoachDashboard from "@/components/pages/CoachDashboard";
import { getSession } from "@/services/authServices";
import AthleteDashboard from "@/components/pages/AthleteDashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { user } = await getSession();

  if (!user) redirect("/login");

  if (user.role === "Athlete") {
    return <AthleteDashboard user={user} />;
  }
  return <CoachDashboard user={user} />;
}
