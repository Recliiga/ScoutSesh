import React from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function FullPageLoader() {
  return (
    <>
      <DashboardHeader invitationCode={null} notifications={[]} />
      <div className="flex-center flex-1">
        <LoadingIndicator color="#16A34A" size={28} />
      </div>
    </>
  );
}
