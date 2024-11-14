import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircleIcon } from "lucide-react";

export default function CongratulationsScreen() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-green-50 p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mb-4 text-muted-foreground text-sm">
            4/4 Goal Setting
          </div>
          <CheckCircleIcon className="mx-auto w-16 h-16 text-green-500" />
          <CardTitle className="font-bold text-2xl text-green-700">
            Congratulations!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700 text-lg">
            Your goals have been successfully submitted.
          </p>
          <p className="mb-6 text-gray-600 text-md">
            Keep working hard and stay focused on achieving your goals.
            Don&apos;t forget to update your Weekly Reflections. You can go back
            to review your goals or return to the main dashboard.
          </p>
          <div className="flex justify-center">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Link href={"/app/goal-setting"}>Go to Goal Setting Page</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
