import { OrderType } from "@/db/models/Order";
import Image from "next/image";
import { Progress } from "../ui/progress";
import Link from "next/link";
import { CheckCircle, PlayCircle } from "lucide-react";

export default function VideoLibraryCourseCard({
  order,
}: {
  order: OrderType;
}) {
  const course = order.course;
  const totalLessons = course.videos.length;
  const completedLessons = order.completedLessons;
  const progress = Math.floor(
    (order.completedLessons.length / course.videos.length) * 100
  );

  const coaches = course.coaches.map(
    (coach) => coach.firstName + " " + coach.lastName
  );

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="w-full h-48 overflow-hidden relative">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="480px"
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
          {coaches.join(", ")}
        </p>
        <Progress value={progress} className="mt-auto" />
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span>{progress}% complete</span>
          <span>
            {completedLessons.length}/{totalLessons} lessons
          </span>
        </div>
        <Link
          href={`/dashboard/group-classes/my-classes/${course._id}`}
          className="w-full bg-green-500 hover:bg-green-600 text-white flex-center rounded-md px-4 py-2 text-sm font-medium"
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
