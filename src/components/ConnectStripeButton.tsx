import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  createStripeConnectUrl,
  createStripeUpdateUrl,
} from "@/actions/stripeActions";
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
    if (!stripeAccountId) return;
    setLoading(true);
    const data = await createStripeConnectUrl(stripeAccountId);
    if (data?.error) {
      toast.error(data.error);
      setLoading(false);
    }
  }

  async function handleUpdate() {
    if (!stripeAccountId) return;
    setLoading(true);
    const data = await createStripeUpdateUrl(stripeAccountId);
    if (data?.error) {
      toast.error(data.error);
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={stripeAccountVerified ? handleUpdate : handleConnect}
      variant={"outline"}
      disabled={loading}
      className="border-accent-green-100 text-accent-green-100 hover:bg-accent-green-100/10 hover:text-accent-green-100"
    >
      {stripeAccountVerified
        ? loading
          ? "Updating..."
          : "Update stripe information"
        : loading
          ? "Connecting..."
          : "Connect stripe"}
    </Button>
  );
}
