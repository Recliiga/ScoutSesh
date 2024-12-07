"use client";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function AthleteEvaluationNotificationSign() {
  const message = "Athlete Evaluation awaiting your action";
  const href = "/dashboard/athlete-evaluation/self-evaluation";
  const actionText = "Complete Athlete Evaluation";

  return (
    <div className="mb-8 rounded-lg border border-green-600 p-4">
      <div className="mb-2 flex items-center space-x-2">
        <AlertCircle className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-semibold text-green-600">
          Athlete Evaluation Update
        </h2>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6 md:gap-8">
        <p className="text-sm text-gray-800 sm:text-base">{message}</p>
        <Button className="border border-green-600 bg-white px-0 py-0 text-green-600 transition-colors hover:bg-green-600 hover:text-white">
          <Link href={href} className="flex-center h-full w-full px-4 py-2">
            {actionText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
