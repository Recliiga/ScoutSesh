import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { XCircle } from "lucide-react";

export type GoalType = {
  goal: string;
  actions: string;
  location: string;
  frequency: string;
  confidence: number;
  dateCompleted: Date | null;
};

export default function GoalDetailsScreen({
  setGoals,
  goals,
  setCurrentScreen,
}: {
  setGoals: React.Dispatch<React.SetStateAction<GoalType[]>>;
  goals: GoalType[];
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleSubmitGoals = () => {
    setCurrentScreen("save-template");
  };

  function addGoal() {
    setGoals((prevGoals) => [
      ...prevGoals,
      {
        actions: "",
        confidence: -1,
        frequency: "",
        goal: "",
        location: "",
        dateCompleted: null,
      },
    ]);
  }

  function removeGoal(index: number) {
    setGoals((prevGoals) => prevGoals.filter((_, i) => i !== index));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
    fieldName: keyof GoalType,
  ) {
    setGoals((prevGoals) => {
      const updatedGoal = [...prevGoals];
      if (fieldName === "dateCompleted") {
        updatedGoal[index][fieldName] = new Date(e.target.value);
      } else if (fieldName === "confidence") {
        updatedGoal[index][fieldName] = Number(e.target.value);
      } else {
        updatedGoal[index][fieldName] = e.target.value;
      }
      return updatedGoal;
    });
  }

  const lastGoal = goals.at(-1);

  return (
    <div className="mx-auto flex w-[90%] max-w-6xl flex-col py-6 sm:py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <div className="mb-4 text-sm text-muted-foreground">
            2/4 Goal Setting
          </div>
          <h1 className="text-3xl font-bold">Define your goals</h1>
          <p className="text-base sm:text-lg">A good goal should be:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Specific and clear</li>
            <li>Measurable</li>
            <li>Achievable yet challenging</li>
            <li>Relevant to your overall hockey development</li>
            <li>Time-bound</li>
          </ul>
        </div>
        <div className="flex flex-1 flex-col gap-4 sm:gap-6">
          {goals.map((goal, index) => (
            <Card
              key={index}
              className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6"
            >
              <CardHeader className="flex flex-row items-center justify-between p-0">
                <CardTitle>Goal #{index + 1}</CardTitle>
                {index > 0 && (
                  <button className="p-1" onClick={() => removeGoal(index)}>
                    <XCircle />
                  </button>
                )}
              </CardHeader>
              <CardContent className="space-y-4 p-0">
                <div>
                  <Label
                    htmlFor={`goal-${index}`}
                    className="text-base font-bold sm:text-lg"
                  >
                    Goal:
                  </Label>
                  <Textarea
                    id={`goal-${index}`}
                    placeholder="Define your goal in clear, specific terms. Make sure it's measurable and has a deadline."
                    value={goal.goal}
                    onChange={(e) => handleChange(e, index, "goal")}
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`actions-${index}`}
                    className="text-base font-bold sm:text-lg"
                  >
                    What will I need to do to achieve this?
                  </Label>
                  <Textarea
                    id={`actions-${index}`}
                    placeholder="List the specific actions or steps you'll take to achieve your goal."
                    value={goal.actions}
                    onChange={(e) => handleChange(e, index, "actions")}
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`location-${index}`}
                    className="text-base font-bold sm:text-lg"
                  >
                    Where will I be doing it?
                  </Label>
                  <Input
                    id={`location-${index}`}
                    placeholder="Identify specific locations where you'll work towards your goal."
                    value={goal.location}
                    onChange={(e) => handleChange(e, index, "location")}
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`frequency-${index}`}
                    className="text-base font-bold sm:text-lg"
                  >
                    How regularly will I do it?
                  </Label>
                  <Input
                    id={`frequency-${index}`}
                    placeholder="Specify the frequency of your efforts towards this goal."
                    value={goal.frequency}
                    onChange={(e) => handleChange(e, index, "frequency")}
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`confidence-${index}`}
                    className="text-base font-bold sm:text-lg"
                  >
                    What is your current belief that you can complete this goal?
                  </Label>
                  <Input
                    id={`confidence-${index}`}
                    type="number"
                    min={0}
                    max={10}
                    placeholder="Rate your confidence from 0 to 10"
                    value={goal.confidence >= 0 ? goal.confidence : ""}
                    onChange={(e) => {
                      if (Number(e.target.value) > 10) return;
                      handleChange(e, index, "confidence");
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {goals.length < 3 && (
            <Button
              onClick={addGoal}
              disabled={
                !lastGoal?.actions ||
                lastGoal.confidence < 0 ||
                !lastGoal.frequency ||
                !lastGoal.goal ||
                !lastGoal.location
              }
            >
              Add another Goal
            </Button>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-between border-t p-4">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("goal-overview")}
        >
          Back
        </Button>
        <Button
          className="bg-green-500 text-white"
          onClick={handleSubmitGoals}
          disabled={
            !lastGoal?.actions ||
            lastGoal.confidence < 0 ||
            !lastGoal.frequency ||
            !lastGoal.goal ||
            !lastGoal.location
          }
        >
          Submit Your Goals
        </Button>
      </div>
    </div>
  );
}
