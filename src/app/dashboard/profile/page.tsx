import CoachProfilePage from "@/components/dashboard-pages/CoachProfilePage";
import { getSessionFromHeaders } from "@/services/authServices";
import React from "react";

export default async function ProfilePage() {
  const user = await getSessionFromHeaders();

  if (user.role === "Head Coach") {
    return <CoachProfilePage user={user} />;
  }
  return <div>ProfilePage</div>;
}
