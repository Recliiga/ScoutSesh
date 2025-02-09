"use client";
import React from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { usePathname } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function FullPageLoader() {
  const pathname = usePathname();

  return (
    <>
      {pathname.startsWith("/dashboard/messages") && (
        <DashboardHeader invitationCode={null} notifications={[]} />
      )}
      <div className="flex-center flex-1">
        <LoadingIndicator color="#16A34A" size={28} />
      </div>
    </>
  );
}
