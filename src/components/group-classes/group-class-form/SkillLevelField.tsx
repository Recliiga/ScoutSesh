import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SkillLevelField({
  skillLevels,
  toggleSkillLevel,
}: {
  skillLevels: string[];
  toggleSkillLevel(level: "beginner" | "intermediate" | "advanced"): void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Skill Level</Label>
      <div className="mt-2 flex flex-col space-y-2">
        <Label
          htmlFor={"beginner"}
          className="flex items-center gap-2 capitalize"
        >
          <Checkbox
            id={"beginner"}
            checked={skillLevels.includes("beginner")}
            onCheckedChange={() => toggleSkillLevel("beginner")}
          />
          Beginner
        </Label>
        <Label
          htmlFor={"intermediate"}
          className="flex items-center gap-2 capitalize"
        >
          <Checkbox
            id={"intermediate"}
            checked={skillLevels.includes("intermediate")}
            onCheckedChange={() => toggleSkillLevel("intermediate")}
          />
          Intermediate
        </Label>
        <Label
          htmlFor={"advanced"}
          className="flex items-center gap-2 capitalize"
        >
          <Checkbox
            id={"advanced"}
            checked={skillLevels.includes("advanced")}
            onCheckedChange={() => toggleSkillLevel("advanced")}
          />
          Advanced
        </Label>
      </div>
    </div>
  );
}
