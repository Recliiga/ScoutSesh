import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { UpdateEvaluationDataParams } from "./EvaluationForm";
import {
  createSelfEvaluation,
  createCoachAthleteEvaluation,
} from "@/actions/AthleteEvaluationActions";
import Error from "../AuthError";
import LoadingIndicator from "../LoadingIndicator";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";

export default function EvaluationPlayerFeedbackScreen({
  evaluationData,
  updateEvaluationData,
  setCurrentScreen,
  setEvaluationId,
  order,
  isSelfEvaluation,
  athleteFirstName,
}: {
  evaluationData: AthleteEvaluationType;
  updateEvaluationData<T extends keyof AthleteEvaluationType>(
    ...params: UpdateEvaluationDataParams<T>
  ): void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  setEvaluationId: React.Dispatch<React.SetStateAction<string>>;
  order: AthleteEvaluationOrderType;
  isSelfEvaluation: boolean;
  athleteFirstName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cannotSubmit = evaluationData.coachFeedback.questions.some(
    (question) => question.response.trim() === "",
  );

  async function handleSubmitEvaluation() {
    if (cannotSubmit) return;
    setLoading(true);
    const { newEvaluation, error } = isSelfEvaluation
      ? await createSelfEvaluation(order, evaluationData)
      : await createCoachAthleteEvaluation(order, evaluationData);
    if (newEvaluation) {
      setEvaluationId(newEvaluation._id);
      setLoading(false);
      setCurrentScreen("completion");
    } else {
      setLoading(false);
      setError(error);
    }
  }

  const formattedAthleteName =
    athleteFirstName.at(-1)?.toLowerCase() === "s"
      ? `${athleteFirstName}'`
      : `${athleteFirstName}'s`;

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center text-sm">
      <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <div className="mb-4 text-sm text-muted-foreground">
            5/6 Athlete Evaluation
          </div>
          <h1 className="mb-4 text-3xl font-bold">
            {evaluationData.coachFeedback.title}
          </h1>
          <p className="text-base">
            {isSelfEvaluation
              ? evaluationData.coachFeedback.description
              : evaluationData.coachFeedback.description.replaceAll(
                  "your",
                  formattedAthleteName,
                )}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-4 sm:gap-6">
          <Card className="space-y-4">
            <CardContent className="space-y-4 p-4 sm:p-6">
              {evaluationData.coachFeedback.questions.map((question, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Label className="text-sm font-medium">
                    {question.label}
                  </Label>
                  <Textarea
                    className="w-full"
                    placeholder={question.placeholder}
                    value={question.response}
                    onChange={(e) =>
                      updateEvaluationData(
                        "coachFeedback",
                        e.target.value,
                        index,
                      )
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          {error && <Error error={error} />}
        </div>
      </div>
      <div className="mt-8 flex w-full max-w-4xl justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("sport-specific-skill-assessment")}
        >
          Back
        </Button>
        <Button
          disabled={loading || cannotSubmit}
          className="bg-green-600 text-white"
          onClick={handleSubmitEvaluation}
        >
          {loading ? (
            <>
              <LoadingIndicator />
              Submitting...
            </>
          ) : (
            "Submit Athlete Evaluation"
          )}
        </Button>
      </div>
    </div>
  );
}
