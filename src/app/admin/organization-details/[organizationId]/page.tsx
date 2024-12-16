import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchOrganizationData } from "@/services/adminServices";
import { notFound } from "next/navigation";
import OrganizationDetailsPageMain from "@/components/admin/OrganizationDetailsPageMain";

export default async function OrganizationDetailsPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  const { organizationData, error } =
    await fetchOrganizationData(organizationId);
  if (error !== null) notFound();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="flex items-center text-3xl font-bold text-gray-900">
            <Link href="/admin" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            {organizationData.organization.name}
          </h1>
          <Badge variant="secondary" className="text-lg">
            Members: {organizationData.teamMembers.length}
          </Badge>
        </div>
      </header>
      <OrganizationDetailsPageMain organizationData={organizationData} />
    </div>
  );
}
