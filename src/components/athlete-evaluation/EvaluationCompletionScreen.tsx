import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

export default function EvaluationCompletionScreen({
  evaluationId,
}: {
  evaluationId: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-green-50 py-4">
      <Card className="w-[90%] max-w-lg text-center">
        <CardHeader>
          <div className="mb-4 text-sm text-muted-foreground">
            6/6 Athlete Evaluation
          </div>
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="text-2xl font-bold text-green-700">
            Athlete Evaluation Complete!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg text-gray-700">
            Your athlete evaluation has been successfully submitted.
          </p>
          <p className="text-md mb-6 text-gray-600">
            The coach will review this self-assessment and use it to guide your
            development. The evaluation can be reviewed or return to the main
            dashboard.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href={`/dashboard/athlete-evaluation/records/${evaluationId}`}
              replace
              className="rounded-md border px-3 py-2 text-sm font-medium duration-200 hover:bg-accent-gray-100 sm:px-4"
            >
              Review Assessment
            </Link>
            <Link
              href={"/dashboard/athlete-evaluation"}
              replace
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white duration-200 hover:bg-green-700 sm:px-4"
            >
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
