import React, { useState } from "react";
import { Button } from "./ui/button";
import { createStripeConnectUrl } from "@/actions/stripeActions";
import toast from "react-hot-toast";

export default function ConnectStripeButton({
  stripeAccountId,
  stripeAccountVerified,
}: {
  stripeAccountId?: string;
  stripeAccountVerified: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    if (!stripeAccountId)
      return toast.error(
        "Failed to initiate Stripe onboarding. Please contact support for assistance.",
      );

    setLoading(true);
    const { url, error } = await createStripeConnectUrl(stripeAccountId);
    if (error === null) {
      window.location.href = url;
    } else {
      toast.error(error);
      setLoading(false);
    }
  }

  if (stripeAccountVerified) return null;

  return (
    <Button
      onClick={handleConnect}
      variant={"outline"}
      disabled={loading}
      className="border-accent-green-100 text-accent-green-100 hover:bg-accent-green-100/10 hover:text-accent-green-100 focus-visible:ring focus-visible:ring-accent-green-100/50"
    >
      {loading ? "Onboarding..." : "Onboard with stripe"}
    </Button>
  );
}
