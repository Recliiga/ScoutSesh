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
      .map((session) => ({ ...course, session }))
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="p-2 border h-32 cursor-pointer overflow-hidden">
          <div className="font-bold">{day.getDate()}</div>
          {dayCourses.map((course, index) => {
            return (
              <div
                key={`${course._id}-${index}`}
                className={`text-[10px] leading-tight mt-1 p-1 rounded ${
                  isFutureOrToday ? "bg-green-100" : ""
                }`}
              >
                {getCourseTimeString(course.time)}
                <div className="line-clamp-2 text-ellipsis overflow-hidden">
                  {course.title}
                </div>
              </div>
            );
          })}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <CalendarDayContent courses={dayCourses} date={day} />
      </PopoverContent>
    </Popover>
  );
}
