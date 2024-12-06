import React from "react";
import EvaluationCard from "../athlete-evaluation/EvaluationCard";
import { ClipboardList, FileText } from "lucide-react";
import NotificationSign from "../dashboard/NotificationSign";

export default function UserAthleteEvaluationPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-[90%] max-w-6xl py-6 sm:py-8">
        <h1 className="mb-6 text-3xl font-bold text-black sm:text-4xl">
          Athlete Evaluation
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Track your progress, receive feedback from coaches, and improve your
          performance through regular evaluations.
        </p>
        <NotificationSign />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <EvaluationCard
            title="Request an Evaluation"
            description="Schedule a new evaluation session with a coach to assess your current skills and performance."
            icon={<ClipboardList className="h-6 w-6 text-green-600" />}
            action="Request Evaluation"
            href="/dashboard/athlete-evaluation/request-evaluation"
          />
          <EvaluationCard
            title="View Evaluation Records"
            description="Access your past evaluation reports, track your progress over time, and review coach feedback."
            icon={<FileText className="h-6 w-6 text-green-600" />}
            action="View Records"
            href="#"
          />
        </div>
      </div>
    </main>
  );
}
