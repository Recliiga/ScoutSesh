import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ClipboardIcon,
  FileEditIcon,
  UsersIcon,
  UserPlusIcon,
} from "lucide-react";
import EvaluationCard from "@/components/athlete-evaluation/EvaluationCard";

const allAthletesNeedingEvaluation = [
  {
    id: 1,
    name: "John Doe",
    lastEvaluation: "September 23, 2024",
    completeBy: "October 23, 2024",
    plan: "Monthly",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastEvaluation: "July 25, 2024",
    completeBy: "October 25, 2024",
    plan: "Quarterly",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 3,
    name: "Mike Johnson",
    lastEvaluation: "March 28, 2024",
    completeBy: "October 28, 2024",
    plan: "Semi Annual",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 4,
    name: "Emily Brown",
    lastEvaluation: "November 5, 2023",
    completeBy: "November 5, 2024",
    plan: "Yearly",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 5,
    name: "Alex Lee",
    lastEvaluation: "September 21, 2024",
    completeBy: "February 15, 2025",
    plan: "Custom",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    lastEvaluation: "October 1, 2024",
    completeBy: "March 1, 2025",
    plan: "Semi Annual",
    photo: "/placeholder-profile-picture.png",
  },
  {
    id: 7,
    name: "Tom Wilson",
    lastEvaluation: "October 15, 2024",
    completeBy: "April 15, 2025",
    plan: "Quarterly",
    photo: "/placeholder-profile-picture.png",
  },
];

const sortedAthletes = [...allAthletesNeedingEvaluation].sort(
  (a, b) => new Date(a.completeBy).getTime() - new Date(b.completeBy).getTime()
);

export default function CoachAthleteEvaluationPage() {
  return (
    <main className="flex-grow">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <div className="bg-white shadow-lg mb-8 p-6 rounded-lg">
          <h2 className="mb-6 font-semibold text-3xl">Upcoming Evaluations</h2>
          <div className="overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="divide-y divide-gray-200 min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="top-0 sticky bg-gray-50 px-6 py-3 w-1/4 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Athlete
                    </th>
                    <th className="top-0 sticky bg-gray-50 px-6 py-3 w-1/6 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="top-0 sticky bg-gray-50 px-6 py-3 w-1/6 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Last Evaluation
                    </th>
                    <th className="top-0 sticky bg-gray-50 px-6 py-3 w-1/6 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Complete By
                    </th>
                    <th className="top-0 sticky bg-gray-50 px-6 py-3 w-1/4 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedAthletes.map((athlete) => (
                    <tr key={athlete.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <Image
                              className="rounded-full w-10 h-10"
                              src={athlete.photo}
                              alt=""
                              width={40}
                              height={40}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 text-sm">
                              {athlete.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 text-sm">
                          {athlete.plan}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 text-sm">
                          {athlete.lastEvaluation}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 text-sm">
                          {athlete.completeBy}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white"
                          >
                            <ClipboardIcon className="mr-2 w-4 h-4" />
                            Evaluate
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-600 bg-white hover:bg-green-600 text-green-600 hover:text-white"
                          >
                            <UserPlusIcon className="mr-2 w-4 h-4" />
                            Assign to
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <EvaluationCard
            title="Evaluation Pricing"
            description="Customize and manage your pricing structure for athlete evaluations. Optimize your rates to reflect your expertise and market demand."
            icon={<ClipboardIcon className="w-8 h-8 text-green-600" />}
            action="Manage Pricing"
            href="/dashboard/athlete-evaluation/pricing"
            />
          <EvaluationCard
            title="Evaluation Template"
            description="Modify the current evaluation template or create a new one."
            icon={<FileEditIcon className="w-8 h-8 text-green-600" />}
            action="Edit Template"
            href="#"
            />
          <EvaluationCard
            title="All Evaluations"
            description="View and manage all athlete evaluations, including past records and current statuses. Access detailed reports and track evaluation history."
            icon={<UsersIcon className="w-8 h-8 text-green-600" />}
            action="View Evaluations"
            href="#"
          />
        </div>
      </div>
    </main>
  );
}
