import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/dashboard/BackButton";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { formatDate, getFullname } from "@/lib/utils";

export default function AthleteEvaluationRecordsPage({
  evaluationRecords,
}: {
  evaluationRecords: AthleteEvaluationType[];
}) {
  const filteredRecords: AthleteEvaluationType[] = [];

  evaluationRecords.forEach((record) => {
    if (
      filteredRecords.some(
        (rec) => rec.order === record.order && rec.dueDate === record.dueDate,
      )
    )
      return;
    filteredRecords.push(record);
  });

  return (
    <main className="mx-auto flex w-[90%] max-w-4xl flex-1 flex-col py-6">
      <h1 className="mb-6 text-3xl font-bold">Evaluation Records</h1>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Past Evaluations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((evaluation) => (
                <div
                  key={evaluation._id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 duration-200 hover:scale-[1.02]"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      Athlete Evaluation
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(evaluation.createdAt)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Coach:{" "}
                      <span className="font-semibold">
                        {getFullname(evaluation.template.user)}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/athlete-evaluation/records/${evaluation._id}`}
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
              ))
            ) : (
              <p className="text-accent-gray-300">
                You do not have any past evaluation records
              </p>
            )}
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
