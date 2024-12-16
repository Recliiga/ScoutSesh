import LiveClassCard from "@/components/group-classes/LiveClassCard";
import CourseCard from "@/components/group-classes/CourseCard";
import Link from "next/link";
import BackButton from "@/components/dashboard/BackButton";
import { GroupClassType } from "@/db/models/GroupClass";
import { OrderType } from "@/db/models/Order";

export default function CoachCoursesView({
  liveClasses,
  courses,
  groupClassOrders,
}: {
  liveClasses: GroupClassType[];
  courses: GroupClassType[];
  groupClassOrders: OrderType[];
}) {
  return (
    <div className="mx-auto flex w-[90%] max-w-5xl flex-1 flex-col py-4">
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Live Classes</h2>
        <div className="grid gap-4">
          {liveClasses.length > 0 ? (
            liveClasses.map((liveClass) => (
              <LiveClassCard
                key={liveClass._id}
                liveClass={liveClass}
                students={groupClassOrders
                  .filter((order) => order.course._id === liveClass._id)
                  .map((order) => order.user)}
              />
            ))
          ) : (
            <p className="text-accent-gray-300">
              You haven&apos;t created any live classes yet
            </p>
          )}
        </div>
      </section>

      <section className="mb-auto">
        <h2 className="mb-4 text-2xl font-bold">Course Library</h2>
        <div className="grid gap-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                students={groupClassOrders
                  .filter((order) => order.course._id === course._id)
                  .map((order) => order.user)}
              />
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
          className="rounded-md border border-green-600 bg-white px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-600 hover:text-white"
        >
          Create New Class
        </Link>
      </div>
    </div>
  );
}
