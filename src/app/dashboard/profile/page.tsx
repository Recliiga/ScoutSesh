import { getSessionFromHeaders } from "@/services/authServices";
import React from "react";
import UserProfilePage from "@/components/dashboard-pages/UserProfilePage";
import {
  fetchCountries,
  fetchUserStripeAccount,
} from "@/services/userServices";

export default async function ProfilePage() {
  const user = await getSessionFromHeaders();

  const { account } = await fetchUserStripeAccount(user.stripeAccountId);

  const { countries } = await fetchCountries();

  return (
    <UserProfilePage
      user={user}
      isOwnProfile={true}
      stripeAccount={account}
      countries={countries}
    />
  );
}
