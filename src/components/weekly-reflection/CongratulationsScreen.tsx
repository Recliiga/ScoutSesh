import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { GoalType } from "../goal-setting/GoalDetailsScreen";
import { ReflectionDataType } from "./WeeklyReflectionForm";

export default function CongratulationsScreen({
  reflectionData,
  goals,
  setCurrentScreen,
}: {
  reflectionData: ReflectionDataType[];
  goals: GoalType[];
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col justify-center items-center bg-green-50 py-6 sm:py-8">
      <Card className="w-full max-w-3xl text-center">
        <CardHeader>
          <div className="mb-4 text-muted-foreground text-sm">
            {goals.length + 2}/{goals.length + 2} Weekly Reflection
          </div>
          <CheckCircleIcon className="mx-auto w-16 h-16 text-green-500" />
          <CardTitle className="mb-2 font-bold text-2xl text-green-700">
            Reflection Complete!
          </CardTitle>
          <p className="text-gray-700 text-lg">
            Your weekly reflection has been successfully submitted.
          </p>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-600 text-md">
            Great job on completing your reflection! This will help guide your
            future training and goal-setting. Keep up the great work and stay
            focused on your progress.
          </p>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Your Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {goals.map((goal, index) => (
                  <li
                    key={index}
                    className="flex sm:flex-row flex-col justify-between sm:items-center bg-white shadow-sm p-4 rounded-lg"
                  >
                    <div className="flex-grow sm:mr-4 mb-2 sm:mb-0">
                      <span className="font-medium">Goal #{index + 1}:</span>{" "}
                      {goal.goal}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`self-start sm:self-center whitespace-nowrap ${
                        goal.dateCompleted ||
                        reflectionData[index].reflection.isCompleted
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-black"
                      }`}
                    >
                      {goal.dateCompleted ||
                      reflectionData[index].reflection.isCompleted
                        ? "Completed"
                        : "In Progress"}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentScreen(`reflection-goal-${goals.length}`)
              }
            >
              Back
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 px-0 py-0 text-white">
              <Link href={"/dashboard/goal-setting"} className="px-4 py-2">
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
