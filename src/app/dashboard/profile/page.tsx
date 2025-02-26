import { getSession } from "@/services/authServices";
import React from "react";
import UserProfilePage from "@/components/dashboard-pages/UserProfilePage";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Profile",
  description: "View and edit your profile.",
};

export default async function ProfilePage() {
  const { user } = await getSession();
  if (!user) notFound();

  return <UserProfilePage user={user} isOwnProfile={true} />;
}
