"use client";

import { joinTeam } from "@/actions/userActions";
import React, { useState } from "react";

export default function JoinOrganizationButton({
  organizationId,
  coachId,
}: {
  organizationId: string;
  coachId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleJoinTeam() {
    setLoading(true);
    const data = await joinTeam(organizationId, coachId);
    if (data?.error) {
      setLoading(false);
    }
  }

  return (
    <button
      disabled={loading}
      onClick={handleJoinTeam}
      className="mt-4 rounded-md bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 disabled:bg-green-500/50"
    >
      {loading ? "Joining..." : "Join Team"}
    </button>
  );
}
