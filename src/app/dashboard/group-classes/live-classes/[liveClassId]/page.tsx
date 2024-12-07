import LiveClassDetails from "@/components/group-classes/LiveClassDetails";
import { fetchGroupClass } from "@/services/groupClassServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function LiveClassDetailsPage({
  params,
}: {
  params: Promise<{ liveClassId: string }>;
}) {
  const { liveClassId } = await params;
  const { groupClass, error } = await fetchGroupClass(liveClassId);
  if (error !== null) throw new Error(error);

  if (!groupClass) notFound();

  return <LiveClassDetails liveClass={groupClass} />;
}