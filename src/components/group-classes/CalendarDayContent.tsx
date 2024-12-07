import { format } from "date-fns";
import { CourseType } from "./CalendarDay";
import { getCourseTimeString, getFullname } from "@/lib/utils";

export default function CalendarDayContent({
  courses,
  date,
}: {
  courses: CourseType[];
  date: Date;
}) {
  return (
    <div className="p-2">
      <div className="mb-2 font-bold">{format(date, "MMMM d, yyyy")}</div>
      {courses.map((course, index) => (
        <div
          key={`${course._id}-${index}`}
          className="mb-2 last:mb-0 text-xs flex flex-col gap-1"
        >
          <div className="font-semibold">
            {getCourseTimeString(course.time)}
          </div>
          <div>{course.title}</div>
          <div className="text-muted-foreground">
            {getFullname(course.coach)}
          </div>
        </div>
      ))}
    </div>
  );
}
