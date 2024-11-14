import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { GoalDataType } from "./GoalOverviewScreen";

export default function GoalDetailsScreen({
  updateGoalData,
  goalData,
  setCurrentScreen,
  addGoal,
}: {
  updateGoalData: (
    section: "goalDetails" | "goals",
    field: string,
    value: string,
    index?: number | null
  ) => void;
  goalData: GoalDataType;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  addGoal: () => void;
}) {
  const handleSubmitGoals = () => {
    setCurrentScreen("save-template");
  };

  return (
    <div className="flex flex-col mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
      <div className="flex lg:flex-row flex-col gap-8">
        <div className="flex flex-col flex-1 gap-4">
          <div className="mb-4 text-muted-foreground text-sm">
            2/4 Goal Setting
          </div>
          <h1 className="font-bold text-3xl">Define your goals</h1>
          <p className="text-lg">A good goal should be:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Specific and clear</li>
            <li>Measurable</li>
            <li>Achievable yet challenging</li>
            <li>Relevant to your overall hockey development</li>
            <li>Time-bound</li>
          </ul>
        </div>
        <div className="flex flex-col flex-1 gap-4 sm:gap-6">
          {goalData.goals.map((goal, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Goal #{index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label
                    htmlFor={`goal-${index}`}
                    className="font-bold text-lg"
                  >
                    Goal:
                  </Label>
                  <Textarea
                    id={`goal-${index}`}
                    placeholder="Define your goal in clear, specific terms. Make sure it's measurable and has a deadline."
                    value={goal.goal}
                    onChange={(e) =>
                      updateGoalData("goals", "goal", e.target.value, index)
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`actions-${index}`}
                    className="font-bold text-lg"
                  >
                    What will I need to do to achieve this?
                  </Label>
                  <Textarea
                    id={`actions-${index}`}
                    placeholder="List the specific actions or steps you'll take to achieve your goal."
                    value={goal.actions}
                    onChange={(e) =>
                      updateGoalData("goals", "actions", e.target.value, index)
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`location-${index}`}
                    className="font-bold text-lg"
                  >
                    Where will I be doing it?
                  </Label>
                  <Input
                    id={`location-${index}`}
                    placeholder="Identify specific locations where you'll work towards your goal."
                    value={goal.location}
                    onChange={(e) =>
                      updateGoalData("goals", "location", e.target.value, index)
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`frequency-${index}`}
                    className="font-bold text-lg"
                  >
                    How regularly will I do it?
                  </Label>
                  <Input
                    id={`frequency-${index}`}
                    placeholder="Specify the frequency of your efforts towards this goal."
                    value={goal.frequency}
                    onChange={(e) =>
                      updateGoalData(
                        "goals",
                        "frequency",
                        e.target.value,
                        index
                      )
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`confidence-${index}`}
                    className="font-bold text-lg"
                  >
                    What is your current belief that you can complete this goal?
                  </Label>
                  <Input
                    id={`confidence-${index}`}
                    type="number"
                    min={0}
                    max={10}
                    placeholder="Rate your confidence from 0 to 10"
                    value={goal.confidence}
                    onChange={(e) =>
                      updateGoalData(
                        "goals",
                        "confidence",
                        e.target.value,
                        index
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {goalData.goals.length < 3 && (
            <Button onClick={addGoal}>Add another Goal</Button>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-6 p-4 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("goal-overview")}
        >
          Back
        </Button>
        <Button className="bg-green-500 text-white" onClick={handleSubmitGoals}>
          Submit Your Goals
        </Button>
      </div>
    </div>
  );
}
