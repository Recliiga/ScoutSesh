import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SkillType } from "./CreateAthleteEvaluationTemplateForm";
import SkillSlider from "./SkillSlider";
import { useState } from "react";

type PropsType = {
  mentalSkillAssessments: SkillType[];
  setMentalSkillAssessments: React.Dispatch<React.SetStateAction<SkillType[]>>;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
};

export default function MentalSkillAssessmentScreen({
  mentalSkillAssessments,
  setCurrentScreen,
  setMentalSkillAssessments,
}: PropsType) {
  const [newSkillName, setNewSkillName] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const cannotSubmit =
    isAddingSkill ||
    mentalSkillAssessments.filter((skill) => skill.checked).length <= 0;

  function addCustomSkill() {
    if (newSkillName.trim() === "") return;
    setMentalSkillAssessments((prev) => [
      ...prev,
      { name: newSkillName, currentLevel: 5, checked: true },
    ]);
    setNewSkillName("");
    setIsAddingSkill(false);
  }

  function toggleSkill(skillName: string) {
    setMentalSkillAssessments((prev) =>
      prev.map((skill) =>
        skill.name === skillName ? { ...skill, checked: !skill.checked } : skill
      )
    );
  }

  function updateMentalSkillAssessment(skillName: string, value: string) {
    setMentalSkillAssessments((prev) =>
      prev.map((skill) =>
        skill.name === skillName
          ? { ...skill, currentLevel: Number(value) }
          : skill
      )
    );
  }

  return (
    <div className="flex-1 flex-col gap-8">
      <div className="flex">
        <div className="w-full space-y-4">
          <div className="mb-4 text-sm text-muted-foreground">
            3/7 Athlete Evaluation
          </div>
          <h1 className="text-3xl font-bold">Assess Your Mental Skills</h1>
          <p className="text-gray-600 mb-4">
            Rate your current level for each mental skill:
          </p>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Mental Skills</h2>
            <p className="text-gray-600 mb-4">
              Select the mental skills you wish to evaluate
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] lg:grid-cols-4 gap-x-4 gap-y-2 mb-4">
              {mentalSkillAssessments.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    className="accent-accent-black"
                    type="checkbox"
                    name={`skill-${index}`}
                    id={`skill-${index}`}
                    checked={skill.checked}
                    onChange={() => toggleSkill(skill.name)}
                  />
                  <Label htmlFor={`skill-${index}`} className="text-sm">
                    {skill.name}
                  </Label>
                </div>
              ))}
            </div>
            {isAddingSkill ? (
              <div className="flex items-center space-x-2 mt-4">
                <Input
                  type="text"
                  placeholder="Enter new skill name"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="flex-grow"
                />
                <Button
                  onClick={addCustomSkill}
                  disabled={newSkillName.trim() === ""}
                >
                  Add Skill
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingSkill(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsAddingSkill(true)}
                className="mt-4 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add More Mental Skills
              </Button>
            )}
          </div>

          <div className="relative w-full overflow-x-auto pb-4 mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] lg:grid-cols-4 gap-x-4 gap-y-6">
              {mentalSkillAssessments
                .filter((skill) => skill.checked)
                .map((assessment, index) => (
                  <SkillSlider
                    key={index}
                    skill={assessment.name}
                    currentLevel={assessment.currentLevel}
                    updatePhysicalSkillAssessment={updateMentalSkillAssessment}
                    deleteSkill={() => toggleSkill(assessment.name)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4 border-t gap-2">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("physical-skill-assessment")}
          className="px-2 sm:px-4"
        >
          Back
        </Button>
        <Button
          disabled={cannotSubmit}
          className="bg-green-600 text-white px-2 sm:px-4"
          onClick={() => setCurrentScreen("sport-specific-skill-assessment")}
        >
          Next: Sport Specific Skill Assessment
        </Button>
      </div>
    </div>
  );
}
