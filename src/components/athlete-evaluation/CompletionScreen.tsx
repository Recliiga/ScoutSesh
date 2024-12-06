import { CheckCircleIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

export default function CompletionScreen() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-green-50">
      <Card className="w-full max-w-lg text-center p-4 sm:p-6">
        <CardHeader className="p-0">
          <div className="mb-4 text-sm text-muted-foreground">
            7/7 Athlete Evaluation
          </div>
          <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
          <CardTitle className="text-2xl font-bold text-green-700">
            Template Created Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-gray-700 mb-4">
            You have successfully created an evaluation template.
          </p>
          <p className="text-md text-gray-600 mb-6 text-sm">
            You can view your saved templates or return to the Evaluation
            dashboard to manage your evaluations.
          </p>
          <div className="flex-center gap-2 sm:gap-4 flex-wrap">
            <Link
              href={"/dashboard/athlete-evaluation/templates"}
              className="border hover:bg-accent-gray-100 px-3 sm:px-4 py-2 rounded-md text-sm font-medium duration-200"
            >
              <span className="hidde sm:inline">Manage </span>
              Templates
            </Link>
            <Link
              href={"/dashboard/athlete-evaluation"}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium duration-200 hover:bg-green-700"
            >
              Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
