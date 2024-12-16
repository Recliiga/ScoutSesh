import LiveClassCard from "@/components/group-classes/LiveClassCard";
import CourseCard from "@/components/group-classes/CourseCard";
import BackButton from "@/components/dashboard/BackButton";
import { GroupClassType } from "@/db/models/GroupClass";
import { OrderType } from "@/db/models/Order";

export default function AthleteCoursesView({
  userId,
  userOrders,
  liveClasses,
  courses,
  groupClassOrders,
}: {
  userId: string;
  userOrders: OrderType[];
  liveClasses: GroupClassType[];
  courses: GroupClassType[];
  groupClassOrders: OrderType[];
}) {
  return (
    <div className="mx-auto w-[90%] max-w-5xl flex-1 py-4">
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Live Classes</h2>
        <div className="grid gap-4">
          {liveClasses.length > 0 ? (
            liveClasses.map((liveClass) => (
              <LiveClassCard
                key={liveClass._id}
                liveClass={liveClass}
                forAthlete
                isPurchased={userOrders.some(
                  (order) =>
                    order.user._id === userId &&
                    order.course._id === liveClass._id,
                )}
                students={groupClassOrders
                  .filter((order) => order.course._id === liveClass._id)
                  .map((order) => order.user)}
              />
            ))
          ) : (
            <p className="text-accent-gray-300">
              It looks like there are no live classes available at the moment.
              Please check back later for new live sessions and updates.
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Course Library</h2>
        <div className="grid gap-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                forAthlete
                isPurchased={userOrders.some(
                  (order) =>
                    order.user._id === userId &&
                    order.course._id === course._id,
                )}
                students={groupClassOrders
                  .filter((order) => order.course._id === course._id)
                  .map((order) => order.user)}
              />
            ))
          ) : (
            <p className="text-accent-gray-300">
              It looks like there are no available courses at the moment. Please
              check back later for new courses and updates.
            </p>
          )}
        </div>
      </section>

      <div className="mt-8 flex justify-between">
        <BackButton />
      </div>
    </div>
  );
}
