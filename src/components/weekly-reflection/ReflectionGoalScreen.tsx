import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  Target,
  MapPin,
  Calendar,
  Zap,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ConfidenceMeter from "./ConfidenceMeter";
import { Button } from "../ui/button";
import { GoalType } from "../goal-setting/GoalDetailsScreen";
import { ReflectionDataType } from "./WeeklyReflectionForm";
import LoadingIndicator from "../LoadingIndicator";

export default function ReflectionGoalScreen({
  goalIndex,
  reflectionData,
  updateReflectionData,
  handleGoalCompletion,
  handleSubmitReflection,
  showError,
  setCurrentScreen,
  isFormValid,
  setShowError,
  goals,
  loading,
}: {
  goalIndex: number;
  reflectionData: ReflectionDataType[];
  updateReflectionData: (
    goalIndex: number,
    field: string,
    value: string | boolean
  ) => void;
  handleGoalCompletion: (goalIndex: number, isCompleted: boolean) => void;
  handleSubmitReflection: () => void;
  showError: boolean;
  isFormValid(goalIndex: number): boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  goals: GoalType[];
  loading: boolean;
}) {
  const goal = goals[goalIndex];
  const isCompleted = reflectionData[goalIndex].reflection.isCompleted;

  return (
    <div className="flex flex-col flex-1 mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
      <div className="mb-8">
        <div className="mb-2 text-muted-foreground text-sm">
          {goalIndex + 2}/{goals.length + 2} Weekly Reflection
        </div>
        <h1 className="mb-4 font-bold text-4xl">
          Reflect on Goal #{goalIndex + 1}
        </h1>
        <p className="text-lg text-muted-foreground">
          Take a moment to consider your progress and strategies for this
          specific goal.
        </p>
      </div>
      <div className="flex lg:flex-row flex-col gap-8">
        <div className="space-y-6 w-full lg:w-1/2">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="font-semibold text-2xl text-primary">
                {goal.goal}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="mt-1 w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Action Steps:</p>
                  <p className="text-muted-foreground">{goal.actions}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="mt-1 w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Location:</p>
                  <p className="text-muted-foreground">{goal.location}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="mt-1 w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Frequency:</p>
                  <p className="text-muted-foreground">{goal.frequency}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Confidence Level:</p>
                  <Badge variant="outline" className="text-primary">
                    {goal.confidence}/10
                  </Badge>
                </div>
                <ConfidenceMeter score={goal.confidence} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 w-full lg:w-1/2">
          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <Label
                  htmlFor={`improvement-${goalIndex}`}
                  className="flex items-center space-x-2 font-semibold text-lg"
                >
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Is this strategy servicing my goal?</span>
                </Label>
                <Textarea
                  id={`improvement-${goalIndex}`}
                  placeholder="Evaluate the effectiveness of your current approach. Consider what adjustments might help you achieve your goal more efficiently, or if your current strategy is working well."
                  value={reflectionData[goalIndex].reflection.improvement}
                  onChange={(e) =>
                    updateReflectionData(
                      goalIndex,
                      "improvement",
                      e.target.value
                    )
                  }
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-4">
                <Label
                  htmlFor={`completion-${goalIndex}`}
                  className="flex items-center space-x-2 font-semibold text-lg"
                >
                  <CheckCircleIcon className="w-5 h-5 text-primary" />
                  <span>Did I complete this goal?</span>
                </Label>
                <Textarea
                  id={`completion-${goalIndex}`}
                  placeholder="Assess your progress honestly. If you didn't fully meet your goal, explain your current status and any partial achievements."
                  value={reflectionData[goalIndex].reflection.completion}
                  onChange={(e) =>
                    updateReflectionData(
                      goalIndex,
                      "completion",
                      e.target.value
                    )
                  }
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-4">
                <Label
                  htmlFor={`completion-switch-${goalIndex}`}
                  className="flex items-center space-x-2 font-semibold text-lg"
                >
                  <CheckCircleIcon className="w-5 h-5 text-primary" />
                  <span>Mark goal as complete?</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`completion-switch-${goalIndex}`}
                    checked={isCompleted}
                    onCheckedChange={(checked) =>
                      handleGoalCompletion(goalIndex, checked)
                    }
                    className={`${
                      isCompleted ? "bg-green-500" : ""
                    } data-[state=checked]:bg-green-500`}
                  />
                  <span
                    className={`text-sm ${
                      isCompleted
                        ? "text-green-600 font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? "Completed" : "Not Completed"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {showError && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please fill out both reflection text areas before proceeding.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between mt-8 pt-4 border-t">
        <Button
          variant="outline"
          onClick={() =>
            setCurrentScreen(
              goalIndex === 0
                ? "reflection-overview"
                : `reflection-goal-${goalIndex}`
            )
          }
        >
          <ChevronLeftIcon className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          className="bg-primary text-primary-foreground"
          onClick={() => {
            if (isFormValid(goalIndex)) {
              if (goalIndex < goals.length - 1) {
                setCurrentScreen(`reflection-goal-${goalIndex + 2}`);
              } else {
                handleSubmitReflection();
              }
            } else {
              setShowError(true);
            }
          }}
          disabled={loading || !isFormValid(goalIndex)}
        >
          {goalIndex < goals.length - 1 ? (
            <>
              Next Goal
              <ChevronRightIcon className="ml-2 w-4 h-4" />
            </>
          ) : loading ? (
            <>
              <LoadingIndicator />
              Submitting...
            </>
          ) : (
            "Submit Reflection"
          )}
        </Button>
      </div>
    </div>
  );
}
