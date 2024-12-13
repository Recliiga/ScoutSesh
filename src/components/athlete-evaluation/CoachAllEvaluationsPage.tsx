"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import UpcomingEvaluationsTable from "./UpcomingEvaluationsTable";
import SubscriptionsTable from "./SubscriptionsTable";
import { getFullname } from "@/lib/utils";

export default function CoachAllEvaluationsPage({
  orders,
  coachEvaluations,
}: {
  orders: AthleteEvaluationOrderType[];
  coachEvaluations: AthleteEvaluationType[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const activeOrders = useMemo(
    () =>
      orders.filter((order) =>
        order.evaluationDates.some((date) => !date.dateAthleteEvaluated),
      ),
    [orders],
  );

  const filteredActiveOrders = useMemo(
    () =>
      activeOrders.filter((order) =>
        getFullname(order.athlete)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      ),
    [activeOrders, searchQuery],
  );

  const inactiveOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          !order.evaluationDates.some((date) => !date.dateCoachEvaluated) &&
          getFullname(order.athlete)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ),
    [orders, searchQuery],
  );

  const filteredInactiveOrders = useMemo(
    () =>
      inactiveOrders.filter((order) =>
        getFullname(order.athlete)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      ),
    [inactiveOrders, searchQuery],
  );

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) =>
        getFullname(order.athlete)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      ),
    [orders, searchQuery],
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <main className="mx-auto w-[90%] max-w-7xl flex-1 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">All Evaluations</h1>
        <form className="flex items-center space-x-2" onSubmit={handleSearch}>
          <Input
            type="text"
            placeholder="Search player..."
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-green-600 hover:text-white"
          >
            <SearchIcon className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>

      <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold">Upcoming Evaluations</h2>
        <div className="overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            {orders.length > 0 ? (
              <UpcomingEvaluationsTable
                coachEvaluations={coachEvaluations}
                orders={filteredOrders}
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
                orders={filteredActiveOrders}
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
                orders={filteredInactiveOrders}
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
