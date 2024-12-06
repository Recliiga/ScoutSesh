import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function SkillSlider({
  skill,
  currentLevel,
  updatePhysicalSkillAssessment,
  deleteSkill,
}: {
  skill: string;
  currentLevel: number;
  updatePhysicalSkillAssessment(skillName: string, value: string): void;
  deleteSkill(): void;
}) {
  return (
    <Card>
      <CardHeader className="bg-primary text-primary-foreground p-3 rounded-t-lg">
        <CardTitle className="text-sm font-bold justify-between items-center flex">
          <span>{skill}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={deleteSkill}
            className="hover:bg-[#333] duration-200 px-2 hover:text-white text-[#ccc]"
          >
            <X />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 pb-2 px-3">
        <div className="space-y-3">
          <input
            className="w-full accent-accent-black"
            type="range"
            min={1}
            max={10}
            step={1}
            value={currentLevel}
            onChange={(e) =>
              updatePhysicalSkillAssessment(skill, e.target.value)
            }
          />
          <div className="flex justify-between text-xs font-medium">
            <span>1</span>
            <span>10</span>
          </div>
          <p className="text-center text-sm font-semibold">
            Level: {currentLevel}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
