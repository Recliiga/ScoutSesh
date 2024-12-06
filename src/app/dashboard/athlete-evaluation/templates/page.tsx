import React from "react";
import Link from "next/link";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import AthleteEvaluationTemplateList from "@/components/athlete-evaluation/AthleteEvaluationTemplateList";
import { PlusIcon } from "lucide-react";
import { fetchCoachAETemplates } from "@/services/AETemplateServices";

export default async function AthleteEvaluationTemplates() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Head Coach") notFound();

  const { templates, error } = await fetchCoachAETemplates(user._id);
  if (error !== null) throw new Error(error);

  return (
    <main className="container mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-6 py-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="mb-4 text-2xl font-semibold sm:text-3xl">
            Athlete Evaluation Templates
          </h1>
        </div>
        <Link
          href={"/dashboard/athlete-evaluation/templates/new"}
          className="flex items-center rounded-md bg-green-600 px-4 py-2 text-sm text-white duration-200 hover:bg-green-700"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Create New Template
        </Link>
      </div>

      <AthleteEvaluationTemplateList templates={templates} />
      <div className="mt-auto flex justify-end">
        <Link
          href={"/dashboard/athlete-evaluation"}
          className="flex items-center rounded-md border px-4 py-2 text-sm font-medium duration-200 hover:bg-accent-gray-100"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
