import React from "react";
import BackButton from "@/components/dashboard/BackButton";
import Link from "next/link";
import { getSessionFromHeaders } from "@/services/authServices";
import { notFound } from "next/navigation";
import AETemplateList from "@/components/athlete-evaluation/AETemplateList";
import { PlusIcon } from "lucide-react";

const templates = [
  {
    id: 1,
    fileName: "Standard Hockey Evaluation",
    lastModified: "2024-10-15",
  },
  {
    id: 2,
    fileName: "Goalie Specific Evaluation",
    lastModified: "2024-09-28",
  },
  { id: 3, fileName: "Youth Player Assessment", lastModified: "2024-08-05" },
  { id: 4, fileName: "Pro Scouting Template", lastModified: "2024-07-12" },
  {
    id: 5,
    fileName: "Skill Development Tracker",
    lastModified: "2024-06-20",
  },
];

export default async function AthleteEvaluationTemplates() {
  const user = await getSessionFromHeaders();
  if (user.role !== "Head Coach") notFound();

  return (
    <main className="flex-1 container mx-auto w-[90%] max-w-7xl py-8">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
            Athlete Evaluation Templates
          </h1>
        </div>
        <Link
          href={"/dashboard/athlete-evaluation/templates/new"}
          className="bg-green-600 text-white flex items-center hover:bg-green-700 text-sm rounded-md px-4 py-2 duration-200"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create New Template
        </Link>
      </div>

      <AETemplateList templates={templates} />
      <div className="mt-8 flex justify-end">
        <BackButton />
      </div>
    </main>
  );
}
