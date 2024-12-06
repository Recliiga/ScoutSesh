import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SkillSlider from "./SkillSlider";
import { SkillType } from "./AthleteEvaluationTemplateForm";
import { PlusCircle } from "lucide-react";

type PropsType = {
  physicalSkillAssessments: SkillType[];
  setPhysicalSkillAssessments: React.Dispatch<
    React.SetStateAction<SkillType[]>
  >;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
};

export default function PhysicalSkillAssessmentScreen({
  physicalSkillAssessments,
  setPhysicalSkillAssessments,
  setCurrentScreen,
}: PropsType) {
  const [newSkillName, setNewSkillName] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const cannotSubmit =
    isAddingSkill ||
    physicalSkillAssessments.filter((skill) => skill.checked).length <= 0;

  function addCustomSkill() {
    if (newSkillName.trim() === "") return;
    setPhysicalSkillAssessments((prev) => [
      ...prev,
      { name: newSkillName, currentLevel: 5, checked: true },
    ]);
    setNewSkillName("");
    setIsAddingSkill(false);
  }

  function toggleSkill(skillName: string) {
    setPhysicalSkillAssessments((prev) =>
      prev.map((skill) =>
        skill.name === skillName ? { ...skill, checked: !skill.checked } : skill
      )
    );
  }

  function updatePhysicalSkillAssessment(skillName: string, value: string) {
    setPhysicalSkillAssessments((prev) =>
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
            2/7 Athlete Evaluation
          </div>
          <h1 className="text-3xl font-bold">Assess Your Physical Skills</h1>
          <p className="text-gray-600 mb-4">
            Rate your current level for each physical skill:
          </p>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Physical Skills</h2>
            <p className="text-gray-600  mb-4">
              Select the physical skills you wish to evaluate
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] lg:grid-cols-4 gap-x-4 gap-y-2 mb-4">
              {physicalSkillAssessments.map((skill, index) => (
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
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={addCustomSkill}
                  disabled={newSkillName.trim() === ""}
                >
                  Add Skill
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingSkill(false);
                    setNewSkillName("");
                  }}
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
                Add More Physical Skills
              </Button>
            )}
          </div>

          <div className="relative w-full overflow-x-auto pb-4 mb-4">
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] lg:grid-cols-4 gap-x-4 gap-y-6">
              {physicalSkillAssessments
                .filter((skill) => skill.checked)
                .map((assessment, index) => (
                  <SkillSlider
                    key={index}
                    skill={assessment.name}
                    currentLevel={assessment.currentLevel}
                    updatePhysicalSkillAssessment={
                      updatePhysicalSkillAssessment
                    }
                    deleteSkill={() => toggleSkill(assessment.name)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4 border-t gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("athlete-evaluation-overview")}
        >
          Back
        </Button>
        <Button
          disabled={cannotSubmit}
          className="bg-green-600 text-white"
          onClick={() => setCurrentScreen("mental-skill-assessment")}
        >
          Next: Mental Skill Assessment
        </Button>
      </div>
    </div>
  );
}
