import { useState } from "react";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { UpdateEvaluationDataParams } from "./EvaluationForm";
// import DatePicker from "../DatePicker";
// import { isBefore } from "date-fns";
import { createCoachEvaluation } from "@/actions/AthleteEvaluationActions";
import Error from "../AuthError";
import LoadingIndicator from "../LoadingIndicator";
import { AthleteEvaluationOrderType } from "@/db/models/AthleteEvaluationOrder";

export default function EvaluationPlayerFeedbackScreen({
  evaluationData,
  updateEvaluationData,
  setCurrentScreen,
  setEvaluationId,
  order,
}: {
  evaluationData: AthleteEvaluationType;
  updateEvaluationData<T extends keyof AthleteEvaluationType>(
    ...params: UpdateEvaluationDataParams<T>
  ): void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  setEvaluationId: React.Dispatch<React.SetStateAction<string>>;
  order: AthleteEvaluationOrderType;
}) {
  // const [calendarOpen, setCalendarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cannotSubmit = evaluationData.coachFeedback.questions.some(
    (question) => question.response.trim() === "",
  );
  // evaluationData.nextEvaluationTime.trim() === "" ||
  // evaluationData.nextEvaluationDate.trim() === "";

  // function handleDateSelect(value: Date | undefined) {
  //   if (!value) return;
  //   updateEvaluationData("nextEvaluationDate", value.toDateString(), null);
  //   setCalendarOpen(false);
  // }

  async function handleSubmitEvaluation() {
    if (cannotSubmit) return;
    setLoading(true);
    // console.log({ evaluationData, order });
    // setLoading(false);
    // return;
    const { newEvaluation, error } = await createCoachEvaluation(
      order,
      evaluationData,
    );
    if (newEvaluation) {
      setEvaluationId(newEvaluation._id);
      setLoading(false);
      setCurrentScreen("completion");
    } else {
      setError(error);
    }
  }

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
          <p>{evaluationData.coachFeedback.description}</p>
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
          {/* <div className="rounded-md border-l-4 border-primary bg-primary/10 p-4">
            <Label
              htmlFor="next-evaluation-date-time"
              className="text-lg font-semibold text-primary"
            >
              Next Evaluation Date and Time:
            </Label>
            <div className="mt-2 flex space-x-2">
              <DatePicker
                pickerClassName="bg-white border-[#bbb]"
                closeCalendar={() => setCalendarOpen(false)}
                calendarOpen={calendarOpen}
                toggleCalendar={() => setCalendarOpen((prev) => !prev)}
                selected={new Date(evaluationData.nextEvaluationDate)}
                onSelect={handleDateSelect}
                disabled={(date) => isBefore(date, new Date())}
                mode="single"
              >
                {evaluationData.nextEvaluationDate}
              </DatePicker>

              <Input
                id="next-evaluation-time"
                type="time"
                className="w-fit border-[#bbb] bg-white"
                value={evaluationData.nextEvaluationTime}
                onChange={(e) =>
                  updateEvaluationData(
                    "nextEvaluationTime",
                    e.target.value,
                    null,
                  )
                }
              />
            </div>
          </div> */}
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
