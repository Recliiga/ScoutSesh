import React from "react";
import CoachDashboard from "@/components/dashboard-pages/CoachDashboard";
import AthleteDashboard from "@/components/dashboard-pages/AthleteDashboard";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchOrganization } from "@/actions/organizationActions";

export default async function DashboardPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Athlete") {
    const { organization, error } = await fetchOrganization(
      user.organization._id as string
    );
    if (error) throw new Error(error);
    return <AthleteDashboard user={user} organization={organization!} />;
  }

  return <CoachDashboard user={user} />;
}
