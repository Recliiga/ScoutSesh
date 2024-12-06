import { CheckCircleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function CompletionScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-50">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mb-4 text-sm text-muted-foreground">
            7/7 Athlete Evaluation
          </div>
          <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
          <CardTitle className="text-2xl font-bold text-green-700">
            Athlete Evaluation Complete!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 mb-4">
            You have successfully submitted your self-evaluation.
          </p>
          <p className="text-md text-gray-600 mb-6">
            You can review your evaluation or return to the main dashboard to
            track your progress.
          </p>
          <div className="flex-center">
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                console.log("Navigating to main dashboard");
              }}
            >
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
