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
        <div className="mx-auto flex max-w-7xl px-4 py-4 sm:items-center sm:px-6 sm:py-6 lg:px-8">
          <Link href="/admin" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex flex-1 flex-col justify-between gap-x-4 sm:flex-row sm:items-center">
            <h1 className="flex items-center text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
              {organizationData.organization.name}
            </h1>
            <Badge variant="secondary" className="w-fit text-base lg:text-lg">
              Members: {organizationData.teamMembers.length}
            </Badge>
          </div>
        </div>
      </header>
      <OrganizationDetailsPageMain organizationData={organizationData} />
    </div>
  );
}
