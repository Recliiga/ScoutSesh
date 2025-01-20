import LiveClassDetails from "@/components/group-classes/LiveClassDetails";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchGroupClass } from "@/services/groupClassServices";
import { fetchUserOrders } from "@/services/groupClassOrderServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function LiveClassDetailsPage({
  params,
}: {
  params: Promise<{ liveClassId: string }>;
}) {
  const user = await getSessionFromHeaders();

  const { liveClassId } = await params;

  const { groupClass, error } = await fetchGroupClass(liveClassId);
  if (error !== null) throw new Error(error);

  if (!groupClass) notFound();

  const { userOrders, error: orderError } = await fetchUserOrders(user._id);
  if (orderError !== null) throw new Error(orderError);

  if (
    !userOrders.some((order) => order.course?._id === groupClass._id) &&
    groupClass.coaches[0]._id !== user._id
  )
    notFound();

  return <LiveClassDetails liveClass={groupClass} user={user} />;
}
