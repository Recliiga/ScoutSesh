import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import UpcomingEvaluationsTable from "./UpcomingEvaluationsTable";
import SubscriptionsTable from "./SubscriptionsTable";

export default function CoachAllEvaluationsPage({
  orders,
  coachEvaluations,
}: {
  orders: AthleteEvaluationOrderType[];
  coachEvaluations: AthleteEvaluationType[];
}) {
  const activeOrders = orders.filter((order) =>
    order.evaluationDates.some((date) => !date.dateAthleteEvaluated),
  );

  const inactiveOrders = orders.filter(
    (order) =>
      !order.evaluationDates.some((date) => !date.dateAthleteEvaluated),
  );

  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">All Evaluations</h1>
        <div className="flex items-center space-x-2">
          <Input type="text" placeholder="Search player..." className="w-64" />
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-green-600 hover:text-white"
          >
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>

      <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold">Upcoming Evaluations</h2>
        <div className="overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            {orders.length > 0 ? (
              <UpcomingEvaluationsTable
                coachEvaluations={coachEvaluations}
                orders={orders}
              />
            ) : (
              <p className="text-accent-gray-300">
                You do not currently have any athletes awaiting Evaluations
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold">Active Subscriptions</h2>
        <div className="overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            {activeOrders.length > 0 ? (
              <SubscriptionsTable
                orders={activeOrders}
                coachEvaluations={coachEvaluations}
              />
            ) : (
              <p className="text-accent-gray-300">
                You do not currently have any active subscriptions
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold">Inactive Subscriptions</h2>
        <div className="overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            {inactiveOrders.length > 0 ? (
              <SubscriptionsTable
                orders={inactiveOrders}
                coachEvaluations={coachEvaluations}
                showLastEvaluationDate
              />
            ) : (
              <p className="text-accent-gray-300">
                You do not currently have any inactive subscriptions
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
