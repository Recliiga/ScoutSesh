import React from "react";
import Link from "next/link";

import EvaluationResultsTable from "@/components/admin/EvaluationResultsTable";
import { ArrowLeft } from "lucide-react";
import { fetchEvaluationsByOrganization } from "@/services/adminServices";

export default async function AthleteEvaluations({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;

  const { evaluations, error } =
    await fetchEvaluationsByOrganization(organizationId);
  if (error !== null) throw new Error(error);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl px-4 py-4 sm:items-center sm:px-6 sm:py-6 lg:px-8">
          <Link href="/admin" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="flex items-center text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
            Athlete Evaluations
          </h1>
        </div>
      </header>

      <EvaluationResultsTable evaluations={evaluations} />
    </div>
  );
}
