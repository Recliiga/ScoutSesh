import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CourseTypeField({
  courseType,
  handleChangeCourseType,
}: {
  courseType: "live" | "video" | undefined;
  handleChangeCourseType(value: "live" | "video"): void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Course Type</Label>
      <RadioGroup
        name="courseType"
        value={courseType}
        onValueChange={handleChangeCourseType}
        className="mt-2 flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="live" id="live-course" tabIndex={0} />
          <Label htmlFor="live-course">Live Class</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="video" id="video-course" tabIndex={0} />
          <Label htmlFor="video-course">Video Course</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
