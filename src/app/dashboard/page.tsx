import React from "react";
import CoachDashboard from "@/components/dashboard-pages/CoachDashboard";
import AthleteDashboard from "@/components/dashboard-pages/AthleteDashboard";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchOrganization } from "@/actions/organizationActions";
import { fetchAllUserJournals } from "@/services/journalServices";
import { fetchCoachEvaluationOrders } from "@/services/AthleteEvaluationServices";

export default async function DashboardPage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Head Coach") {
    const { orders, error } = await fetchCoachEvaluationOrders(user._id);
    if (error !== null) throw new Error(error);

    return <CoachDashboard user={user} orders={orders} />;
  }

  const { journalEntries, error: journalError } = await fetchAllUserJournals();
  if (journalError !== null) throw new Error(journalError);

  const { organization, error } = await fetchOrganization(
    user.organization?._id,
  );
  if (error !== null) throw new Error(error);

  return (
    <AthleteDashboard
      user={user}
      organization={organization}
      journalEntries={journalEntries}
    />
  );
}
