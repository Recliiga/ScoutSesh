import React from "react";
import NotificationSign from "./NotificationSign";
import EvaluationCard from "./EvaluationCard";
import { ClipboardList, FileText } from "lucide-react";

export default function UserAthleteEvaluationPage() {
  return (
    <main className="flex-grow">
      <div className="mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
        <h1 className="mb-6 font-bold text-3xl text-black sm:text-4xl">
          Athlete Evaluation
        </h1>
        <p className="mb-8 text-gray-600 text-lg">
          Track your progress, receive feedback from coaches, and improve your
          performance through regular evaluations.
        </p>
        <NotificationSign />
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <EvaluationCard
            title="Request an Evaluation"
            description="Schedule a new evaluation session with a coach to assess your current skills and performance."
            icon={<ClipboardList className="w-6 h-6 text-green-600" />}
            action="Request Evaluation"
            //   onClick={() => console.log("Requesting Evaluation...")}
          />
          <EvaluationCard
            title="View Evaluation Records"
            description="Access your past evaluation reports, track your progress over time, and review coach feedback."
            icon={<FileText className="w-6 h-6 text-green-600" />}
            action="View Records"
            //   onClick={() => console.log("Requesting Evaluation...")}
          />
        </div>
      </div>
    </main>
  );
}
