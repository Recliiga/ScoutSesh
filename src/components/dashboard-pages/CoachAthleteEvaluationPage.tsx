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
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { getFullname } from "@/lib/utils";
import Link from "next/link";

// const allAthletesNeedingEvaluation = [
//   {
//     _id: 1,
//     name: "John Doe",
//     lastEvaluation: "September 23, 2024",
//     completeBy: "October 23, 2024",
//     plan: "Monthly",
//     photo: "/placeholder-profile-picture.png",
//   },
//   {
//     _id: 2,
//     name: "Jane Smith",
//     lastEvaluation: "July 25, 2024",
//     completeBy: "October 25, 2024",
//     plan: "Quarterly",
//     photo: "/placeholder-profile-picture.png",
//   },
//   {
//     _id: 3,
//     name: "Mike Johnson",
//     lastEvaluation: "March 28, 2024",
//     completeBy: "October 28, 2024",
//     plan: "Semi Annual",
//     photo: "/placeholder-profile-picture.png",
//   },
//   {
//     _id: 4,
//     name: "Emily Brown",
//     lastEvaluation: "November 5, 2023",
//     completeBy: "November 5, 2024",
//     plan: "Yearly",
//     photo: "/placeholder-profile-picture.png",
//   },
//   {
//     _id: 5,
//     name: "Alex Lee",
//     lastEvaluation: "September 21, 2024",
//     completeBy: "February 15, 2025",
//     plan: "Custom",
//     photo: "/placeholder-profile-picture.png",
//   },
//   {
//     _id: 6,
//     name: "Sarah Johnson",
//     lastEvaluation: "October 1, 2024",
//     completeBy: "March 1, 2025",
//     plan: "Semi Annual",
//     photo: "/placeholder-profile-picture.png",
//   },
//   {
//     _id: 7,
//     name: "Tom Wilson",
//     lastEvaluation: "October 15, 2024",
//     completeBy: "April 15, 2025",
//     plan: "Quarterly",
//     photo: "/placeholder-profile-picture.png",
//   },
// ];

// const sortedAthletes = [...allAthletesNeedingEvaluation].sort(
//   (a, b) => new Date(a.completeBy).getTime() - new Date(b.completeBy).getTime(),
// );

export default function CoachAthleteEvaluationPage({
  orders,
}: {
  orders: AthleteEvaluationOrderType[];
}) {
  const sortedOrders = orders;
  return (
    <main className="flex-grow">
      <div className="mx-auto w-[90%] max-w-6xl py-6 sm:py-8">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-3xl font-semibold">Upcoming Evaluations</h2>
          <div className="overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="sticky top-0 w-1/4 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Athlete
                    </th>
                    <th className="sticky top-0 w-1/6 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Plan
                    </th>
                    <th className="sticky top-0 w-1/6 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Last Evaluation
                    </th>
                    <th className="sticky top-0 w-1/6 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Complete By
                    </th>
                    <th className="sticky top-0 w-1/4 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sortedOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden">
                            <Image
                              className="h-full w-full rounded-full object-cover"
                              src={order.athlete.profilePicture}
                              alt={getFullname(order.athlete)}
                              fill
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {getFullname(order.athlete)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.plan}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {/* {order.lastEvaluation} */}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {/* {order.completeBy} */}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex space-x-2">
                          <Link
                            href={`/dashboard/athlete-evaluation/evaluate/${order._id}`}
                            className="flex items-center rounded-md border border-green-600 bg-white px-4 py-2 text-xs font-medium text-green-600 hover:bg-green-600 hover:text-white"
                          >
                            <ClipboardIcon className="mr-2 h-4 w-4" />
                            Evaluate
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-600 bg-white text-green-600 hover:bg-green-600 hover:text-white"
                          >
                            <UserPlusIcon className="mr-2 h-4 w-4" />
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          <EvaluationCard
            title="Evaluation Pricing"
            description="Customize and manage your pricing structure for athlete evaluations. Optimize your rates to reflect your expertise and market demand."
            icon={<ClipboardIcon className="h-8 w-8 text-green-600" />}
            action="Manage Pricing"
            href="/dashboard/athlete-evaluation/pricing"
          />
          <EvaluationCard
            title="Evaluation Template"
            description="Modify the current evaluation template or create a new one."
            icon={<FileEditIcon className="h-8 w-8 text-green-600" />}
            action="View Templates"
            href="/dashboard/athlete-evaluation/templates"
          />
          <EvaluationCard
            title="All Evaluations"
            description="View and manage all athlete evaluations, including past records and current statuses. Access detailed reports and track evaluation history."
            icon={<UsersIcon className="h-8 w-8 text-green-600" />}
            action="View Evaluations"
            href="#"
          />
        </div>
      </div>
    </main>
  );
}
