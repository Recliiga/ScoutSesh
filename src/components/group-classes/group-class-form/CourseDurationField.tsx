import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CourseDurationField({
  duration,
  setDuration,
  customDuration,
  setCustomDuration,
}: {
  duration: string;
  setDuration(value: string): void;
  customDuration: string;
  setCustomDuration(value: string): void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Lesson Duration (minutes)</Label>
      <RadioGroup
        name="lessonDuration"
        value={String(duration)}
        onValueChange={(value) => {
          if (value === "custom") return;
          setDuration(value);
        }}
        className="grid grid-cols-2 gap-4"
      >
        {/* <div className="space-y-2">
          {["15", "30", "45", "60"].map((duration) => (
            <div key={duration} className="flex items-center space-x-2">
              <RadioGroupItem value={duration} id={`duration-${duration}`} />
              <Label
                htmlFor={`duration-${duration}`}
              >{`${duration} minutes`}</Label>
            </div>
          ))}
        </div> */}
        <div className="space-y-2">
          {["15", "30", "45", "custom"].map((duration) => (
            <div key={duration} className="flex items-center space-x-2">
              <RadioGroupItem value={duration} id={`duration-${duration}`} />
              <Label htmlFor={`duration-${duration}`}>
                {duration === "custom" ? "Custom" : `${duration} minutes`}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
      {duration === "custom" && (
        <Input
          type="number"
          min="1"
          name="customDuration"
          value={customDuration}
          onChange={(e) => setCustomDuration(e.target.value)}
          placeholder="Enter custom duration"
          className="mt-2 w-full"
          required
        />
      )}
    </div>
  );
}
