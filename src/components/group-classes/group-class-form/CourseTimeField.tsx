import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CourseTimeField({
  startTime,
  setStartTime,
}: {
  startTime: {
    hours: string;
    mins: string;
  };
  setStartTime: React.Dispatch<
    React.SetStateAction<{
      hours: string;
      mins: string;
    }>
  >;
}) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="startTime">Start Time</Label>
      <Input
        id="startTime"
        name="startTime"
        // min={"10:00"}
        value={`${startTime.hours}:${startTime.mins}`}
        onChange={(e) => {
          const hours = e.target.value.split(":")[0];
          const mins = e.target.value.split(":")[1];
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
