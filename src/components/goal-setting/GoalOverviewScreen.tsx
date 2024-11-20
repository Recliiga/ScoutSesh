import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export type GoalDetailsType = {
  aspiration: string;
  strengths: string;
  weaknesses: string;
};

export default function GoalOverviewScreen({
  setGoalDetails,
  goalDetails,
  setCurrentScreen,
}: {
  setGoalDetails: React.Dispatch<React.SetStateAction<GoalDetailsType>>;
  goalDetails: GoalDetailsType;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col mx-auto py-6 sm:py-8 w-[90%] max-w-6xl">
      <div className="flex lg:flex-row flex-col gap-8 w-full">
        <div className="flex-1">
          <div className="mb-4 text-muted-foreground text-sm">
            1/4 Goal Setting
          </div>
          <h1 className="mb-4 font-bold text-3xl">
            Let&apos;s start setting your goals
          </h1>
          <p>
            Goal setting is crucial for your development as an athlete.
            We&apos;ll guide you through setting both short-term and long-term
            goals, and help you create actionable steps to achieve them.
          </p>
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <Label className="mb-2 font-medium text-sm">
              What is your Aspiration?
            </Label>
            <Textarea
              className="w-full"
              placeholder="Reflect on your long-term vision. Where do you see yourself in the future?"
              value={goalDetails.aspiration}
              onChange={(e) =>
                setGoalDetails((curr) => ({
                  ...curr,
                  aspiration: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-4">
            <Label className="mb-2 font-medium text-sm">
              What are your Strengths?
            </Label>
            <Textarea
              className="w-full"
              placeholder="Identify the skills, qualities, and experiences that set you apart."
              value={goalDetails.strengths}
              onChange={(e) =>
                setGoalDetails((curr) => ({
                  ...curr,
                  strengths: e.target.value,
                }))
              }
            />
          </div>
          <div className="mb-4">
            <Label className="mb-2 font-medium text-sm">
              What are your Weaknesses?
            </Label>
            <Textarea
              className="w-full"
              placeholder="Recognize areas where you can improve to reach your full potential."
              value={goalDetails.weaknesses}
              onChange={(e) =>
                setGoalDetails((curr) => ({
                  ...curr,
                  weaknesses: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8 w-full">
        <Button
          className="bg-green-500 ml-auto text-white"
          onClick={() => setCurrentScreen("goal-details")}
          disabled={
            !goalDetails.aspiration ||
            !goalDetails.strengths ||
            !goalDetails.weaknesses
          }
        >
          Next: Edit Your Goals
        </Button>
      </div>
    </div>
  );
}
