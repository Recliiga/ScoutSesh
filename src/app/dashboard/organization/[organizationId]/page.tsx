import OrganizationProfile from "@/components/dashboard-pages/OrganizationProfile";
import { getSessionFromHeaders } from "@/services/authServices";
import { fetchOrganization } from "@/services/organizationServices";
import { fetchCountries } from "@/services/userServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function OrganizationProfilePage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const user = await getSessionFromHeaders();

  const { organizationId } = await params;

  const { organization, error } = await fetchOrganization(organizationId);
  if (error !== null) notFound();

  const isOrganizationHeadCoach = user._id === organization.user._id;

  const { countries } = await fetchCountries();

  return (
    <OrganizationProfile
      organization={organization}
      isOrganizationHeadCoach={isOrganizationHeadCoach}
      countries={countries}
    />
  );
}
