import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import LoadingIndicator from "../LoadingIndicator";
import AuthError from "../AuthError";
import { GoalSubmissionType } from "./CreateGoalForm";
import { createGoal, updateGoal } from "@/actions/goalActions";

export default function SaveTemplateScreen({
  goalId,
  goalData,
  setCurrentScreen,
  goalName,
  setGoalName,
}: {
  goalId?: string;
  goalData: GoalSubmissionType;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  goalName: string;
  setGoalName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  async function handleSaveGoal() {
    setLoading(true);
    const { error: saveError } = goalId
      ? await updateGoal(goalId, goalData)
      : await createGoal(goalData);
    if (!saveError) setCurrentScreen("congratulations");
    setError(saveError);
    setLoading(false);
  }

  return (
    <div className="flex flex-col mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
      <div className="flex md:flex-row flex-col gap-8">
        <div className="flex-1">
          <div className="mb-4 text-muted-foreground text-sm">
            3/4 Goal Setting
          </div>
          <h1 className="mb-4 font-bold text-3xl">
            Save Goal Setting Submission
          </h1>
          <p className="text-gray-600">
            Name and save your Goal Setting submission.
          </p>
        </div>
        <div className="flex-1">
          <Card className="space-y-4">
            <CardContent className="space-y-4 p-4 sm:p-6">
              <div className="space-y-2">
                <Label htmlFor="submission-name">Submission Name</Label>
                <Input
                  id="submission-name"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="Enter a name for your submission"
                  maxLength={50}
                />
              </div>
              {error && <AuthError error={error} />}
              <div className="space-y-2 mt-4">
                <Label htmlFor="template-date" className="font-semibold">
                  Date
                </Label>
                <p id="template-date" className="text-gray-700">
                  {currentDate}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-between mt-8 w-full">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("goal-details")}
        >
          Back
        </Button>
        <Button
          className="bg-green-600 text-white"
          onClick={handleSaveGoal}
          disabled={!goalName.trim() || loading}
        >
          {loading ? (
            <>
              <LoadingIndicator />
              Updating...
            </>
          ) : (
            "Update Submission"
          )}
        </Button>
      </div>
    </div>
  );
}
