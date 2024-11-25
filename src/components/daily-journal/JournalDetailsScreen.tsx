import { ScreenType } from "./DailyJournalForm";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import Error from "../AuthError";
import { createJournal } from "@/actions/journalActions";
import {
  DailyJournalDetailsType,
  DailyJournalType,
} from "@/db/models/DailyJournal";
import LoadingIndicator from "../LoadingIndicator";

export default function JournalDetailsScreen({
  journalData,
  updateJournalData,
  setCurrentScreen,
  isFormValid,
}: {
  journalData: DailyJournalType;
  updateJournalData: (
    field: keyof DailyJournalDetailsType,
    value: string
  ) => void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<ScreenType>>;
  isFormValid: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSaveGoal2() {
    if (!isFormValid) return;
    setLoading(true);
    const { error: saveError } = await createJournal(journalData);
    if (!saveError) setCurrentScreen("congratulations");
    setError(saveError);
    setLoading(false);
  }

  return (
    <div className="flex flex-col mx-auto py-8 w-[90%] max-w-6xl">
      <div className="flex lg:flex-row flex-col flex-1 gap-8">
        <div className="flex flex-col lg:flex-1 gap-4">
          <div className="mb-4 text-muted-foreground text-sm">
            2/3 Daily Journal
          </div>
          <h1 className="font-bold text-3xl">Record your day</h1>
          <p className="text-lg">
            Answer these questions to track your progress and identify areas for
            improvement:
          </p>
        </div>
        <div className="flex flex-col flex-1 gap-2 mb-4">
          <Card className="">
            <CardContent className="flex flex-col gap-4 p-4 sm:p-6">
              <div>
                <Label
                  htmlFor="trainingAndCompetition"
                  className="font-bold text-lg"
                >
                  How was your training and competition today?
                </Label>
                <Textarea
                  id="trainingAndCompetition"
                  placeholder="Describe your training session and any competitions you participated in. Include specific drills, skills you worked on, and your performance in competitions."
                  value={journalData.details.trainingAndCompetition}
                  onChange={(e) =>
                    updateJournalData("trainingAndCompetition", e.target.value)
                  }
                  className="mt-2 max-h-36 sm:max-h-28 aspect-[16/10]"
                />
              </div>
              <div>
                <Label htmlFor="nutrition" className="font-bold text-lg">
                  Did you make healthy nutrition choices today?
                </Label>
                <Textarea
                  id="nutrition"
                  placeholder="Reflect on your food choices. Did you fuel your body properly for your athletic needs?"
                  value={journalData.details.nutrition}
                  onChange={(e) =>
                    updateJournalData("nutrition", e.target.value)
                  }
                  className="mt-2 max-h-24 aspect-[2.5]"
                />
              </div>
              <div>
                <Label htmlFor="sleep" className="font-bold text-lg">
                  How was your sleep last night?
                </Label>
                <Textarea
                  id="sleep"
                  placeholder="How many hours did you sleep? How was the quality of your sleep?"
                  value={journalData.details.sleep}
                  onChange={(e) => updateJournalData("sleep", e.target.value)}
                  className="mt-2 max-h-24 aspect-[2.5]"
                />
              </div>
              <div>
                <Label htmlFor="mentalState" className="font-bold text-lg">
                  How do you feel mentally today?
                </Label>
                <Textarea
                  id="mentalState"
                  placeholder="Describe your mood, stress level, and overall mental state."
                  value={journalData.details.mentalState}
                  onChange={(e) =>
                    updateJournalData("mentalState", e.target.value)
                  }
                  className="mt-2 max-h-24 aspect-[2.5]"
                />
              </div>
              <div>
                <Label htmlFor="changeTomorrow" className="font-bold text-lg">
                  What will you do differently tomorrow?
                </Label>
                <Textarea
                  id="changeTomorrow"
                  placeholder="Reflect on your day and identify areas for improvement or new strategies to try."
                  value={journalData.details.changeTomorrow}
                  onChange={(e) =>
                    updateJournalData("changeTomorrow", e.target.value)
                  }
                  className="mt-2 max-h-24 aspect-[2.5]"
                />
              </div>
              <div>
                <Label htmlFor="continueTomorrow" className="font-bold text-lg">
                  What positive things will you continue doing tomorrow?
                </Label>
                <Textarea
                  id="continueTomorrow"
                  placeholder="Identify successful habits or actions from today that you want to maintain."
                  value={journalData.details.continueTomorrow}
                  onChange={(e) =>
                    updateJournalData("continueTomorrow", e.target.value)
                  }
                  className="mt-2 max-h-24 aspect-[2.5]"
                />
              </div>
            </CardContent>
          </Card>
          {error && <Error error={error} />}
        </div>
      </div>
      <div className="flex justify-between p-4 border-t">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("journal-overview")}
        >
          Back
        </Button>
        <Button
          className="bg-green-500 text-white"
          onClick={handleSaveGoal2}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <>
              <LoadingIndicator />
              Submitting...
            </>
          ) : (
            "Submit Journal"
          )}
        </Button>
      </div>
    </div>
  );
}
