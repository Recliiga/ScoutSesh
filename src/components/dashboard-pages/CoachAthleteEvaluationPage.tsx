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
import { formatDate, getFullname, getNextEvaluationDueDate } from "@/lib/utils";
import Link from "next/link";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";

type PropsType = {
  orders: AthleteEvaluationOrderType[];
  hasPricingPlan: boolean;
  coachEvaluations: AthleteEvaluationType[];
};

export default function CoachAthleteEvaluationPage({
  orders,
  hasPricingPlan,
  coachEvaluations,
}: PropsType) {
  const sortedOrders = orders;

  function getLastEvaluationDate(order: AthleteEvaluationOrderType) {
    return coachEvaluations.find(
      (evaluation) => String(evaluation.order) === order._id,
    )?.createdAt;
  }

  function canEvaluate(order: AthleteEvaluationOrderType) {
    return !order.evaluationDates.some(
      (date) => date.dateCoachEvaluated && !date.dateAthleteEvaluated,
    );
  }

  return (
    <main className="flex-grow">
      <div className="mx-auto w-[90%] max-w-6xl py-6 sm:py-8">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-3xl font-semibold">Upcoming Evaluations</h2>
          <div className="overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              {sortedOrders.length > 0 ? (
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
                                sizes="128px"
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
                            {getLastEvaluationDate(order)
                              ? formatDate(getLastEvaluationDate(order)!)
                              : "N/A"}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {getNextEvaluationDueDate(order)}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex space-x-2">
                            {canEvaluate(order) ? (
                              <>
                                <Link
                                  href={`/dashboard/athlete-evaluation/evaluate/${order._id}`}
                                  className={`flex items-center rounded-md border border-green-600 bg-white px-4 py-2 text-xs font-medium text-green-600 hover:bg-green-600 hover:text-white`}
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
                              </>
                            ) : (
                              <>
                                <Button
                                  disabled
                                  variant="outline"
                                  size="sm"
                                  className="border-green-600 bg-white text-green-600 hover:bg-green-600 hover:text-white"
                                >
                                  <ClipboardIcon className="mr-2 h-4 w-4" />
                                  Evaluate
                                </Button>
                                <Button
                                  disabled
                                  variant="outline"
                                  size="sm"
                                  className="border-green-600 bg-white text-green-600 hover:bg-green-600 hover:text-white"
                                >
                                  <UserPlusIcon className="mr-2 h-4 w-4" />
                                  Assign to
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-accent-gray-300">
                  You do not currently have any athletes awaiting Evaluations
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <EvaluationCard
            title="Evaluation Pricing"
            description={
              hasPricingPlan
                ? "Customize and manage your pricing structure for athlete evaluations. Optimize your rates to reflect your expertise and market demand."
                : "You haven't configured your pricing plan yet. Create one now to optimize your athlete evaluations."
            }
            icon={<ClipboardIcon className="h-8 w-8 text-green-600" />}
            action={hasPricingPlan ? "Manage Pricing" : "Create Pricing Plan"}
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
