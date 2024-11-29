import LiveClassCard from "@/components/group-classes/LiveClassCard";
import CourseCard from "@/components/group-classes/CourseCard";
import Link from "next/link";
import BackButton from "@/components/dashboard/BackButton";
import { GroupClassType } from "@/db/models/GroupClass";

export default function CoachCoursesView({
  liveClasses,
  courses,
}: {
  liveClasses: GroupClassType[];
  courses: GroupClassType[];
}) {
  return (
    <div className="max-w-4xl mx-auto py-4 flex-1 w-[90%]">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Live Classes</h2>
        <div className="grid gap-4">
          {liveClasses.length > 0 ? (
            liveClasses.map((liveClass) => (
              <LiveClassCard key={liveClass._id} liveClass={liveClass} />
            ))
          ) : (
            <p className="text-accent-gray-300">
              You haven&apos;t created any live classes yet
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Course Library</h2>
        <div className="grid gap-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p className="text-accent-gray-300">
              You haven&apos;t created any courses yet
            </p>
          )}
        </div>
      </section>

      <div className="mt-8 flex justify-between">
        <BackButton />
        <Link
          href={"/dashboard/group-classes/create"}
          className="bg-white font-medium text-green-600 border px-4 py-2 rounded-md text-sm border-green-600 hover:bg-green-600 hover:text-white transition-colors"
        >
          Create New Class
        </Link>
      </div>
    </div>
  );
}
