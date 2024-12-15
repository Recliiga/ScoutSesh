import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchOrganization } from "@/services/organizationServices";
import { notFound } from "next/navigation";
import OrganizationDetailsPageMain from "@/components/admin/OrganizationDetailsPageMain";
import { fetchTeamMembers } from "@/services/userServices";

export default async function OrganizationDetailsPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  const { organization } = await fetchOrganization(organizationId);
  if (!organization) notFound();

  const { teamMembers, error } = await fetchTeamMembers(organizationId);
  if (error !== null) notFound();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex items-center text-3xl font-bold text-gray-900">
            <Link href="/admin" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            {organization.name}
          </h1>
          <Badge variant="secondary" className="text-lg">
            Members: {24}
          </Badge>
        </div>
      </header>
      <OrganizationDetailsPageMain
        organization={organization}
        teamMembers={teamMembers}
      />
    </div>
  );
}
