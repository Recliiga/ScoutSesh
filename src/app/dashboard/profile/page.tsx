import { getSessionFromHeaders } from "@/services/authServices";
import React from "react";
import UserProfilePage from "@/components/dashboard-pages/UserProfilePage";

export default async function ProfilePage() {
  const user = await getSessionFromHeaders();

  return <UserProfilePage user={user} isOwnProfile={true} />;
}
