"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { UserType } from "@/db/models/User";

export default function ConnectStripeButton({ user }: { user: UserType }) {
  const [loading, setLoading] = useState(false);

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
