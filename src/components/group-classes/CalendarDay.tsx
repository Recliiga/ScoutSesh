import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getCourseTimeString } from "@/lib/utils";
import CalendarDayContent from "./CalendarDayContent";
import { UserType } from "@/db/models/User";

export type CourseType = {
  _id: string;
  title: string;
  coach: UserType;
  sessions: Date[];
  time: {
    hours: string;
    mins: string;
  };
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
  const isFutureOrToday =
    day.toDateString() === today.toDateString() ||
    day.getTime() === today.getTime();

  const dayCourses = courses.flatMap((course) =>
    course.sessions
      .filter((session) => session.toDateString() === day.toDateString())
      .map((session) => ({ ...course, session })),
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`h-32 cursor-pointer overflow-hidden border p-2 ${dayCourses.length > 0 ? "bg-green-50" : ""} ${isFutureOrToday ? "border-green-300" : ""}`}
        >
          <div
            className={`text-sm font-bold sm:text-base ${dayCourses.length > 0 ? "text-green-500" : ""}`}
          >
            {day.getDate()}
          </div>
          {dayCourses.map((course, index) => (
            <div
              key={`${course._id}-${index}`}
              className={`mt-1 hidden rounded p-1 text-[10px] leading-tight sm:block ${
                isFutureOrToday ? "bg-green-100" : ""
              }`}
            >
              {getCourseTimeString(course.time)}
              <div className="line-clamp-2 overflow-hidden text-ellipsis">
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
