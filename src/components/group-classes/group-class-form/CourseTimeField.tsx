import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CourseTimeField({
  startTime,
  setStartTime,
}: {
  startTime: {
    hours: number;
    mins: number;
  };
  setStartTime(value: { hours: number; mins: number }): void;
}) {
  const hours = String(startTime.hours).padStart(2, "0");
  const mins = String(startTime.mins).padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="startTime">Start Time</Label>
      <Input
        id="startTime"
        name="startTime"
        // min={"10:00"}
        value={`${hours}:${mins}`}
        onChange={(e) => {
          const hours = Number(e.target.value.split(":")[0]) || 0;
          const mins = Number(e.target.value.split(":")[1]) || 0;
          setStartTime({
            hours,
            mins,
          });
        }}
        type="time"
        required
        className="w-fit"
      />
    </div>
  );
}
