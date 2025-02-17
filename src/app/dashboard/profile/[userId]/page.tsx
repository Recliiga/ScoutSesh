import { getSessionFromHeaders } from "@/services/authServices";
import { fetchUser } from "@/services/userServices";
import { notFound } from "next/navigation";
import React from "react";
import UserProfilePage from "@/components/dashboard-pages/UserProfilePage";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const user = await getSessionFromHeaders();

  const { userId } = await params;

  const { user: profileUser, error } = await fetchUser(userId);
  if (error !== null) notFound();

  return (
    <UserProfilePage
      user={profileUser}
      isOwnProfile={profileUser._id === user._id}
      canMessageUser={user.role !== "Athlete"}
    />
  );
}
