import { Button } from "@/components/ui/button";
import EvaluationSkillSlider from "./EvaluationSkillSlider";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { UpdateEvaluationDataParams } from "./EvaluationForm";

export default function EvaluationSportSpecificSkillAssessmentScreen({
  evaluationData,
  updateEvaluationData,
  setCurrentScreen,
}: {
  evaluationData: AthleteEvaluationType;
  updateEvaluationData<T extends keyof AthleteEvaluationType>(
    ...params: UpdateEvaluationDataParams<T>
  ): void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex-1 flex-col gap-8">
      <div className="flex">
        <div className="w-full space-y-4">
          <div className="mb-4 text-sm text-muted-foreground">
            4/6 Athlete Evaluation
          </div>
          <h1 className="text-3xl font-bold">Assess Your Volleyball Skills</h1>
          <p className="mb-4 text-lg">
            Rate your current level for each sport-specific skill:
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] lg:grid-cols-4">
            {evaluationData.sportSpecificSkillAssessments.map(
              (assessment, index) => (
                <EvaluationSkillSlider
                  key={index}
                  skill={assessment.skill}
                  currentLevel={assessment.currentLevel}
                  onCurrentLevelChange={(newLevel) =>
                    updateEvaluationData(
                      "sportSpecificSkillAssessments",
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
          onClick={() => setCurrentScreen("mental-skill-assessment")}
        >
          Back
        </Button>
        <Button
          className="bg-green-500 text-white"
          onClick={() => setCurrentScreen("player-feedback")}
        >
          Next: Overall Self-Assessment
        </Button>
      </div>
    </div>
  );
}
