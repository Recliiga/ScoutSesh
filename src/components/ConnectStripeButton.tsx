import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  createStripeConnectUrl,
  createStripeLoginLink,
} from "@/actions/stripeActions";
import toast from "react-hot-toast";
import { UserType } from "@/db/models/User";
import Image from "next/image";
import stripeLogo from "@/../public/stripe-logo.jpg";

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
      className="flex items-center gap-2 rounded-full border text-zinc-700 transition-colors duration-200 hover:bg-neutral-100"
    >
      <Image
        src={stripeLogo}
        alt="Stripe logo"
        width={16}
        className="rounded-sm"
      />
      {user.stripeAccountId
        ? loading
          ? "Redirecting..."
          : "Manage stripe account"
        : loading
          ? "Connecting..."
          : "Connect with stripe"}
    </Button>
  );
}
