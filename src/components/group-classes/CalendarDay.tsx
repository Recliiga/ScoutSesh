import { format, isAfter, isSameDay, parseISO } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatTime } from "@/lib/utils";
import CalendarDayContent from "./CalendarDayContent";

export type CourseType = {
  id: number;
  title: string;
  instructors: string;
  sessions: string[];
  time: string;
};

export default function CalendarDay({
  day,
  courses,
  today,
}: {
  day: Date;
  courses: CourseType[];
  today: Date;
}) {
  const isFutureOrToday = isAfter(day, today) || isSameDay(day, today);
  const dayCourses = courses.flatMap((course) =>
    course.sessions
      .filter((session) => isSameDay(parseISO(session), day))
      .map((session) => ({ ...course, session }))
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="p-2 border h-32 cursor-pointer overflow-hidden">
          <div className="font-bold">{format(day, "d")}</div>
          {dayCourses.map((course, index) => (
            <div
              key={`${course.id}-${index}`}
              className={`text-[10px] leading-tight mt-1 p-1 rounded ${
                isFutureOrToday ? "bg-green-100" : ""
              }`}
            >
              {formatTime(course.time)}
              <div className="line-clamp-2 text-ellipsis overflow-hidden">
                {course.title}
              </div>
            </div>
          ))}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <CalendarDayContent courses={dayCourses} date={day} />
      </PopoverContent>
    </Popover>
  );
}
