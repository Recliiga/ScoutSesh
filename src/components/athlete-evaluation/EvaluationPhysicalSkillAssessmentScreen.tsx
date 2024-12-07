import { Button } from "@/components/ui/button";
import SelfEvaluationSkillSlider from "./SelfEvaluationSkillSlider";
import { AthleteEvaluationDataType } from "@/db/models/AthleteEvaluation";
import { UpdateEvaluationDataParams } from "./SelfEvaluationForm";

export default function EvaluationPhysicalSkillAssessmentScreen({
  evaluationData,
  updateEvaluationData,
  setCurrentScreen,
}: {
  evaluationData: AthleteEvaluationDataType;
  updateEvaluationData<T extends keyof AthleteEvaluationDataType>(
    ...params: UpdateEvaluationDataParams<T>
  ): void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex-1 flex-col gap-8">
      <div className="mb-4 flex">
        <div className="w-full space-y-4">
          <div className="mb-4 text-sm text-muted-foreground">
            2/6 Athlete Evaluation
          </div>
          <h1 className="text-3xl font-bold">Assess Your Physical Skills</h1>
          <p className="text-lg">
            Rate your current level for each physical skill:
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] lg:grid-cols-4">
            {evaluationData.physicalSkillAssessments.map(
              (assessment, index) => (
                <SelfEvaluationSkillSlider
                  key={index}
                  skill={assessment.skill}
                  currentLevel={assessment.currentLevel}
                  onCurrentLevelChange={(newLevel) =>
                    updateEvaluationData(
                      "physicalSkillAssessments",
                      newLevel,
                      index,
                    )
                  }
                />
              ),
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between border-t pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("evaluation-overview")}
        >
          Back
        </Button>
        <Button
          className="bg-green-500 text-white"
          onClick={() => setCurrentScreen("mental-skill-assessment")}
        >
          Next: Mental Skill Assessment
        </Button>
      </div>
    </div>
  );
}
