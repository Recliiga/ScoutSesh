import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function EvaluationSkillSlider({
  skill,
  currentLevel,
  onCurrentLevelChange,
}: {
  skill: string;
  currentLevel: number;
  onCurrentLevelChange(newLevel: number): void;
}) {
  const [changed, setChanged] = useState(false);

  function handleChange(value: number) {
    onCurrentLevelChange(value);
    setChanged(true);
  }

  return (
    <Card>
      <CardHeader
        className={`rounded-t-lg p-3 text-primary-foreground ${changed ? "bg-green-600" : "bg-primary"}`}
      >
        <CardTitle className="text-sm font-bold">{skill}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2 pt-3">
        <div className="space-y-3">
          <input
            className={`w-full rounded-md ring-accent-gray-200 ring-offset-2 focus-visible:ring ${changed ? "accent-green-600" : "accent-accent-black"}`}
            type="range"
            min={1}
            max={10}
            step={1}
            value={currentLevel}
            onChange={(e) => handleChange(Number(e.target.value))}
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
