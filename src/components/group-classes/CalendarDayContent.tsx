import { format } from "date-fns";
import { CourseType } from "./CalendarDay";
import { formatTime } from "@/lib/utils";

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
        <div key={`${course.id}-${index}`} className="mb-1 text-xs">
          <div className="font-semibold">{formatTime(course.time)}</div>
          <div>{course.title}</div>
          <div className="text-muted-foreground">{course.instructors}</div>
        </div>
      ))}
    </div>
  );
}
