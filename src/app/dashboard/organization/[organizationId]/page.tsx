import OrganizationProfile from "@/components/dashboard-pages/OrganizationProfile";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchOrganizationData } from "@/services/organizationServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function OrganizationProfilePage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const user = await getSessionFromHeaders();

  const { organizationId } = await params;

  const { organization, error } = await fetchOrganizationData(organizationId);
  if (error !== null) notFound();

  const isOrganizationHeadCoach = user._id === organization.user._id;

  return (
    <OrganizationProfile
      organization={organization}
      isOrganizationHeadCoach={isOrganizationHeadCoach}
    />
  );
}
