import { Button } from "@/components/ui/button";
import EvaluationSkillSlider from "./EvaluationSkillSlider";
import { AthleteEvaluationType } from "@/db/models/AthleteEvaluation";
import { UpdateEvaluationDataParams } from "./EvaluationForm";

type PropsType = {
  evaluationData: AthleteEvaluationType;
  updateEvaluationData<T extends keyof AthleteEvaluationType>(
    ...params: UpdateEvaluationDataParams<T>
  ): void;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  isSelfEvaluation: boolean;
  athleteFirstName: string;
};

export default function EvaluationPhysicalSkillAssessmentScreen({
  evaluationData,
  updateEvaluationData,
  setCurrentScreen,
  isSelfEvaluation,
  athleteFirstName,
}: PropsType) {
  const formattedAthleteName =
    athleteFirstName.at(-1)?.toLowerCase() === "s"
      ? `${athleteFirstName}'`
      : `${athleteFirstName}'s`;

  return (
    <div className="flex-1 flex-col gap-8">
      <div className="mb-4 flex">
        <div className="w-full space-y-4">
          <div className="mb-4 text-sm text-muted-foreground">
            2/6 Athlete Evaluation
          </div>
          <h1 className="text-3xl font-bold">
            Assess {isSelfEvaluation ? "Your" : formattedAthleteName} Physical
            Skills
          </h1>
          <p className="text-lg">
            Rate {isSelfEvaluation ? "your" : formattedAthleteName} current
            level for each physical skill:
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] lg:grid-cols-4">
            {evaluationData.physicalSkillAssessments.map(
              (assessment, index) => (
                <EvaluationSkillSlider
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
