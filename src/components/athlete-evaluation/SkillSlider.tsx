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
      <CardHeader className="rounded-t-lg bg-primary p-3 text-primary-foreground">
        <CardTitle className="flex items-center justify-between text-sm font-bold">
          <span>{skill}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={deleteSkill}
            className="px-2 text-[#ccc] duration-200 hover:bg-[#333] hover:text-white"
          >
            <X />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2 pt-3">
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
