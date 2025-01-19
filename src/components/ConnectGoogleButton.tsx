"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { UserType } from "@/db/models/User";
import Image from "next/image";
import googleIcon from "@/../public/google-icon.webp";

export default function ConnectGoogleButton({ user }: { user: UserType }) {
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch("/api/oauth2/initiate", {
        method: "POST",
        body: JSON.stringify({ userId: user._id }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error("response error");
      window.location.href = url;
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error("An error occured connecting google");
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleConnect}
      variant={"outline"}
      disabled={loading}
      className="flex items-center gap-2 rounded-full border text-zinc-700 transition-colors duration-200 hover:bg-neutral-100"
    >
      <Image src={googleIcon} alt="Google Icon" width={16} />
      Connect Google
    </Button>
  );
}
