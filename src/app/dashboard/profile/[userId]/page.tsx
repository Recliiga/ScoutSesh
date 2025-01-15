import { getSessionFromHeaders } from "@/services/authServices";
import { fetchUser } from "@/services/userServices";
import { notFound } from "next/navigation";
import React from "react";
import UserProfilePage from "@/components/dashboard-pages/UserProfilePage";
import { fetchUserStripeAccount } from "@/services/stripeServices";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const user = await getSessionFromHeaders();

  const { userId } = await params;

  const { user: profileUser, error } = await fetchUser(userId);
  if (error !== null) notFound();

  const { stripeAccount } = await fetchUserStripeAccount(user.stripeAccountId);
  const stripeAccountVerified = stripeAccount
    ? stripeAccount.requirements?.currently_due?.length === 0
    : false;

  return (
    <UserProfilePage
      user={profileUser}
      isOwnProfile={profileUser._id === user._id}
      stripeAccountVerified={stripeAccountVerified}
    />
  );
}
