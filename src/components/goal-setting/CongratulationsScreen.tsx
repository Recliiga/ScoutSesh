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
            Your goals have been successfully updated.
          </p>
          <p className="mb-6 text-gray-600 text-md">
            Stay committed to making progress on your goals. Reflect on what
            you&apos;ve achieved so far and adjust your plans to keep moving
            forward.
          </p>
          <div className="flex justify-center">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Link href={"/dashboard/goal-setting"}>Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
