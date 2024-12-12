import React from "react";
import { ClipboardIcon, FileEditIcon, UsersIcon } from "lucide-react";
import EvaluationCard from "@/components/athlete-evaluation/EvaluationCard";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import UpcomingEvaluationsTable from "../athlete-evaluation/UpcomingEvaluationsTable";

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
  return (
    <main className="mx-auto flex w-[90%] max-w-6xl flex-1 flex-col gap-8 py-6 sm:py-8">
      <div className="rounded-lg bg-white p-6 shadow-lg">
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
          href="/dashboard/athlete-evaluation/records"
        />
      </div>
    </main>
  );
}
