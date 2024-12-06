import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SkillSlider from "./SkillSlider";
import React, { useState } from "react";
import { SkillType } from "./CreateAthleteEvaluationTemplateForm";

const sportOptions = [
  { value: "volleyball", label: "Volleyball" },
  { value: "basketball", label: "Basketball" },
  { value: "soccer", label: "Soccer" },
  { value: "tennis", label: "Tennis" },
  { value: "swimming", label: "Swimming" },
  { value: "baseball", label: "Baseball" },
  { value: "football", label: "Football" },
  { value: "golf", label: "Golf" },
  { value: "hockey", label: "Hockey" },
  { value: "rugby", label: "Rugby" },
  { value: "cricket", label: "Cricket" },
  { value: "track_and_field", label: "Track and Field" },
  { value: "gymnastics", label: "Gymnastics" },
  { value: "boxing", label: "Boxing" },
  { value: "martial_arts", label: "Martial Arts" },
];

export default function SportSpecificSkillAssessmentScreen({
  selectedSport,
  handleSportChange,
  sportSpecificSkillAssessments,
  setSportSpecificSkillAssessments,
  setCurrentScreen,
}: {
  selectedSport: string;
  handleSportChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  sportSpecificSkillAssessments: SkillType[];
  setSportSpecificSkillAssessments: React.Dispatch<
    React.SetStateAction<SkillType[]>
  >;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [newSkillName, setNewSkillName] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const cannotSubmit =
    isAddingSkill ||
    sportSpecificSkillAssessments.filter((skill) => skill.checked).length <= 0;

  function addCustomSkill() {
    if (newSkillName.trim() === "") return;
    setSportSpecificSkillAssessments((prev) => [
      ...prev,
      { name: newSkillName, currentLevel: 5, checked: true },
    ]);
    setNewSkillName("");
    setIsAddingSkill(false);
  }

  function toggleSkill(skillName: string) {
    setSportSpecificSkillAssessments((prev) =>
      prev.map((skill) =>
        skill.name === skillName ? { ...skill, checked: !skill.checked } : skill
      )
    );
  }

  function updateSportSpecificSkillAssessment(
    skillName: string,
    value: string
  ) {
    setSportSpecificSkillAssessments((prev) =>
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
        <div className="w-full space-y-4 pb-4">
          <div className="mb-4 text-sm text-muted-foreground">
            4/7 Athlete Evaluation
          </div>
          <h1 className="text-3xl font-bold">
            Assess Your Sport Specific Skills
          </h1>
          <p className="text-gray-600 mb-4">
            Rate your current level for each sport-specific skill:
          </p>

          <div>
            <h2 className="text-2xl font-bold mb-2">Select Sport</h2>
            <select
              className="border rounded-md text-sm p-2"
              value={selectedSport}
              onChange={handleSportChange}
            >
              <option hidden>Select Sport</option>
              {sportOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {selectedSport && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Sport Specific Skills</h2>
              <p className="text-gray-600 mb-4">
                Evaluate the athlete&apos;s sport-specific skills
              </p>
              <div className="relative w-full overflow-x-auto pb-4 mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] lg:grid-cols-4 gap-x-4 gap-y-6">
                  {sportSpecificSkillAssessments
                    .filter((skill) => skill.checked)
                    .map((skill, index) => (
                      <SkillSlider
                        key={index}
                        skill={skill.name}
                        currentLevel={skill.currentLevel}
                        updatePhysicalSkillAssessment={
                          updateSportSpecificSkillAssessment
                        }
                        deleteSkill={() => toggleSkill(skill.name)}
                      />
                    ))}
                </div>
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
                  Add Custom Skill
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between pt-4 border-t gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentScreen("mental-skill-assessment")}
        >
          Back
        </Button>
        <Button
          disabled={cannotSubmit}
          className="bg-green-600 text-white"
          onClick={() => setCurrentScreen("player-feedback")}
        >
          Next: Overall Feedback
        </Button>
      </div>
    </div>
  );
}
