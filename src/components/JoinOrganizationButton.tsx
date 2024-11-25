"use client";
import { joinTeam } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function JoinOrganizationButton({
  organizationId,
}: {
  organizationId: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleJoinTeam() {
    setLoading(true);
    const { error } = await joinTeam(organizationId);
    if (!error) {
      router.replace("/dashboard");
    }
    setLoading(false);
  }

  return (
    <button
      disabled={loading}
      onClick={handleJoinTeam}
      className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 mt-4 px-4 py-2 rounded-md font-medium text-white"
    >
      {loading ? "Joining..." : "Join Team"}
    </button>
  );
}
