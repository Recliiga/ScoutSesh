import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/dashboard/BackButton";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { getFullname } from "@/lib/utils";

// const evaluationRecords = [
//   {
//     _id: 1,
//     date: "October 15, 2024",
//     type: "Athlete Evaluation",
//     coachName: "Coach Davis",
//   },
//   {
//     _id: 2,
//     date: "September 1, 2024",
//     type: "Athlete Evaluation",
//     coachName: "Coach Davis",
//   },
//   {
//     _id: 3,
//     date: "July 20, 2024",
//     type: "Athlete Evaluation",
//     coachName: "Coach Davis",
//   },
//   {
//     _id: 4,
//     date: "June 5, 2024",
//     type: "Athlete Evaluation",
//     coachName: "Coach Davis",
//   },
//   {
//     _id: 5,
//     date: "April 30, 2024",
//     type: "Athlete Evaluation",
//     coachName: "Coach Davis",
//   },
// ];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AthleteEvaluationRecordsPage({
  evaluationRecords,
}: {
  evaluationRecords: AthleteEvaluationType[];
}) {
  return (
    <main className="mx-auto w-[90%] max-w-4xl flex-1 py-6">
      <h1 className="mb-6 text-3xl font-bold">Evaluation Records</h1>
      <Card>
        <CardHeader>
          <CardTitle>Past Evaluations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {evaluationRecords.map((evaluation) => (
              <div
                key={evaluation._id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 duration-200 hover:scale-[1.02]"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {evaluation.template.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatDate(evaluation.createdAt)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {getFullname(evaluation.template.user)}
                  </p>
                </div>
                <Link
                  href={`/dashboard/athlete-evaluation/evaluations/${evaluation._id}`}
                  passHref
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  >
                    View
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-between">
        <BackButton />
        <Link
          href="/dashboard/athlete-evaluation/request-evaluation"
          className="self-start rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-green-700"
        >
          Request New Evaluation
        </Link>
      </div>
    </main>
  );
}
