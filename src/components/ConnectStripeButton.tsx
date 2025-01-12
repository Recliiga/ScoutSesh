"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { UserType } from "@/db/models/User";
import Stripe from "stripe";
import {
  createStripeOnboardingLink,
  disconnectStripe,
} from "@/actions/userActions";

export default function ConnectStripeButton({
  user,
  stripeAccount,
}: {
  user: UserType;
  stripeAccount: Stripe.Response<Stripe.Account> | null;
}) {
  const [loading, setLoading] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(
    !!user.stripeAccountId,
  );

  const accountRestricted = !!stripeAccount?.requirements?.disabled_reason;

  async function handleConnectStripe() {
    setLoading(true);

    // Make the request to initiate the OAuth flow
    const res = await fetch(`/api/stripe/connect`, {
      method: "GET",
    });

    const { url } = await res.json();

    // Redirect the user to the Stripe OAuth page
    if (url) window.location.href = url;
    else setLoading(false);
  }

  async function handleDisconnectStripe() {
    setLoading(true);
    const { error } = await disconnectStripe(user._id);
    if (error === null) setStripeConnected(false);
    setLoading(false);
  }

  async function handleUpdateInformation() {
    setLoading(true);
    const { url } = await createStripeOnboardingLink(user.stripeAccountId);
    if (url) window.location.href = url;
    setLoading(false);
  }

  if (stripeConnected)
    return (
      <Button
        onClick={
          accountRestricted ? handleUpdateInformation : handleDisconnectStripe
        }
        disabled={loading}
        variant={"outline"}
        className="mt-2 border-[#5433ff] text-[#5433ff] hover:bg-[#5433ff]/5 hover:text-[#5433ff]"
      >
        {accountRestricted
          ? loading
            ? "Completing Information..."
            : "Complete Stripe Information"
          : loading
            ? "Disconnecting Stripe..."
            : "Disconnect Stripe"}
      </Button>
    );

  return (
    <Button
      onClick={handleConnectStripe}
      disabled={loading}
      variant={"outline"}
      className="mt-2 border-[#5433ff] text-[#5433ff] hover:bg-[#5433ff]/5 hover:text-[#5433ff]"
    >
      {loading ? "Connecting to Stripe..." : "Connect Your Stripe Account"}
    </Button>
  );
}
