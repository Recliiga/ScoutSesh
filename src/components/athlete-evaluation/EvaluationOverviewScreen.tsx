import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { UpdateEvaluationDataParams } from "./EvaluationForm";
import BackButton from "../dashboard/BackButton";
import Select from "../Select";
import { AthleteEvaluationTemplateType } from "@/db/models/AthleteEvaluationTemplate";

export default function EvaluationOverviewScreen({
  evaluationData,
  updateEvaluationData,
  setCurrentScreen,
  coachTemplates,
  templateId,
  handleSelectTemplate,
}: {
  evaluationData: AthleteEvaluationType | null;
  updateEvaluationData<T extends keyof AthleteEvaluationType>(
    ...params: UpdateEvaluationDataParams<T>
  ): void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  coachTemplates: AthleteEvaluationTemplateType[];
  templateId: string;
  handleSelectTemplate(templateId: string): void;
}) {
  const cannotSubmit = evaluationData
    ? evaluationData.overviewDetails.questions.some(
        (question) => question.response.trim() === "",
      )
    : true;

  console.log({ templateId });
  console.log({ evaluationData });
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-sm">
      {evaluationData ? (
        <div className="flex w-full flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              1/6 Athlete Evaluation
            </div>
            <h1 className="mb-2 text-3xl font-bold sm:mb-4">
              {evaluationData.overviewDetails.title}
            </h1>
            <p className="text-base">
              {evaluationData.overviewDetails.description}
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            {evaluationData.overviewDetails.questions.map((question, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Label className="text-sm font-medium">{question.label}</Label>
                <Textarea
                  className="w-full"
                  placeholder={question.placeholder}
                  value={question.response}
                  onChange={(e) =>
                    updateEvaluationData(
                      "overviewDetails",
                      e.target.value,
                      index,
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col gap-2">
          <h4 className="text-sm font-medium">Choose your Template</h4>
          <Select
            placeholder="Select Template"
            value={templateId}
            onChange={handleSelectTemplate}
          >
            <Select.Content>
              {coachTemplates.map((template) => (
                <Select.Option key={template._id} value={template._id}>
                  {template.name}
                </Select.Option>
              ))}
            </Select.Content>
          </Select>
        </div>
      )}
      <div className="mt-8 flex w-full justify-between">
        <BackButton />
        <Button
          disabled={cannotSubmit}
          className="bg-green-500 text-white"
          onClick={() => setCurrentScreen("physical-skill-assessment")}
        >
          Next: Physical Skill Assessment
        </Button>
      </div>
    </div>
  );
}
