import { GoalDataType } from "@/app/app/goal-setting/new/page";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function ReflectionOverviewScreen({
  setCurrentScreen,
  goalData,
}: {
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  goalData: GoalDataType;
}) {
  return (
    <div className="flex flex-col mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
      <div className="flex gap-8 w-full">
        <div className="flex-1">
          <div className="mb-4 text-muted-foreground text-sm">
            1/{goalData.goals.length + 2} Weekly Reflection
          </div>
          <h1 className="mb-4 font-bold text-3xl">
            Let&apos;s reflect on your progress
          </h1>
          <p>
            Weekly reflection is crucial for your development as an athlete.
            We&apos;ll guide you through assessing your progress, identifying
            areas for improvement, and planning your next steps.
          </p>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {goalData.goals.map((goal, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      Goal #{index + 1}: {goal.goal}
                    </span>
                    <Badge variant="outline">
                      {goal.dateCompleted
                        ? "Completed"
                        : `${goal.confidence}/10`}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-end mt-8 w-full">
        <Button
          className="bg-green-500 text-white"
          onClick={() => setCurrentScreen("reflection-goal-1")}
        >
          Start Reflection
        </Button>
      </div>
    </div>
  );
}
