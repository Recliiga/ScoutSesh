import React from "react";
import CoachDashboard from "@/components/dashboard-pages/CoachDashboard";
import AthleteDashboard from "@/components/dashboard-pages/AthleteDashboard";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchOrganization } from "@/actions/organizationActions";
import { fetchAllUserJournals } from "@/services/journalServices";

export default async function DashboardPage() {
  const user = await getSessionFromHeaders();
  const { journalEntries, error: journalError } = await fetchAllUserJournals();

  if (journalError !== null) throw new Error(journalError);

  if (user.role === "Athlete") {
    const { organization, error } = await fetchOrganization(
      user.organization?._id
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

  return <CoachDashboard user={user} />;
}
