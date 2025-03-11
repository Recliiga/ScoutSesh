import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SkillSlider from "./SkillSlider";
import React, { useState } from "react";
import { SkillType } from "./AthleteEvaluationTemplateForm";

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
  { value: "lacrosse", label: "Lacrosse" },
  { value: "other", label: "Other" },
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
        skill.name === skillName
          ? { ...skill, checked: !skill.checked }
          : skill,
      ),
    );
  }

  function updateSportSpecificSkillAssessment(
    skillName: string,
    value: string,
  ) {
    setSportSpecificSkillAssessments((prev) =>
      prev.map((skill) =>
        skill.name === skillName
          ? { ...skill, currentLevel: Number(value) }
          : skill,
      ),
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
          <p className="mb-4 text-gray-600">
            Rate your current level for each sport-specific skill:
          </p>

          <div>
            <h2 className="mb-2 text-2xl font-bold">Select Sport</h2>
            <select
              className="rounded-md border p-2 text-sm"
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
              <h2 className="mb-2 text-2xl font-bold">Sport Specific Skills</h2>
              <p className="mb-4 text-gray-600">
                Evaluate the athlete&apos;s sport-specific skills
              </p>
              <div className="relative mb-4 w-full overflow-x-auto pb-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] lg:grid-cols-4">
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
                <div className="mt-4 flex items-center space-x-2">
                  <Input
                    name="newSkillName"
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
                  <PlusCircle className="h-4 w-4" />
                  Add Custom Skill
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-4 border-t pt-4">
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
