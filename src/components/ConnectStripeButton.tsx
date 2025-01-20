import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  createStripeConnectUrl,
  createStripeLoginLink,
} from "@/actions/stripeActions";
import toast from "react-hot-toast";
import { UserType } from "@/db/models/User";

export default function ConnectStripeButton({ user }: { user: UserType }) {
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    const { url, error } = await createStripeConnectUrl(user);
    if (error === null) {
      window.location.href = url;
    } else {
      toast.error(error);
      setLoading(false);
    }
  }

  async function handleRedirectToStripeDashboard() {
    if (!user.stripeAccountId) {
      toast.error(
        "Invalid stripe account ID. Please complete your stripe onboarding",
      );
      return;
    }
    setLoading(true);
    const { url, error } = await createStripeLoginLink(user.stripeAccountId);
    if (error === null) {
      window.open(url, "_blank");
    } else {
      toast.error(error);
    }
    setLoading(false);
  }

  return (
    <Button
      onClick={
        user.stripeAccountId ? handleRedirectToStripeDashboard : handleConnect
      }
      variant={"outline"}
      disabled={loading}
      className="border-accent-green-100 text-accent-green-100 hover:bg-accent-green-100/10 hover:text-accent-green-100 focus-visible:ring focus-visible:ring-accent-green-100/50"
    >
      {user.stripeAccountId
        ? loading
          ? "Redirecting..."
          : "Manage stripe account"
        : loading
          ? "Onboarding..."
          : "Onboard with stripe"}
    </Button>
  );
}
