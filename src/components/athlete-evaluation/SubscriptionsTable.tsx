import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { formatDate, getFullname, getLastEvaluationDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import Link from "next/link";

export default function SubscriptionsTable({
  orders,
  coachEvaluations,
  showLastEvaluationDate = false,
}: {
  orders: AthleteEvaluationOrderType[];
  coachEvaluations: AthleteEvaluationType[];
  showLastEvaluationDate?: boolean;
}) {
  function getCompletedDates(order: AthleteEvaluationOrderType) {
    return order.evaluationDates.filter((date) => date.dateCoachEvaluated)
      .length;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="sticky top-0 w-1/5 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Player
          </th>
          <th className="sticky top-0 w-1/6 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Plan
          </th>
          <th className="sticky top-0 w-1/5 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Purchased On
          </th>
          <th className="sticky top-0 w-1/5 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Subscriptions
          </th>
          {showLastEvaluationDate ? (
            <th className="sticky top-0 w-1/6 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Last Evaluation
            </th>
          ) : null}
          <th className="sticky top-0 w-1/5 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {orders.map((order) => {
          const lastEvaluationDate = getLastEvaluationDate(
            order,
            coachEvaluations,
          );
          return (
            <tr key={order._id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden">
                      <Image
                        className="h-full w-full rounded-full object-cover"
                        src={order.athlete.profilePicture}
                        alt={getFullname(order.athlete)}
                        fill
                        sizes="128px"
                      />
                    </div>
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
                  {formatDate(new Date(order.createdAt).toDateString())}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">{`${getCompletedDates(order)}/${order.evaluationDates.length}`}</div>
              </td>
              {showLastEvaluationDate ? (
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {lastEvaluationDate
                      ? formatDate(new Date(lastEvaluationDate).toDateString())
                      : "N/A"}
                  </div>
                </td>
              ) : null}
              <td className="whitespace-nowrap px-6 py-4">
                {getCompletedDates(order) > 0 ? (
                  <Link
                    href={`/dashboard/athlete-evaluation/records/orders/${order._id}`}
                    className="rounded-md border px-3 py-2 text-xs font-medium duration-200 hover:bg-green-600 hover:text-white"
                  >
                    View Evaluations
                  </Link>
                ) : (
                  <Button
                    disabled={getCompletedDates(order) <= 0}
                    variant="outline"
                    size="sm"
                    className="hover:bg-green-600 hover:text-white"
                  >
                    View Evaluations
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
