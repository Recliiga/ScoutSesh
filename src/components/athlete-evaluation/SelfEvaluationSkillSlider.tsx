import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SelfEvaluationSkillSlider({
  skill,
  currentLevel,
  onCurrentLevelChange,
}: {
  skill: string;
  currentLevel: number;
  onCurrentLevelChange(newLevel: number): void;
}) {
  return (
    <Card>
      <CardHeader className="rounded-t-lg bg-primary p-3 text-primary-foreground">
        <CardTitle className="text-sm font-bold">{skill}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2 pt-3">
        <div className="space-y-3">
          <input
            className="w-full rounded-md accent-accent-black ring-accent-gray-200 ring-offset-2 focus-visible:ring"
            type="range"
            min={1}
            max={10}
            step={1}
            value={currentLevel}
            onChange={(e) => onCurrentLevelChange(Number(e.target.value))}
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
