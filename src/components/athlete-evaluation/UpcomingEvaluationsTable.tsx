import {
  formatDate,
  getFullname,
  getLastEvaluationDate,
  getNextEvaluationDueDate,
} from "@/lib/utils";
import { ClipboardIcon, UserPlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AssignToButton from "./AssignToButton";
import { Button } from "../ui/button";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";

export default function UpcomingEvaluationsTable({
  orders,
  coachEvaluations,
}: {
  orders: AthleteEvaluationOrderType[];
  coachEvaluations: AthleteEvaluationType[];
}) {
  function canEvaluate(order: AthleteEvaluationOrderType) {
    return !order.evaluationDates.some(
      (date) => date.dateCoachEvaluated && !date.dateAthleteEvaluated,
    );
  }

  return (
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
        {orders.map((order) => (
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
              <div className="text-sm text-gray-900">{order.plan}</div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="text-sm text-gray-900">
                {getLastEvaluationDate(order, coachEvaluations)
                  ? formatDate(getLastEvaluationDate(order, coachEvaluations)!)
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
                    <AssignToButton orderId={order._id} />
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
  );
}
