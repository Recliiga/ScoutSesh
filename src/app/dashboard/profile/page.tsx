import { getSessionFromHeaders } from "@/services/authServices";
import React from "react";
import UserProfilePage from "@/components/dashboard-pages/UserProfilePage";
import { fetchUserStripeAccount } from "@/services/stripeServices";

export default async function ProfilePage() {
  const user = await getSessionFromHeaders();

  const { stripeAccount } = await fetchUserStripeAccount(user.stripeAccountId);
  const stripeAccountVerified = stripeAccount
    ? stripeAccount.requirements?.currently_due?.length === 0
    : false;

  return (
    <UserProfilePage
      user={user}
      isOwnProfile={true}
      stripeAccountVerified={stripeAccountVerified}
    />
  );
}
