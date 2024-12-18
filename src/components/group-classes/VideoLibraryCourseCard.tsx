import { GroupClassOrderType } from "@/db/models/GroupClassOrder";
import Image from "next/image";
import { Progress } from "../ui/progress";
import Link from "next/link";
import { CheckCircle, PlayCircle } from "lucide-react";

export default function VideoLibraryCourseCard({
  order,
}: {
  order: GroupClassOrderType;
}) {
  const course = order.course;
  const totalLessons = course.videos.length;
  const completedLessons = order.completedLessons;
  const progress = Math.floor(
    (order.completedLessons.length / course.videos.length) * 100,
  );

  const coaches = course.coaches.map(
    (coach) => coach.firstName + " " + coach.lastName,
  );

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border shadow-sm">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="480px"
          className="bg-accent-gray-200 object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="mb-2 line-clamp-1 text-sm text-gray-600">
          {coaches.join(", ")}
        </p>
        <Progress value={progress} className="mt-auto" />
        <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
          <span>{progress}% complete</span>
          <span>
            {completedLessons.length}/{totalLessons} lessons
          </span>
        </div>
        <Link
          href={`/dashboard/group-classes/my-classes/${course._id}`}
          className="flex-center w-full rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          {progress === 100 ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" /> Completed
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
