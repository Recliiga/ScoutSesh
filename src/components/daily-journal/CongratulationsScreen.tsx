import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

export default function CongratulationsScreen() {
  return (
    <div className="flex flex-col justify-center items-center bg-green-50 p-4 w-full">
      <Card className="px-4 sm:px-6 py-6 w-full max-w-lg text-center">
        <CardHeader className="p-0">
          <div className="mb-4 text-muted-foreground text-sm">
            3/3 Daily Journal
          </div>
          <CheckCircleIcon className="mx-auto w-16 h-16 text-green-500" />
          <CardTitle className="font-bold text-2xl text-green-700">
            Congratulations!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="mb-4 text-gray-700 text-lg">
            Your daily journal entry has been successfully submitted.
          </p>
          <p className="mb-6 text-gray-600 text-md">
            Great job on reflecting on your day! Consistent journaling will help
            you track your progress and identify areas for improvement. Keep up
            the good work!
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href={"/dashboard/daily-journal"}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-medium text-white duration-300"
            >
              Go to Home Page
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
