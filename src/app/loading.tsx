import React from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getSessionFromHeaders } from "@/services/authServices";

export default async function FullPageLoader() {
  const user = await getSessionFromHeaders();

  return (
    <>
      <DashboardHeader user={user} invitationCode={null} notifications={[]} />
      <div className="flex-center flex-1">
        <LoadingIndicator color="#16A34A" size={28} />
      </div>
    </>
  );
}
